import { useState } from 'react';
import { foodDatabase } from '../../data/database';
import './Recetas.css';

const RECETAS = [
  {
    id: 1, nombre: 'Avena con frutas tropicales', icono: '🌾',
    tipo: 'desayuno', meta: ['maintain', 'lose', 'gain'],
    tiempo: 10, dificultad: 'Fácil',
    cal: 320, protein: 12, carbs: 58, fat: 6, fiber: 7,
    desc: 'Desayuno energético con avena, plátano y guayaba. Alto en fibra y carbos de calidad.',
    ingredientes: [
      { id: 22, nombre: 'Avena',          grams: 60  },
      { id: 71, nombre: 'Banano/Plátano', grams: 80  },
      { id: 75, nombre: 'Guayaba',        grams: 50  },
      { id: 11, nombre: 'Leche entera',   grams: 150 },
      { id: 85, nombre: 'Miel',           grams: 10  },
    ],
  },
  {
    id: 2, nombre: 'Huevos revueltos con pimiento', icono: '🍳',
    tipo: 'desayuno', meta: ['lose', 'maintain', 'gain'],
    tiempo: 10, dificultad: 'Fácil',
    cal: 280, protein: 22, carbs: 8, fat: 18, fiber: 2,
    desc: 'Proteínas de calidad con vegetales. Ideal para empezar el día con energía.',
    ingredientes: [
      { id: 2,  nombre: 'Huevo entero',  grams: 150 },
      { id: 68, nombre: 'Pimiento',      grams: 80  },
      { id: 63, nombre: 'Tomate',        grams: 60  },
      { id: 81, nombre: 'Aceite oliva',  grams: 10  },
    ],
  },
  {
    id: 3, nombre: 'Café con leche y tostadas', icono: '☕',
    tipo: 'desayuno', meta: ['maintain', 'lose'],
    tiempo: 5, dificultad: 'Fácil',
    cal: 260, protein: 10, carbs: 38, fat: 8, fiber: 2.5,
    desc: 'Clásico desayuno cubano. Rápido y reconfortante para comenzar el día.',
    ingredientes: [
      { id: 13, nombre: 'Café con leche',     grams: 200 },
      { id: 32, nombre: 'Tostada pan blanco', grams: 60  },
      { id: 19, nombre: 'Mantequilla',        grams: 10  },
    ],
  },
  {
    id: 4, nombre: 'Yogur griego con mango', icono: '🫙',
    tipo: 'desayuno', meta: ['lose', 'maintain'],
    tiempo: 5, dificultad: 'Fácil',
    cal: 220, protein: 18, carbs: 28, fat: 2, fiber: 2,
    desc: 'Alto en proteínas y bajo en calorías. Perfecto para bajar de peso sin pasar hambre.',
    ingredientes: [
      { id: 15, nombre: 'Yogur griego', grams: 200 },
      { id: 73, nombre: 'Mango',        grams: 100 },
      { id: 85, nombre: 'Miel',         grams: 10  },
      { id: 80, nombre: 'Almendras',    grams: 15  },
    ],
  },
  {
    id: 5, nombre: 'Tortilla de espinaca', icono: '🍳',
    tipo: 'desayuno', meta: ['gain', 'maintain'],
    tiempo: 15, dificultad: 'Fácil',
    cal: 350, protein: 24, carbs: 10, fat: 24, fiber: 3,
    desc: 'Rica en hierro y proteínas. Ideal para ganar masa muscular.',
    ingredientes: [
      { id: 2,  nombre: 'Huevo entero', grams: 200 },
      { id: 62, nombre: 'Espinaca',     grams: 80  },
      { id: 18, nombre: 'Queso fresco', grams: 40  },
      { id: 81, nombre: 'Aceite oliva', grams: 10  },
    ],
  },
  {
    id: 6, nombre: 'Arroz con pollo cubano', icono: '🍛',
    tipo: 'almuerzo', meta: ['maintain', 'gain'],
    tiempo: 40, dificultad: 'Moderada',
    cal: 480, protein: 38, carbs: 52, fat: 10, fiber: 3,
    desc: 'Plato típico cubano completo. Arroz, pollo y vegetales en un solo plato.',
    ingredientes: [
      { id: 1,  nombre: 'Pollo pechuga',       grams: 200 },
      { id: 20, nombre: 'Arroz blanco cocido', grams: 150 },
      { id: 63, nombre: 'Tomate',              grams: 80  },
      { id: 68, nombre: 'Pimiento',            grams: 60  },
      { id: 66, nombre: 'Cebolla',             grams: 50  },
      { id: 81, nombre: 'Aceite oliva',        grams: 10  },
    ],
  },
  {
    id: 7, nombre: 'Lentejas con arroz', icono: '🫘',
    tipo: 'almuerzo', meta: ['maintain', 'lose', 'gain'],
    tiempo: 30, dificultad: 'Fácil',
    cal: 390, protein: 22, carbs: 65, fat: 4, fiber: 14,
    desc: 'Combinación perfecta de proteína vegetal y carbos. Alta en fibra y hierro.',
    ingredientes: [
      { id: 36, nombre: 'Lentejas cocidas',    grams: 200 },
      { id: 20, nombre: 'Arroz blanco cocido', grams: 100 },
      { id: 64, nombre: 'Zanahoria',           grams: 80  },
      { id: 66, nombre: 'Cebolla',             grams: 50  },
      { id: 81, nombre: 'Aceite oliva',        grams: 10  },
    ],
  },
  {
    id: 8, nombre: 'Moros y Cristianos saludable', icono: '🍚',
    tipo: 'almuerzo', meta: ['maintain', 'gain'],
    tiempo: 35, dificultad: 'Moderada',
    cal: 420, protein: 18, carbs: 72, fat: 5, fiber: 12,
    desc: 'Clásico cubano con arroz y frijoles negros. Combinación completa de aminoácidos.',
    ingredientes: [
      { id: 20, nombre: 'Arroz blanco cocido',     grams: 150 },
      { id: 34, nombre: 'Frijoles negros cocidos', grams: 150 },
      { id: 66, nombre: 'Cebolla',                 grams: 50  },
      { id: 68, nombre: 'Pimiento',                grams: 60  },
      { id: 81, nombre: 'Aceite oliva',            grams: 10  },
    ],
  },
  {
    id: 9, nombre: 'Milanesa de pollo con ensalada', icono: '🍗',
    tipo: 'almuerzo', meta: ['lose', 'maintain'],
    tiempo: 25, dificultad: 'Moderada',
    cal: 380, protein: 42, carbs: 20, fat: 14, fiber: 3,
    desc: 'Alta en proteínas y moderada en calorías. Clásico uruguayo aligerado.',
    ingredientes: [
      { id: 1,  nombre: 'Pollo pechuga', grams: 200 },
      { id: 65, nombre: 'Lechuga',       grams: 80  },
      { id: 63, nombre: 'Tomate',        grams: 80  },
      { id: 23, nombre: 'Pan blanco',    grams: 30  },
      { id: 81, nombre: 'Aceite oliva',  grams: 10  },
    ],
  },
  {
    id: 10, nombre: 'Sopa de pollo con verduras', icono: '🍜',
    tipo: 'almuerzo', meta: ['lose', 'maintain'],
    tiempo: 40, dificultad: 'Fácil',
    cal: 280, protein: 28, carbs: 22, fat: 7, fiber: 4,
    desc: 'Baja en calorías y muy saciante. Ideal para días de déficit calórico.',
    ingredientes: [
      { id: 7,  nombre: 'Pollo muslo',  grams: 150 },
      { id: 64, nombre: 'Zanahoria',    grams: 80  },
      { id: 66, nombre: 'Cebolla',      grams: 50  },
      { id: 27, nombre: 'Papa cocida',  grams: 100 },
      { id: 62, nombre: 'Espinaca',     grams: 50  },
    ],
  },
  {
    id: 11, nombre: 'Ensalada de atún con aguacate', icono: '🥑',
    tipo: 'almuerzo', meta: ['lose', 'maintain'],
    tiempo: 10, dificultad: 'Fácil',
    cal: 340, protein: 32, carbs: 12, fat: 18, fiber: 7,
    desc: 'Rica en omega-3 y grasas saludables. Rápida y muy nutritiva.',
    ingredientes: [
      { id: 3,  nombre: 'Atún en agua', grams: 150 },
      { id: 79, nombre: 'Aguacate',     grams: 100 },
      { id: 63, nombre: 'Tomate',       grams: 80  },
      { id: 65, nombre: 'Lechuga',      grams: 60  },
      { id: 67, nombre: 'Pepino',       grams: 60  },
    ],
  },
  {
    id: 12, nombre: 'Potaje de frijoles colorados', icono: '🍲',
    tipo: 'almuerzo', meta: ['maintain', 'gain'],
    tiempo: 45, dificultad: 'Moderada',
    cal: 360, protein: 18, carbs: 55, fat: 6, fiber: 14,
    desc: 'Clásico cubano reconfortante. Alto en fibra y proteína vegetal.',
    ingredientes: [
      { id: 35, nombre: 'Frijoles colorados', grams: 200 },
      { id: 27, nombre: 'Papa cocida',        grams: 100 },
      { id: 66, nombre: 'Cebolla',            grams: 50  },
      { id: 68, nombre: 'Pimiento',           grams: 60  },
      { id: 81, nombre: 'Aceite oliva',       grams: 10  },
    ],
  },
  {
    id: 13, nombre: 'Salmón con boniato', icono: '🐠',
    tipo: 'cena', meta: ['lose', 'maintain', 'gain'],
    tiempo: 25, dificultad: 'Fácil',
    cal: 420, protein: 36, carbs: 32, fat: 16, fiber: 4,
    desc: 'Rico en omega-3 y vitamina D. Cena completa y antiinflamatoria.',
    ingredientes: [
      { id: 4,  nombre: 'Salmón',         grams: 180 },
      { id: 29, nombre: 'Boniato cocido', grams: 150 },
      { id: 61, nombre: 'Brócoli',        grams: 100 },
      { id: 81, nombre: 'Aceite oliva',   grams: 10  },
    ],
  },
  {
    id: 14, nombre: 'Ropa vieja con yuca', icono: '🍲',
    tipo: 'cena', meta: ['maintain', 'gain'],
    tiempo: 50, dificultad: 'Difícil',
    cal: 480, protein: 34, carbs: 42, fat: 16, fiber: 4,
    desc: 'Plato emblemático cubano. Proteínas de res desmenuzada con yuca hervida.',
    ingredientes: [
      { id: 5,  nombre: 'Carne de res', grams: 200 },
      { id: 30, nombre: 'Yuca cocida',  grams: 150 },
      { id: 63, nombre: 'Tomate',       grams: 80  },
      { id: 68, nombre: 'Pimiento',     grams: 60  },
      { id: 66, nombre: 'Cebolla',      grams: 50  },
    ],
  },
  {
    id: 15, nombre: 'Churrasco con ensalada', icono: '🥩',
    tipo: 'cena', meta: ['maintain', 'gain'],
    tiempo: 20, dificultad: 'Fácil',
    cal: 440, protein: 46, carbs: 10, fat: 24, fiber: 3,
    desc: 'Clásico uruguayo. Alto en proteínas y zinc.',
    ingredientes: [
      { id: 5,  nombre: 'Carne de res', grams: 200 },
      { id: 65, nombre: 'Lechuga',      grams: 80  },
      { id: 63, nombre: 'Tomate',       grams: 80  },
      { id: 67, nombre: 'Pepino',       grams: 60  },
      { id: 81, nombre: 'Aceite oliva', grams: 15  },
    ],
  },
  {
    id: 16, nombre: 'Pasta con atún y tomate', icono: '🍝',
    tipo: 'cena', meta: ['gain', 'maintain'],
    tiempo: 20, dificultad: 'Fácil',
    cal: 450, protein: 32, carbs: 56, fat: 8, fiber: 4,
    desc: 'Pasta con proteína magra. Ideal post-entrenamiento.',
    ingredientes: [
      { id: 25, nombre: 'Pasta cocida',  grams: 200 },
      { id: 3,  nombre: 'Atún en agua', grams: 120 },
      { id: 63, nombre: 'Tomate',       grams: 100 },
      { id: 66, nombre: 'Cebolla',      grams: 40  },
      { id: 81, nombre: 'Aceite oliva', grams: 10  },
    ],
  },
  {
    id: 17, nombre: 'Picadillo a la criolla con arroz', icono: '🍲',
    tipo: 'cena', meta: ['maintain', 'gain'],
    tiempo: 30, dificultad: 'Moderada',
    cal: 520, protein: 36, carbs: 48, fat: 16, fiber: 4,
    desc: 'Carne molida con sofrito cubano y arroz. Completo y reconfortante.',
    ingredientes: [
      { id: 5,  nombre: 'Carne de res',        grams: 180 },
      { id: 20, nombre: 'Arroz blanco cocido', grams: 120 },
      { id: 63, nombre: 'Tomate',              grams: 80  },
      { id: 68, nombre: 'Pimiento',            grams: 60  },
      { id: 66, nombre: 'Cebolla',             grams: 50  },
    ],
  },
  {
    id: 18, nombre: 'Sardinas con papa y ensalada', icono: '🐟',
    tipo: 'cena', meta: ['lose', 'maintain'],
    tiempo: 15, dificultad: 'Fácil',
    cal: 360, protein: 30, carbs: 28, fat: 14, fiber: 3,
    desc: 'Rica en omega-3 y calcio. Económica y muy nutritiva.',
    ingredientes: [
      { id: 10, nombre: 'Sardinas en aceite', grams: 120 },
      { id: 27, nombre: 'Papa cocida',        grams: 120 },
      { id: 65, nombre: 'Lechuga',            grams: 60  },
      { id: 63, nombre: 'Tomate',             grams: 60  },
    ],
  },
  {
    id: 19, nombre: 'Aguacate con galletas', icono: '🥑',
    tipo: 'snack', meta: ['maintain', 'gain'],
    tiempo: 5, dificultad: 'Fácil',
    cal: 280, protein: 5, carbs: 22, fat: 20, fiber: 9,
    desc: 'Snack saciante con grasas saludables. Ideal entre comidas.',
    ingredientes: [
      { id: 79, nombre: 'Aguacate',      grams: 100 },
      { id: 33, nombre: 'Galletas agua', grams: 40  },
      { id: 63, nombre: 'Tomate',        grams: 50  },
    ],
  },
  {
    id: 20, nombre: 'Frutas tropicales con yogur', icono: '🍓',
    tipo: 'snack', meta: ['lose', 'maintain'],
    tiempo: 5, dificultad: 'Fácil',
    cal: 180, protein: 10, carbs: 30, fat: 1, fiber: 4,
    desc: 'Snack ligero y alto en vitamina C. Perfecto para media mañana.',
    ingredientes: [
      { id: 15, nombre: 'Yogur griego',       grams: 120 },
      { id: 74, nombre: 'Papaya fruta bomba', grams: 80  },
      { id: 77, nombre: 'Fresa',              grams: 60  },
      { id: 76, nombre: 'Piña',               grams: 60  },
    ],
  },
];

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

export default function Recetas({ appState }) {
  const { profile } = appState;

  const [filtroTipo, setFiltroTipo]       = useState('todos');
  const [filtroMeta, setFiltroMeta]       = useState('todos');
  const [busqueda, setBusqueda]           = useState('');
  const [recetaAbierta, setRecetaAbierta] = useState(null);
  const [agregado, setAgregado]           = useState({});

  // ── Selector plan semanal ──────────────────────────────
  const [diaSeleccionado,    setDiaSeleccionado]    = useState('Lunes');
  const [comidaSeleccionada, setComidaSeleccionada] = useState('desayuno');

  // Filtro de dieta
  const dietaActiva = profile?.dietType || 'balanced';
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

  const recetasFiltradas = RECETAS.filter(r => {
    const matchTipo  = filtroTipo === 'todos' || r.tipo === filtroTipo;
    const matchMeta  = filtroMeta === 'todos' || r.meta.includes(filtroMeta);
    const matchBusq  = r.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const matchDieta = (DIETA_FILTROS[dietaActiva] || (() => true))(r);
    return matchTipo && matchMeta && matchBusq && matchDieta;
  });

  // ── Agregar al Plan Semanal ────────────────────────────
  const agregarAlPlan = (receta) => {
    const planGuardado = localStorage.getItem('caloria_plan_semanal');
    const plan = planGuardado ? JSON.parse(planGuardado) : {};

    // Asegurarse que el día existe
    if (!plan[diaSeleccionado]) {
      plan[diaSeleccionado] = { desayuno: null, almuerzo: null, cena: null, snack: null };
    }

    // Construir el item con datos reales de la receta
    plan[diaSeleccionado][comidaSeleccionada] = {
      id:      receta.id,
      name:    receta.nombre,
      icon:    receta.icono,
      cal:     receta.cal,
      protein: receta.protein,
      carbs:   receta.carbs,
      fat:     receta.fat,
      fiber:   receta.fiber,
      grams:   100,
      esReceta: true,
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

      {/* Grid de recetas */}
      <div className="recetas-grid animate-fade-up-3">
        {recetasFiltradas.map(r => (
          <div key={r.id} className="receta-card card" onClick={() => {
            setRecetaAbierta(r);
            setComidaSeleccionada(r.tipo); // preseleccionar tipo de la receta
          }}>
            <div className="receta-top">
              <span className="receta-icono">{r.icono}</span>
              <div
                className="receta-tipo-badge"
                style={{
                  background: `${COLORS[r.tipo]}18`,
                  color: COLORS[r.tipo],
                  border: `1px solid ${COLORS[r.tipo]}33`,
                }}
              >
                {r.tipo}
              </div>
            </div>
            <h3 className="receta-nombre">{r.nombre}</h3>
            <p className="receta-desc">{r.desc}</p>
            <div className="receta-macros">
              <span className="receta-macro"><i className="bi bi-fire"></i> {r.cal} kcal</span>
              <span className="receta-macro" style={{ color: 'var(--accent-orange)' }}><i className="bi bi-egg"></i> {r.protein}g P</span>
              <span className="receta-macro" style={{ color: 'var(--accent-blue)' }}><i className="bi bi-lightning"></i> {r.carbs}g C</span>
              <span className="receta-macro" style={{ color: 'var(--accent-yellow)' }}><i className="bi bi-droplet"></i> {r.fat}g G</span>
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
              <div className="rm-macro"><span style={{ color: 'var(--accent-green)'  }}>{recetaAbierta.cal}</span>      <span>kcal</span>    </div>
              <div className="rm-macro"><span style={{ color: 'var(--accent-orange)' }}>{recetaAbierta.protein}g</span> <span>Proteína</span> </div>
              <div className="rm-macro"><span style={{ color: 'var(--accent-blue)'   }}>{recetaAbierta.carbs}g</span>   <span>Carbos</span>   </div>
              <div className="rm-macro"><span style={{ color: 'var(--accent-yellow)' }}>{recetaAbierta.fat}g</span>     <span>Grasa</span>    </div>
              <div className="rm-macro"><span style={{ color: 'var(--accent-green)'  }}>{recetaAbierta.fiber}g</span>   <span>Fibra</span>    </div>
            </div>

            <div className="receta-modal-ingredientes">
              <p className="receta-modal-label"><i className="bi bi-basket2"></i> Ingredientes</p>
              {recetaAbierta.ingredientes.map((ing, i) => {
                const food    = foodDatabase.find(f => f.id === ing.id);
                const calReal = food ? Math.round(food.cal * ing.grams / 100) : 0;
                return (
                  <div key={i} className="rm-ingrediente">
                    <span className="rm-ing-nombre">{ing.nombre}</span>
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

            {/* ── Selector Plan Semanal ── */}
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