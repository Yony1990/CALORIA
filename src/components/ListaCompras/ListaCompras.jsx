import { useState, useMemo } from 'react';
import { foodDatabase, recetas as recetasDB } from '../../data/database';
import './ListaCompras.css';

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const COMIDAS = ['desayuno', 'almuerzo', 'cena', 'snack'];

const CAT_ICONS = {
  proteína:     { icon: 'bi-egg-fried',      color: 'var(--accent-orange)' },
  lácteo:       { icon: 'bi-cup-straw',      color: 'var(--accent-blue)'   },
  carbohidrato: { icon: 'bi-lightning',      color: 'var(--accent-yellow)' },
  legumbre:     { icon: 'bi-circle-fill',    color: 'var(--accent-green)'  },
  plato:        { icon: 'bi-bowl-hot',       color: 'var(--accent-orange)' },
  verdura:      { icon: 'bi-tree',           color: 'var(--accent-green)'  },
  fruta:        { icon: 'bi-apple',          color: '#ff6b9d'              },
  grasa:        { icon: 'bi-droplet-fill',   color: 'var(--accent-yellow)' },
  extra:        { icon: 'bi-three-dots',     color: 'var(--text-muted)'    },
  bebida:       { icon: 'bi-cup-hot',        color: 'var(--accent-blue)'   },
  receta:       { icon: 'bi-book',           color: 'var(--accent-green)'  },
};

export default function ListaCompras() {
  const [checked,    setChecked]    = useState({});
  const [diaFiltro,  setDiaFiltro]  = useState('todos');

  // ── Leer plan semanal desde localStorage ──────────────
  const plan = useMemo(() => {
    const saved = localStorage.getItem('caloria_plan_semanal');
    return saved ? JSON.parse(saved) : {};
  }, []);

  // ── Generar lista de ingredientes ─────────────────────
  const ingredientes = useMemo(() => {
    const mapa = {}; // key: food.id → { food, totalGrams, dias }

    const diasAConsiderar = diaFiltro === 'todos' ? DIAS : [diaFiltro];

    diasAConsiderar.forEach(dia => {
      const planDia = plan[dia];
      if (!planDia) return;

      COMIDAS.forEach(comida => {
        const item = planDia[comida];
        if (!item) return;

        if (item.esReceta) {
          // Buscar receta en DB y desglosar ingredientes
          const receta = recetasDB.find(r => r.id === item.id);
          if (!receta?.ingredientes) return;
          receta.ingredientes.forEach(ing => {
            const food = foodDatabase.find(f => f.id === ing.id);
            if (!food) return;
            if (!mapa[food.id]) {
              mapa[food.id] = { food, totalGrams: 0, dias: new Set() };
            }
            mapa[food.id].totalGrams += ing.grams;
            mapa[food.id].dias.add(dia);
          });
        } else {
          // Alimento directo
          const food = foodDatabase.find(f => f.id === item.id) || item;
          const key  = food.id || item.name;
          if (!mapa[key]) {
            mapa[key] = { food: { ...food, name: item.name || food.name }, totalGrams: 0, dias: new Set() };
          }
          mapa[key].totalGrams += item.grams || 100;
          mapa[key].dias.add(dia);
        }
      });
    });

    return Object.values(mapa).sort((a, b) =>
      (a.food.cat || '').localeCompare(b.food.cat || '')
    );
  }, [plan, diaFiltro]);

  // ── Agrupar por categoría ─────────────────────────────
  const grupos = useMemo(() => {
    const g = {};
    ingredientes.forEach(item => {
      const cat = item.food.cat || 'extra';
      if (!g[cat]) g[cat] = [];
      g[cat].push(item);
    });
    return g;
  }, [ingredientes]);

  const totalItems    = ingredientes.length;
  const checkedItems  = Object.values(checked).filter(Boolean).length;
  const pctCompletado = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  const toggleCheck = (key) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetChecks = () => setChecked({});

  const planVacio = ingredientes.length === 0;

  return (
    <div className="lista-page">

      {/* Header */}
      <div className="page-header animate-fade-up-1">
        <div>
          <p className="page-sub">Planificación</p>
          <h2 className="page-title">Lista de Compras</h2>
        </div>
        <div className="lista-header-badges">
          <span className="badge badge-green">
            <i className="bi bi-cart-check"></i> {checkedItems}/{totalItems} items
          </span>
          {checkedItems > 0 && (
            <button className="btn-reset-lista" onClick={resetChecks}>
              <i className="bi bi-arrow-counterclockwise"></i> Reiniciar
            </button>
          )}
        </div>
      </div>

      {/* Barra de progreso */}
      {totalItems > 0 && (
        <div className="lista-progress animate-fade-up-2">
          <div className="lista-progress-info">
            <span className="lista-progress-label">
              {pctCompletado === 100 ? '🎉 ¡Lista completa!' : `${pctCompletado}% completado`}
            </span>
            <span className="lista-progress-nums">{checkedItems} de {totalItems}</span>
          </div>
          <div className="lista-progress-track">
            <div
              className="lista-progress-fill"
              style={{ width: `${pctCompletado}%` }}
            />
          </div>
        </div>
      )}

      {/* Filtro por día */}
      <div className="lista-dias-scroll animate-fade-up-2">
        {['todos', ...DIAS].map(dia => (
          <button
            key={dia}
            className={`lista-dia-btn ${diaFiltro === dia ? 'active' : ''}`}
            onClick={() => { setDiaFiltro(dia); setChecked({}); }}
          >
            {dia === 'todos' ? 'Toda la semana' : dia.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Plan vacío */}
      {planVacio ? (
        <div className="lista-empty animate-fade-up-3">
          <i className="bi bi-cart-x"></i>
          <h3>Sin ingredientes</h3>
          <p>
            {diaFiltro === 'todos'
              ? 'Tu Plan Semanal está vacío. Agregá recetas o alimentos al plan para generar la lista de compras.'
              : `No hay alimentos planificados para el ${diaFiltro}.`
            }
          </p>
        </div>
      ) : (
        /* Grupos por categoría */
        <div className="lista-grupos animate-fade-up-3">
          {Object.entries(grupos).map(([cat, items]) => {
            const catInfo     = CAT_ICONS[cat] || CAT_ICONS.extra;
            const checkedCat  = items.filter(i => checked[i.food.id || i.food.name]).length;
            return (
              <div key={cat} className="lista-grupo card">
                <div className="lista-grupo-header">
                  <div className="lista-grupo-titulo">
                    <div className="lista-grupo-icon" style={{ background:`${catInfo.color}18`, border:`1px solid ${catInfo.color}33` }}>
                      <i className={`bi ${catInfo.icon}`} style={{ color: catInfo.color }}></i>
                    </div>
                    <span className="lista-grupo-nombre">
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </span>
                  </div>
                  <span className="lista-grupo-count" style={{ color: catInfo.color }}>
                    {checkedCat}/{items.length}
                  </span>
                </div>

                <div className="lista-items">
                  {items.map(({ food, totalGrams, dias }) => {
                    const key        = food.id || food.name;
                    const isChecked  = !!checked[key];
                    const diasArr    = [...dias];
                    return (
                      <div
                        key={key}
                        className={`lista-item ${isChecked ? 'checked' : ''}`}
                        onClick={() => toggleCheck(key)}
                      >
                        <div className={`lista-item-check ${isChecked ? 'checked' : ''}`}>
                          {isChecked && <i className="bi bi-check-lg"></i>}
                        </div>
                        <span className="lista-item-icon">{food.icon || '🥘'}</span>
                        <div className="lista-item-info">
                          <span className="lista-item-name">{food.name}</span>
                          <span className="lista-item-dias">
                            {diasArr.slice(0, 3).map(d => d.slice(0, 3)).join(', ')}
                            {diasArr.length > 3 && ` +${diasArr.length - 3}`}
                          </span>
                        </div>
                        <span className="lista-item-grams">
                          {totalGrams >= 1000
                            ? `${(totalGrams / 1000).toFixed(1)} kg`
                            : `${totalGrams} g`
                          }
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}