import { useState } from 'react';
import { foodDatabase } from '../../data/database';
import './PlanSemanal.css';

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const COMIDAS = [
  { id: 'desayuno', label: 'Desayuno', icon: 'bi-sun',            color: 'var(--accent-yellow)' },
  { id: 'almuerzo', label: 'Almuerzo', icon: 'bi-brightness-high', color: 'var(--accent-green)'  },
  { id: 'cena',     label: 'Cena',     icon: 'bi-moon-stars',      color: 'var(--accent-blue)'   },
  { id: 'snack',    label: 'Snack',    icon: 'bi-star',            color: 'var(--accent-orange)' },
];

const MEAL_MAP = { desayuno: 'breakfast', almuerzo: 'lunch', cena: 'dinner', snack: 'snacks' };

// ── Recetas inline ─────────────────────────────────────
const RECETAS = [
  { id:1,  nombre:'Avena con frutas tropicales',      icono:'🌾', tipo:'desayuno', cal:320, protein:12, carbs:58, fat:6,  fiber:7,  ingredientes:[{id:22,grams:60},{id:71,grams:80},{id:75,grams:50},{id:11,grams:150},{id:85,grams:10}] },
  { id:2,  nombre:'Huevos revueltos con pimiento',    icono:'🍳', tipo:'desayuno', cal:280, protein:22, carbs:8,  fat:18, fiber:2,  ingredientes:[{id:2,grams:150},{id:68,grams:80},{id:63,grams:60},{id:81,grams:10}] },
  { id:3,  nombre:'Café con leche y tostadas',        icono:'☕', tipo:'desayuno', cal:260, protein:10, carbs:38, fat:8,  fiber:2.5,ingredientes:[{id:13,grams:200},{id:32,grams:60},{id:19,grams:10}] },
  { id:4,  nombre:'Yogur griego con mango',           icono:'🫙', tipo:'desayuno', cal:220, protein:18, carbs:28, fat:2,  fiber:2,  ingredientes:[{id:15,grams:200},{id:73,grams:100},{id:85,grams:10},{id:80,grams:15}] },
  { id:5,  nombre:'Tortilla de espinaca',             icono:'🍳', tipo:'desayuno', cal:350, protein:24, carbs:10, fat:24, fiber:3,  ingredientes:[{id:2,grams:200},{id:62,grams:80},{id:18,grams:40},{id:81,grams:10}] },
  { id:6,  nombre:'Arroz con pollo cubano',           icono:'🍛', tipo:'almuerzo', cal:480, protein:38, carbs:52, fat:10, fiber:3,  ingredientes:[{id:1,grams:200},{id:20,grams:150},{id:63,grams:80},{id:68,grams:60},{id:66,grams:50},{id:81,grams:10}] },
  { id:7,  nombre:'Lentejas con arroz',               icono:'🫘', tipo:'almuerzo', cal:390, protein:22, carbs:65, fat:4,  fiber:14, ingredientes:[{id:36,grams:200},{id:20,grams:100},{id:64,grams:80},{id:66,grams:50},{id:81,grams:10}] },
  { id:8,  nombre:'Moros y Cristianos saludable',     icono:'🍚', tipo:'almuerzo', cal:420, protein:18, carbs:72, fat:5,  fiber:12, ingredientes:[{id:20,grams:150},{id:34,grams:150},{id:66,grams:50},{id:68,grams:60},{id:81,grams:10}] },
  { id:9,  nombre:'Milanesa de pollo con ensalada',   icono:'🍗', tipo:'almuerzo', cal:380, protein:42, carbs:20, fat:14, fiber:3,  ingredientes:[{id:1,grams:200},{id:65,grams:80},{id:63,grams:80},{id:23,grams:30},{id:81,grams:10}] },
  { id:10, nombre:'Sopa de pollo con verduras',       icono:'🍜', tipo:'almuerzo', cal:280, protein:28, carbs:22, fat:7,  fiber:4,  ingredientes:[{id:7,grams:150},{id:64,grams:80},{id:66,grams:50},{id:27,grams:100},{id:62,grams:50}] },
  { id:11, nombre:'Ensalada de atún con aguacate',    icono:'🥑', tipo:'almuerzo', cal:340, protein:32, carbs:12, fat:18, fiber:7,  ingredientes:[{id:3,grams:150},{id:79,grams:100},{id:63,grams:80},{id:65,grams:60},{id:67,grams:60}] },
  { id:12, nombre:'Potaje de frijoles colorados',     icono:'🍲', tipo:'almuerzo', cal:360, protein:18, carbs:55, fat:6,  fiber:14, ingredientes:[{id:35,grams:200},{id:27,grams:100},{id:66,grams:50},{id:68,grams:60},{id:81,grams:10}] },
  { id:13, nombre:'Salmón con boniato',               icono:'🐠', tipo:'cena',     cal:420, protein:36, carbs:32, fat:16, fiber:4,  ingredientes:[{id:4,grams:180},{id:29,grams:150},{id:61,grams:100},{id:81,grams:10}] },
  { id:14, nombre:'Ropa vieja con yuca',              icono:'🍲', tipo:'cena',     cal:480, protein:34, carbs:42, fat:16, fiber:4,  ingredientes:[{id:5,grams:200},{id:30,grams:150},{id:63,grams:80},{id:68,grams:60},{id:66,grams:50}] },
  { id:15, nombre:'Churrasco con ensalada',           icono:'🥩', tipo:'cena',     cal:440, protein:46, carbs:10, fat:24, fiber:3,  ingredientes:[{id:5,grams:200},{id:65,grams:80},{id:63,grams:80},{id:67,grams:60},{id:81,grams:15}] },
  { id:16, nombre:'Pasta con atún y tomate',          icono:'🍝', tipo:'cena',     cal:450, protein:32, carbs:56, fat:8,  fiber:4,  ingredientes:[{id:25,grams:200},{id:3,grams:120},{id:63,grams:100},{id:66,grams:40},{id:81,grams:10}] },
  { id:17, nombre:'Picadillo a la criolla con arroz', icono:'🍲', tipo:'cena',     cal:520, protein:36, carbs:48, fat:16, fiber:4,  ingredientes:[{id:5,grams:180},{id:20,grams:120},{id:63,grams:80},{id:68,grams:60},{id:66,grams:50}] },
  { id:18, nombre:'Sardinas con papa y ensalada',     icono:'🐟', tipo:'cena',     cal:360, protein:30, carbs:28, fat:14, fiber:3,  ingredientes:[{id:10,grams:120},{id:27,grams:120},{id:65,grams:60},{id:63,grams:60}] },
  { id:19, nombre:'Aguacate con galletas',            icono:'🥑', tipo:'snack',    cal:280, protein:5,  carbs:22, fat:20, fiber:9,  ingredientes:[{id:79,grams:100},{id:33,grams:40},{id:63,grams:50}] },
  { id:20, nombre:'Frutas tropicales con yogur',      icono:'🍓', tipo:'snack',    cal:180, protein:10, carbs:30, fat:1,  fiber:4,  ingredientes:[{id:15,grams:120},{id:74,grams:80},{id:77,grams:60},{id:76,grams:60}] },
];

const defaultPlan = () => {
  const plan = {};
  DIAS.forEach(dia => {
    plan[dia] = {};
    COMIDAS.forEach(comida => { plan[dia][comida.id] = null; });
  });
  return plan;
};

export default function PlanSemanal({ appState }) {
  const { addMealItem, calculateTargetCalories } = appState;

  const [plan, setPlan] = useState(() => {
    const saved = localStorage.getItem('caloria_plan_semanal');
    return saved ? JSON.parse(saved) : defaultPlan();
  });

  // ── Modal alimento ─────────────────────────────────────
  const [modal,      setModal]      = useState(null); // { dia, comida }
  const [busqueda,   setBusqueda]   = useState('');
  const [catFiltro,  setCatFiltro]  = useState('todos');
  const [gramsInput, setGramsInput] = useState({});

  // ── Modal recetas ──────────────────────────────────────
  const [modalReceta,       setModalReceta]       = useState(null); // { dia, comida }
  const [busquedaReceta,    setBusquedaReceta]     = useState('');
  const [recetaDetalle,     setRecetaDetalle]      = useState(null);

  const [diaActivo, setDiaActivo] = useState('Lunes');
  const [enviado,   setEnviado]   = useState({});

  const savePlan = (newPlan) => {
    setPlan(newPlan);
    localStorage.setItem('caloria_plan_semanal', JSON.stringify(newPlan));
  };

  // ── Asignar alimento ───────────────────────────────────
  const asignarAlimento = (food, grams) => {
    const g = parseFloat(grams) || 100;
    const newPlan = {
      ...plan,
      [modal.dia]: { ...plan[modal.dia], [modal.comida]: { ...food, grams: g } }
    };
    savePlan(newPlan);
    setModal(null);
    setBusqueda('');
    setGramsInput({});
  };

  // ── Asignar receta ─────────────────────────────────────
  const asignarReceta = (receta) => {
    const newPlan = {
      ...plan,
      [modalReceta.dia]: {
        ...plan[modalReceta.dia],
        [modalReceta.comida]: {
          id:       receta.id,
          name:     receta.nombre,
          icon:     receta.icono,
          cal:      receta.cal,
          protein:  receta.protein,
          carbs:    receta.carbs,
          fat:      receta.fat,
          fiber:    receta.fiber,
          grams:    100,
          esReceta: true,
        }
      }
    };
    savePlan(newPlan);
    setModalReceta(null);
    setBusquedaReceta('');
    setRecetaDetalle(null);
  };

  const quitarAlimento = (dia, comida) => {
    const newPlan = { ...plan, [dia]: { ...plan[dia], [comida]: null } };
    savePlan(newPlan);
  };

  const enviarDiario = (dia) => {
    const comidas = plan[dia];
    let agregados = 0;
    COMIDAS.forEach(c => {
      const item = comidas[c.id];
      if (!item) return;
      addMealItem(MEAL_MAP[c.id], { ...item, grams: item.grams || 100 });
      agregados++;
    });
    if (agregados > 0) {
      setEnviado(prev => ({ ...prev, [dia]: true }));
      setTimeout(() => setEnviado(prev => ({ ...prev, [dia]: false })), 3000);
    }
  };

  const calDia = (dia) => Math.round(
    COMIDAS.reduce((sum, c) => {
      const item = plan[dia]?.[c.id];
      if (!item) return sum;
      return sum + (item.cal * (item.grams || 100) / 100);
    }, 0)
  );

  const target      = calculateTargetCalories();
  const cats        = ['todos', ...new Set(foodDatabase.map(f => f.cat))];
  const totalSemana = DIAS.reduce((sum, dia) => sum + calDia(dia), 0);

  const foodsFiltrados = foodDatabase.filter(f => {
    const matchCat  = catFiltro === 'todos' || f.cat === catFiltro;
    const matchBusq = f.name.toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchBusq;
  });

  // Recetas filtradas por tipo de comida del slot + búsqueda
  const recetasFiltradas = RECETAS.filter(r => {
    const matchTipo = !modalReceta || r.tipo === modalReceta.comida;
    const matchBusq = r.nombre.toLowerCase().includes(busquedaReceta.toLowerCase());
    return matchTipo && matchBusq;
  });

  return (
    <div className="plan-page">

      {/* Header */}
      <div className="page-header animate-fade-up-1">
        <div>
          <p className="page-sub">Planificación</p>
          <h2 className="page-title">Plan Semanal</h2>
        </div>
        <div className="plan-header-stats">
          <span className="badge badge-green">
            <i className="bi bi-fire"></i> {Math.round(totalSemana / 7)} kcal/día prom.
          </span>
          <span className="badge badge-blue">
            <i className="bi bi-calendar-week"></i> {totalSemana} kcal semana
          </span>
        </div>
      </div>

      {/* Selector de días */}
      <div className="plan-dias-scroll animate-fade-up-2">
        {DIAS.map(dia => {
          const cal   = calDia(dia);
          const pct   = target > 0 ? Math.min((cal / target) * 100, 100) : 0;
          const color = pct >= 90 ? 'var(--accent-green)' : pct >= 50 ? 'var(--accent-yellow)' : 'var(--text-muted)';
          return (
            <button
              key={dia}
              className={`plan-dia-btn ${diaActivo === dia ? 'active' : ''}`}
              onClick={() => setDiaActivo(dia)}
            >
              <span className="plan-dia-nombre">{dia.slice(0, 3)}</span>
              <span className="plan-dia-cal" style={{ color }}>{cal > 0 ? cal : '—'}</span>
              <div className="plan-dia-bar">
                <div className="plan-dia-bar-fill" style={{ width:`${pct}%`, background:color }} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Grid del día activo */}
      <div className="plan-dia-content animate-fade-up-3">
        <div className="plan-dia-header">
          <h3 className="plan-dia-title">{diaActivo}</h3>
          <div className="plan-dia-info">
            <span style={{ color: calDia(diaActivo) > target ? 'var(--accent-orange)' : 'var(--accent-green)', fontWeight:700 }}>
              {calDia(diaActivo)} kcal
            </span>
            <span style={{ color:'var(--text-muted)', fontSize:12 }}>/ {target} meta</span>
          </div>
          <button
            className={`btn btn-primary plan-enviar-btn ${enviado[diaActivo] ? 'enviado' : ''}`}
            onClick={() => enviarDiario(diaActivo)}
            disabled={calDia(diaActivo) === 0}
          >
            <i className={`bi ${enviado[diaActivo] ? 'bi-check-circle-fill' : 'bi-send'}`}></i>
            {enviado[diaActivo] ? '¡Enviado!' : 'Enviar al diario'}
          </button>
        </div>

        <div className="plan-comidas-grid">
          {COMIDAS.map(comida => {
            const item = plan[diaActivo]?.[comida.id];
            const cal  = item ? Math.round(item.cal * (item.grams || 100) / 100) : 0;
            return (
              <div key={comida.id} className="plan-comida-card card">
                <div className="plan-comida-header">
                  <div className="plan-comida-label-wrap">
                    <i className={`bi ${comida.icon}`} style={{ color: comida.color }}></i>
                    <span className="plan-comida-label">{comida.label}</span>
                  </div>
                  {item && (
                    <span className="plan-comida-cal" style={{ color: comida.color }}>{cal} kcal</span>
                  )}
                </div>

                {item ? (
                  <div className="plan-comida-item">
                    <span className="plan-comida-icon">{item.icon}</span>
                    <div className="plan-comida-info">
                      <span className="plan-comida-name">{item.name}</span>
                      <span className="plan-comida-macros">
                        {item.grams}g · P:{Math.round(item.protein * item.grams / 100)}g · C:{Math.round(item.carbs * item.grams / 100)}g · G:{Math.round(item.fat * item.grams / 100)}g
                      </span>
                    </div>
                    <button className="plan-quitar-btn" onClick={() => quitarAlimento(diaActivo, comida.id)}>
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                ) : (
                  <div className="plan-agregar-btns">
                    <button
                      className="plan-agregar-btn"
                      onClick={() => setModal({ dia: diaActivo, comida: comida.id })}
                    >
                      <i className="bi bi-plus-circle"></i>
                      <span>Alimento</span>
                    </button>
                    <button
                      className="plan-agregar-btn plan-agregar-btn-receta"
                      onClick={() => { setModalReceta({ dia: diaActivo, comida: comida.id }); setBusquedaReceta(''); setRecetaDetalle(null); }}
                    >
                      <i className="bi bi-book"></i>
                      <span>Receta</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Resumen semanal */}
      <div className="card plan-resumen animate-fade-up-4">
        <p className="card-label"><i className="bi bi-calendar3"></i> Resumen de la semana</p>
        <div className="plan-resumen-grid">
          {DIAS.map(dia => {
            const cal   = calDia(dia);
            const pct   = target > 0 ? Math.min((cal / target) * 100, 100) : 0;
            const color = pct >= 90 ? 'var(--accent-green)' : pct >= 50 ? 'var(--accent-yellow)' : 'var(--text-muted)';
            return (
              <div key={dia} className="plan-resumen-item" onClick={() => setDiaActivo(dia)}>
                <span className="plan-resumen-dia">{dia.slice(0, 3)}</span>
                <div className="plan-resumen-bar-wrap">
                  <div className="plan-resumen-bar">
                    <div className="plan-resumen-fill" style={{ height:`${pct}%`, background:color }} />
                  </div>
                </div>
                <span className="plan-resumen-cal" style={{ color }}>{cal > 0 ? cal : '—'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Modal alimento ─────────────────────────────── */}
      {modal && (
        <div className="plan-modal-overlay" onClick={() => { setModal(null); setBusqueda(''); }}>
          <div className="plan-modal" onClick={e => e.stopPropagation()}>
            <div className="plan-modal-header">
              <div>
                <h3 className="plan-modal-title">Elegir alimento</h3>
                <p className="plan-modal-sub">{modal.dia} · {COMIDAS.find(c => c.id === modal.comida)?.label}</p>
              </div>
              <button className="diet-modal-close" onClick={() => { setModal(null); setBusqueda(''); }}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="plan-modal-search">
              <i className="bi bi-search"></i>
              <input
                type="text" placeholder="Buscar alimento..."
                value={busqueda} onChange={e => setBusqueda(e.target.value)} autoFocus
              />
            </div>
            <div className="plan-modal-cats">
              {cats.map(cat => (
                <button
                  key={cat}
                  className={`plan-cat-btn ${catFiltro === cat ? 'active' : ''}`}
                  onClick={() => setCatFiltro(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="plan-modal-list">
              {foodsFiltrados.map(food => {
                const g   = gramsInput[food.id] || 100;
                const cal = Math.round(food.cal * g / 100);
                return (
                  <div key={food.id} className="plan-modal-food">
                    <span className="plan-modal-food-icon">{food.icon}</span>
                    <div className="plan-modal-food-info">
                      <span className="plan-modal-food-name">{food.name}</span>
                      <span className="plan-modal-food-cal">{cal} kcal</span>
                    </div>
                    <div className="plan-modal-food-grams">
                      <input
                        type="number" value={gramsInput[food.id] || ''} placeholder="100"
                        min="1" max="2000"
                        onChange={e => setGramsInput(prev => ({ ...prev, [food.id]: e.target.value }))}
                      />
                      <span>g</span>
                    </div>
                    <button
                      className="btn btn-primary plan-modal-add"
                      onClick={() => asignarAlimento(food, gramsInput[food.id] || 100)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Modal recetas inline ───────────────────────── */}
      {modalReceta && (
        <div className="plan-modal-overlay" onClick={() => { setModalReceta(null); setRecetaDetalle(null); }}>
          <div className="plan-modal" onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="plan-modal-header">
              <div>
                <h3 className="plan-modal-title">
                  <i className="bi bi-book"></i> Elegir receta
                </h3>
                <p className="plan-modal-sub">
                  {modalReceta.dia} · {COMIDAS.find(c => c.id === modalReceta.comida)?.label}
                  {' · '}
                  <span style={{ color:'var(--accent-green)' }}>
                    {recetasFiltradas.length} recetas disponibles
                  </span>
                </p>
              </div>
              <button className="diet-modal-close" onClick={() => { setModalReceta(null); setRecetaDetalle(null); }}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* Búsqueda */}
            <div className="plan-modal-search">
              <i className="bi bi-search"></i>
              <input
                type="text" placeholder="Buscar receta..."
                value={busquedaReceta} onChange={e => setBusquedaReceta(e.target.value)} autoFocus
              />
            </div>

            {/* Lista de recetas o detalle */}
            <div className="plan-modal-list">
              {!recetaDetalle ? (
                // Lista
                recetasFiltradas.length === 0 ? (
                  <div className="plan-receta-empty">
                    <i className="bi bi-journal-x"></i>
                    <p>No hay recetas de {modalReceta.comida} disponibles.</p>
                  </div>
                ) : (
                  recetasFiltradas.map(r => (
                    <div
                      key={r.id}
                      className="plan-receta-item"
                      onClick={() => setRecetaDetalle(r)}
                    >
                      <span className="plan-receta-icono">{r.icono}</span>
                      <div className="plan-receta-info">
                        <span className="plan-receta-nombre">{r.nombre}</span>
                        <div className="plan-receta-macros">
                          <span style={{ color:'var(--accent-green)' }}>{r.cal} kcal</span>
                          <span style={{ color:'var(--accent-orange)' }}>{r.protein}g P</span>
                          <span style={{ color:'var(--accent-blue)' }}>{r.carbs}g C</span>
                          <span style={{ color:'var(--accent-yellow)' }}>{r.fat}g G</span>
                        </div>
                      </div>
                      <i className="bi bi-chevron-right" style={{ color:'var(--text-muted)', fontSize:14 }}></i>
                    </div>
                  ))
                )
              ) : (
                // Detalle de receta
                <div className="plan-receta-detalle">
                  <button className="plan-receta-back" onClick={() => setRecetaDetalle(null)}>
                    <i className="bi bi-arrow-left"></i> Volver
                  </button>
                  <div className="plan-receta-detalle-header">
                    <span style={{ fontSize:36 }}>{recetaDetalle.icono}</span>
                    <div>
                      <h4 className="plan-receta-detalle-nombre">{recetaDetalle.nombre}</h4>
                      <div className="plan-receta-macros">
                        <span style={{ color:'var(--accent-green)' }}>{recetaDetalle.cal} kcal</span>
                        <span style={{ color:'var(--accent-orange)' }}>{recetaDetalle.protein}g P</span>
                        <span style={{ color:'var(--accent-blue)' }}>{recetaDetalle.carbs}g C</span>
                        <span style={{ color:'var(--accent-yellow)' }}>{recetaDetalle.fat}g G</span>
                      </div>
                    </div>
                  </div>

                  <p className="plan-receta-label"><i className="bi bi-basket2"></i> Ingredientes</p>
                  {recetaDetalle.ingredientes.map((ing, i) => {
                    const food    = foodDatabase.find(f => f.id === ing.id);
                    const calReal = food ? Math.round(food.cal * ing.grams / 100) : 0;
                    return (
                      <div key={i} className="plan-receta-ing-row">
                        <span>{food?.icon || '🥘'} {food?.name || '—'}</span>
                        <span>{ing.grams}g</span>
                        <span style={{ color:'var(--accent-orange)' }}>{calReal} kcal</span>
                      </div>
                    );
                  })}

                  <button
                    className="btn btn-primary plan-receta-confirmar"
                    onClick={() => asignarReceta(recetaDetalle)}
                  >
                    <i className="bi bi-calendar-plus"></i>
                    Agregar al plan — {modalReceta.dia} · {COMIDAS.find(c => c.id === modalReceta.comida)?.label}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}