import { useState } from 'react';
import { foodDatabase, recetas as RECETAS } from '../../data/database';
import './Recetas.css';

const DIAS    = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const TIPOS   = ['todos', 'desayuno', 'almuerzo', 'cena', 'snack'];
const METAS   = { lose: 'Bajar peso', maintain: 'Mantener', gain: 'Ganar masa' };
const COLORS  = {
  desayuno: 'var(--accent-yellow)',
  almuerzo: 'var(--accent-green)',
  cena:     'var(--accent-blue)',
  snack:    'var(--accent-orange)',
};
const COMIDAS = ['desayuno', 'almuerzo', 'cena', 'snack'];

const DIETA_FILTROS = {
  balanced:      () => true,
  keto:          (r) => r.fat >= 15 && r.carbs <= 10,
  lowcarb:       (r) => r.carbs <= 30,
  highprotein:   (r) => r.protein >= 25,
  vegan:         (r) => !r.ingredientes.some(ing => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,43,44,45,52,53,56].includes(ing.id)),
  mediterranean: (r) => r.fiber >= 3 || r.fat >= 10,
};

const DIETA_LABELS = {
  balanced:      null,
  keto:          { label: 'Cetogénica',    color: 'var(--accent-yellow)' },
  lowcarb:       { label: 'Low Carb',      color: 'var(--accent-blue)'   },
  highprotein:   { label: 'Alta Proteína', color: 'var(--accent-orange)' },
  vegan:         { label: 'Vegana',        color: 'var(--accent-green)'  },
  mediterranean: { label: 'Mediterránea',  color: '#4ecdc4'              },
};

export default function Recetas({ appState }) {
  const { profile } = appState;

  const [filtroTipo,         setFiltroTipo]         = useState('todos');
  const [filtroMeta,         setFiltroMeta]         = useState('todos');
  const [busqueda,           setBusqueda]           = useState('');
  const [recetaAbierta,      setRecetaAbierta]      = useState(null);
  const [agregado,           setAgregado]           = useState({});
  const [diaSeleccionado,    setDiaSeleccionado]    = useState('Lunes');
  const [comidaSeleccionada, setComidaSeleccionada] = useState('desayuno');

  const dietaActiva = profile?.dietType || 'balanced';

  const recetasFiltradas = RECETAS.filter(r => {
    const matchTipo  = filtroTipo === 'todos' || r.tipo === filtroTipo;
    const matchMeta  = filtroMeta === 'todos' || r.meta.includes(filtroMeta);
    const matchBusq  = r.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const matchDieta = (DIETA_FILTROS[dietaActiva] || (() => true))(r);
    return matchTipo && matchMeta && matchBusq && matchDieta;
  });

  const agregarAlPlan = (receta) => {
    const planGuardado = localStorage.getItem('caloria_plan_semanal');
    const plan = planGuardado ? JSON.parse(planGuardado) : {};

    if (!plan[diaSeleccionado]) {
      plan[diaSeleccionado] = { desayuno: null, almuerzo: null, cena: null, snack: null };
    }

    plan[diaSeleccionado][comidaSeleccionada] = {
      id:           receta.id,
      name:         receta.nombre,
      icon:         receta.icono,
      cal:          receta.cal,
      protein:      receta.protein,
      carbs:        receta.carbs,
      fat:          receta.fat,
      fiber:        receta.fiber,
      grams:        100,
      esReceta:     true,
      ingredientes: receta.ingredientes,
    };

    localStorage.setItem('caloria_plan_semanal', JSON.stringify(plan));
    setAgregado(prev => ({ ...prev, [receta.id]: true }));
    setTimeout(() => setAgregado(prev => ({ ...prev, [receta.id]: false })), 3000);
    setRecetaAbierta(null);
  };

  return (
    <div className="recetas-page">

      {/* Header */}
      <div className="page-header animate-fade-up-1">
        <div>
          <p className="page-sub">Alimentación</p>
          <h2 className="page-title">Recetas Saludables</h2>
        </div>
        <span className="badge badge-green">
          <i className="bi bi-book-fill"></i> {RECETAS.length} recetas
        </span>
      </div>

      {/* Banner dieta activa */}
      {DIETA_LABELS[dietaActiva] && (
        <div className="dieta-activa-banner animate-fade-up-2">
          <i className="bi bi-funnel-fill"></i>
          Filtrando por dieta: <strong style={{ color: DIETA_LABELS[dietaActiva].color }}>
            {DIETA_LABELS[dietaActiva].label}
          </strong>
          <span className="dieta-activa-sub">· Cambialo en Nutrición</span>
        </div>
      )}

      {/* Filtros */}
      <div className="card recetas-filtros animate-fade-up-2">
        <div className="recetas-search">
          <i className="bi bi-search"></i>
          <input
            placeholder="Buscar receta..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>
        <div className="recetas-filtros-row">
          <div className="filtro-group">
            <span className="filtro-label">Tipo</span>
            <div className="filtro-btns">
              {TIPOS.map(t => (
                <button
                  key={t}
                  className={`filtro-btn ${filtroTipo === t ? 'active' : ''}`}
                  onClick={() => setFiltroTipo(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="filtro-group">
            <span className="filtro-label">Meta</span>
            <div className="filtro-btns">
              <button
                className={`filtro-btn ${filtroMeta === 'todos' ? 'active' : ''}`}
                onClick={() => setFiltroMeta('todos')}
              >
                Todas
              </button>
              {Object.entries(METAS).map(([k, v]) => (
                <button
                  key={k}
                  className={`filtro-btn ${filtroMeta === k ? 'active' : ''}`}
                  onClick={() => setFiltroMeta(k)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="recetas-grid animate-fade-up-3">
        {recetasFiltradas.map(r => (
          <div key={r.id} className="receta-card card" onClick={() => {
            setRecetaAbierta(r);
            setComidaSeleccionada(r.tipo);
          }}>
            <div className="receta-top">
              <span className="receta-icono">{r.icono}</span>
              <div
                className="receta-tipo-badge"
                style={{ background:`${COLORS[r.tipo]}18`, color:COLORS[r.tipo], border:`1px solid ${COLORS[r.tipo]}33` }}
              >
                {r.tipo}
              </div>
            </div>
            <h3 className="receta-nombre">{r.nombre}</h3>
            <p className="receta-desc">{r.desc}</p>
            <div className="receta-macros">
              <span className="receta-macro"><i className="bi bi-fire"></i> {r.cal} kcal</span>
              <span className="receta-macro" style={{ color:'var(--accent-orange)' }}><i className="bi bi-egg"></i> {r.protein}g P</span>
              <span className="receta-macro" style={{ color:'var(--accent-blue)' }}><i className="bi bi-lightning"></i> {r.carbs}g C</span>
              <span className="receta-macro" style={{ color:'var(--accent-yellow)' }}><i className="bi bi-droplet"></i> {r.fat}g G</span>
            </div>
            <div className="receta-footer">
              <span className="receta-tiempo"><i className="bi bi-clock"></i> {r.tiempo} min</span>
              <span className="receta-dificultad">{r.dificultad}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {recetaAbierta && (
        <div className="receta-modal-overlay" onClick={() => setRecetaAbierta(null)}>
          <div className="receta-modal" onClick={e => e.stopPropagation()}>
            <div className="receta-modal-header">
              <span className="receta-modal-icono">{recetaAbierta.icono}</span>
              <div>
                <h3 className="receta-modal-nombre">{recetaAbierta.nombre}</h3>
                <p className="receta-modal-desc">{recetaAbierta.desc}</p>
              </div>
              <button className="receta-modal-close" onClick={() => setRecetaAbierta(null)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="receta-modal-macros">
              <div className="rm-macro"><span style={{ color:'var(--accent-green)'  }}>{recetaAbierta.cal}</span>       <span>kcal</span>    </div>
              <div className="rm-macro"><span style={{ color:'var(--accent-orange)' }}>{recetaAbierta.protein}g</span>  <span>Proteína</span> </div>
              <div className="rm-macro"><span style={{ color:'var(--accent-blue)'   }}>{recetaAbierta.carbs}g</span>    <span>Carbos</span>   </div>
              <div className="rm-macro"><span style={{ color:'var(--accent-yellow)' }}>{recetaAbierta.fat}g</span>      <span>Grasa</span>    </div>
              <div className="rm-macro"><span style={{ color:'var(--accent-green)'  }}>{recetaAbierta.fiber}g</span>    <span>Fibra</span>    </div>
            </div>

            <div className="receta-modal-ingredientes">
              <p className="receta-modal-label"><i className="bi bi-basket2"></i> Ingredientes</p>
              {recetaAbierta.ingredientes.map((ing, i) => {
                const food    = foodDatabase.find(f => f.id === ing.id);
                const calReal = food ? Math.round(food.cal * ing.grams / 100) : 0;
                return (
                  <div key={i} className="rm-ingrediente">
                    <span className="rm-ing-nombre">{food?.name || ing.nombre || '—'}</span>
                    <span className="rm-ing-grams">{ing.grams}g</span>
                    <span className="rm-ing-cal">{calReal} kcal</span>
                  </div>
                );
              })}
            </div>

            <div className="receta-modal-info">
              <span><i className="bi bi-clock"></i> {recetaAbierta.tiempo} min</span>
              <span><i className="bi bi-bar-chart"></i> {recetaAbierta.dificultad}</span>
              <span><i className="bi bi-bullseye"></i> {recetaAbierta.meta.map(m => METAS[m]).join(', ')}</span>
            </div>

            {/* Selector Plan Semanal */}
            <div className="receta-plan-selector">
              <p className="receta-modal-label">
                <i className="bi bi-calendar-week"></i> Agregar al Plan Semanal
              </p>
              <div className="receta-plan-row">
                <div className="receta-plan-field">
                  <label>Día</label>
                  <div className="receta-plan-dias">
                    {DIAS.map(dia => (
                      <button
                        key={dia}
                        className={`receta-dia-btn ${diaSeleccionado === dia ? 'active' : ''}`}
                        onClick={() => setDiaSeleccionado(dia)}
                      >
                        {dia.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="receta-plan-field">
                  <label>Comida</label>
                  <div className="receta-plan-comidas">
                    {COMIDAS.map(c => (
                      <button
                        key={c}
                        className={`receta-comida-btn ${comidaSeleccionada === c ? 'active' : ''}`}
                        onClick={() => setComidaSeleccionada(c)}
                      >
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                className={`btn btn-primary receta-agregar-btn ${agregado[recetaAbierta.id] ? 'agregado' : ''}`}
                onClick={() => agregarAlPlan(recetaAbierta)}
              >
                <i className={`bi ${agregado[recetaAbierta.id] ? 'bi-check-circle-fill' : 'bi-calendar-plus'}`}></i>
                {agregado[recetaAbierta.id]
                  ? `¡Agregado al plan del ${diaSeleccionado}!`
                  : `Agregar al plan — ${diaSeleccionado} · ${comidaSeleccionada}`
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}