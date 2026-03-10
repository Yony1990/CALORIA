import { useState } from 'react';
import './Advanced.css';
import { micronutrientGoals, foodDatabase } from '../../data/database';

// ── Recetas inline (mismas del componente Recetas) ──
const RECETAS = [
  { id:1,  nombre:'Avena con frutas tropicales',      icono:'🌾', tipo:'desayuno', meta:['maintain','lose','gain'],   tiempo:10, dificultad:'Fácil',    cal:320, protein:12, carbs:58, fat:6,  fiber:7,  desc:'Desayuno energético con avena, plátano y guayaba.',        ingredientes:[{id:22,nombre:'Avena',grams:60},{id:71,nombre:'Banano',grams:80},{id:75,nombre:'Guayaba',grams:50},{id:11,nombre:'Leche entera',grams:150},{id:85,nombre:'Miel',grams:10}] },
  { id:2,  nombre:'Huevos revueltos con pimiento',    icono:'🍳', tipo:'desayuno', meta:['lose','maintain','gain'],   tiempo:10, dificultad:'Fácil',    cal:280, protein:22, carbs:8,  fat:18, fiber:2,  desc:'Proteínas de calidad con vegetales.',                      ingredientes:[{id:2,nombre:'Huevo entero',grams:150},{id:68,nombre:'Pimiento',grams:80},{id:63,nombre:'Tomate',grams:60},{id:81,nombre:'Aceite oliva',grams:10}] },
  { id:3,  nombre:'Café con leche y tostadas',        icono:'☕', tipo:'desayuno', meta:['maintain','lose'],          tiempo:5,  dificultad:'Fácil',    cal:260, protein:10, carbs:38, fat:8,  fiber:2.5,desc:'Clásico desayuno cubano.',                                  ingredientes:[{id:13,nombre:'Café con leche',grams:200},{id:32,nombre:'Tostada',grams:60},{id:19,nombre:'Mantequilla',grams:10}] },
  { id:4,  nombre:'Yogur griego con mango',           icono:'🫙', tipo:'desayuno', meta:['lose','maintain'],          tiempo:5,  dificultad:'Fácil',    cal:220, protein:18, carbs:28, fat:2,  fiber:2,  desc:'Alto en proteínas y bajo en calorías.',                    ingredientes:[{id:15,nombre:'Yogur griego',grams:200},{id:73,nombre:'Mango',grams:100},{id:85,nombre:'Miel',grams:10},{id:80,nombre:'Almendras',grams:15}] },
  { id:5,  nombre:'Tortilla de espinaca',             icono:'🍳', tipo:'desayuno', meta:['gain','maintain'],          tiempo:15, dificultad:'Fácil',    cal:350, protein:24, carbs:10, fat:24, fiber:3,  desc:'Rica en hierro y proteínas.',                              ingredientes:[{id:2,nombre:'Huevo entero',grams:200},{id:62,nombre:'Espinaca',grams:80},{id:18,nombre:'Queso fresco',grams:40},{id:81,nombre:'Aceite oliva',grams:10}] },
  { id:6,  nombre:'Arroz con pollo cubano',           icono:'🍛', tipo:'almuerzo', meta:['maintain','gain'],          tiempo:40, dificultad:'Moderada', cal:480, protein:38, carbs:52, fat:10, fiber:3,  desc:'Plato típico cubano completo.',                            ingredientes:[{id:1,nombre:'Pollo pechuga',grams:200},{id:20,nombre:'Arroz blanco',grams:150},{id:63,nombre:'Tomate',grams:80},{id:68,nombre:'Pimiento',grams:60},{id:66,nombre:'Cebolla',grams:50},{id:81,nombre:'Aceite oliva',grams:10}] },
  { id:7,  nombre:'Lentejas con arroz',               icono:'🫘', tipo:'almuerzo', meta:['maintain','lose','gain'],   tiempo:30, dificultad:'Fácil',    cal:390, protein:22, carbs:65, fat:4,  fiber:14, desc:'Combinación perfecta de proteína vegetal.',               ingredientes:[{id:36,nombre:'Lentejas',grams:200},{id:20,nombre:'Arroz blanco',grams:100},{id:64,nombre:'Zanahoria',grams:80},{id:66,nombre:'Cebolla',grams:50},{id:81,nombre:'Aceite oliva',grams:10}] },
  { id:8,  nombre:'Moros y Cristianos saludable',     icono:'🍚', tipo:'almuerzo', meta:['maintain','gain'],          tiempo:35, dificultad:'Moderada', cal:420, protein:18, carbs:72, fat:5,  fiber:12, desc:'Clásico cubano con arroz y frijoles negros.',              ingredientes:[{id:20,nombre:'Arroz blanco',grams:150},{id:34,nombre:'Frijoles negros',grams:150},{id:66,nombre:'Cebolla',grams:50},{id:68,nombre:'Pimiento',grams:60},{id:81,nombre:'Aceite oliva',grams:10}] },
  { id:9,  nombre:'Milanesa de pollo con ensalada',   icono:'🍗', tipo:'almuerzo', meta:['lose','maintain'],          tiempo:25, dificultad:'Moderada', cal:380, protein:42, carbs:20, fat:14, fiber:3,  desc:'Alta en proteínas y moderada en calorías.',               ingredientes:[{id:1,nombre:'Pollo pechuga',grams:200},{id:65,nombre:'Lechuga',grams:80},{id:63,nombre:'Tomate',grams:80},{id:23,nombre:'Pan blanco',grams:30},{id:81,nombre:'Aceite oliva',grams:10}] },
  { id:10, nombre:'Sopa de pollo con verduras',       icono:'🍜', tipo:'almuerzo', meta:['lose','maintain'],          tiempo:40, dificultad:'Fácil',    cal:280, protein:28, carbs:22, fat:7,  fiber:4,  desc:'Baja en calorías y muy saciante.',                         ingredientes:[{id:7,nombre:'Pollo muslo',grams:150},{id:64,nombre:'Zanahoria',grams:80},{id:66,nombre:'Cebolla',grams:50},{id:27,nombre:'Papa cocida',grams:100},{id:62,nombre:'Espinaca',grams:50}] },
  { id:11, nombre:'Ensalada de atún con aguacate',    icono:'🥑', tipo:'almuerzo', meta:['lose','maintain'],          tiempo:10, dificultad:'Fácil',    cal:340, protein:32, carbs:12, fat:18, fiber:7,  desc:'Rica en omega-3 y grasas saludables.',                     ingredientes:[{id:3,nombre:'Atún en agua',grams:150},{id:79,nombre:'Aguacate',grams:100},{id:63,nombre:'Tomate',grams:80},{id:65,nombre:'Lechuga',grams:60},{id:67,nombre:'Pepino',grams:60}] },
  { id:12, nombre:'Potaje de frijoles colorados',     icono:'🍲', tipo:'almuerzo', meta:['maintain','gain'],          tiempo:45, dificultad:'Moderada', cal:360, protein:18, carbs:55, fat:6,  fiber:14, desc:'Clásico cubano reconfortante.',                            ingredientes:[{id:35,nombre:'Frijoles colorados',grams:200},{id:27,nombre:'Papa cocida',grams:100},{id:66,nombre:'Cebolla',grams:50},{id:68,nombre:'Pimiento',grams:60},{id:81,nombre:'Aceite oliva',grams:10}] },
  { id:13, nombre:'Salmón con boniato',               icono:'🐠', tipo:'cena',     meta:['lose','maintain','gain'],   tiempo:25, dificultad:'Fácil',    cal:420, protein:36, carbs:32, fat:16, fiber:4,  desc:'Rico en omega-3 y vitamina D.',                            ingredientes:[{id:4,nombre:'Salmón',grams:180},{id:29,nombre:'Boniato cocido',grams:150},{id:61,nombre:'Brócoli',grams:100},{id:81,nombre:'Aceite oliva',grams:10}] },
  { id:14, nombre:'Ropa vieja con yuca',              icono:'🍲', tipo:'cena',     meta:['maintain','gain'],          tiempo:50, dificultad:'Difícil',  cal:480, protein:34, carbs:42, fat:16, fiber:4,  desc:'Plato emblemático cubano.',                                ingredientes:[{id:5,nombre:'Carne de res',grams:200},{id:30,nombre:'Yuca cocida',grams:150},{id:63,nombre:'Tomate',grams:80},{id:68,nombre:'Pimiento',grams:60},{id:66,nombre:'Cebolla',grams:50}] },
  { id:15, nombre:'Churrasco con ensalada',           icono:'🥩', tipo:'cena',     meta:['maintain','gain'],          tiempo:20, dificultad:'Fácil',    cal:440, protein:46, carbs:10, fat:24, fiber:3,  desc:'Clásico uruguayo. Alto en proteínas.',                     ingredientes:[{id:5,nombre:'Carne de res',grams:200},{id:65,nombre:'Lechuga',grams:80},{id:63,nombre:'Tomate',grams:80},{id:67,nombre:'Pepino',grams:60},{id:81,nombre:'Aceite oliva',grams:15}] },
  { id:16, nombre:'Pasta con atún y tomate',          icono:'🍝', tipo:'cena',     meta:['gain','maintain'],          tiempo:20, dificultad:'Fácil',    cal:450, protein:32, carbs:56, fat:8,  fiber:4,  desc:'Ideal post-entrenamiento.',                                ingredientes:[{id:25,nombre:'Pasta cocida',grams:200},{id:3,nombre:'Atún en agua',grams:120},{id:63,nombre:'Tomate',grams:100},{id:66,nombre:'Cebolla',grams:40},{id:81,nombre:'Aceite oliva',grams:10}] },
  { id:17, nombre:'Picadillo a la criolla con arroz', icono:'🍲', tipo:'cena',     meta:['maintain','gain'],          tiempo:30, dificultad:'Moderada', cal:520, protein:36, carbs:48, fat:16, fiber:4,  desc:'Carne molida con sofrito cubano y arroz.',                 ingredientes:[{id:5,nombre:'Carne de res',grams:180},{id:20,nombre:'Arroz blanco',grams:120},{id:63,nombre:'Tomate',grams:80},{id:68,nombre:'Pimiento',grams:60},{id:66,nombre:'Cebolla',grams:50}] },
  { id:18, nombre:'Sardinas con papa y ensalada',     icono:'🐟', tipo:'cena',     meta:['lose','maintain'],          tiempo:15, dificultad:'Fácil',    cal:360, protein:30, carbs:28, fat:14, fiber:3,  desc:'Rica en omega-3 y calcio.',                                ingredientes:[{id:10,nombre:'Sardinas en aceite',grams:120},{id:27,nombre:'Papa cocida',grams:120},{id:65,nombre:'Lechuga',grams:60},{id:63,nombre:'Tomate',grams:60}] },
  { id:19, nombre:'Aguacate con galletas',            icono:'🥑', tipo:'snack',    meta:['maintain','gain'],          tiempo:5,  dificultad:'Fácil',    cal:280, protein:5,  carbs:22, fat:20, fiber:9,  desc:'Snack saciante con grasas saludables.',                    ingredientes:[{id:79,nombre:'Aguacate',grams:100},{id:33,nombre:'Galletas agua',grams:40},{id:63,nombre:'Tomate',grams:50}] },
  { id:20, nombre:'Frutas tropicales con yogur',      icono:'🍓', tipo:'snack',    meta:['lose','maintain'],          tiempo:5,  dificultad:'Fácil',    cal:180, protein:10, carbs:30, fat:1,  fiber:4,  desc:'Snack ligero y alto en vitamina C.',                       ingredientes:[{id:15,nombre:'Yogur griego',grams:120},{id:74,nombre:'Papaya',grams:80},{id:77,nombre:'Fresa',grams:60},{id:76,nombre:'Piña',grams:60}] },
];

const DIETA_FILTROS = {
  balanced:      () => true,
  keto:          (r) => r.fat >= 15 && r.carbs <= 10,
  lowcarb:       (r) => r.carbs <= 30,
  highprotein:   (r) => r.protein >= 25,
  vegan:         (r) => !r.ingredientes.some(ing => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,43,44,45,52,53,56].includes(ing.id)),
  mediterranean: (r) => r.fiber >= 3 || r.fat >= 10,
};

const COLORS = { desayuno:'var(--accent-yellow)', almuerzo:'var(--accent-green)', cena:'var(--accent-blue)', snack:'var(--accent-orange)' };
const METAS  = { lose:'Bajar peso', maintain:'Mantener', gain:'Ganar masa' };

function MicroCard({ id, data, current = 0 }) {
  const pct    = Math.min((current / data.goal) * 100, 100);
  const status = pct >= 80 ? 'good' : pct >= 40 ? 'mid' : 'low';
  const colors = { good:'var(--accent-green)', mid:'var(--accent-yellow)', low:'var(--accent-orange)' };
  const color  = colors[status];

  return (
    <div className={`micro-card card micro-${status}`}>
      <div className="micro-card-top">
        <div className="micro-icon-wrap" style={{ background:`${color}18`, border:`1px solid ${color}33` }}>
          <i className={`bi ${data.icon}`} style={{ color }}></i>
        </div>
        <div className="micro-info">
          <span className="micro-name">{data.name}</span>
          <span className="micro-vals">
            <span style={{ color, fontWeight:700 }}>{current}</span>
            <span style={{ color:'var(--text-muted)' }}> / {data.goal} {data.unit}</span>
          </span>
        </div>
        <span className={`micro-status-badge status-${status}`}>
          {status === 'good' ? '✓ OK' : status === 'mid' ? '~ Medio' : '! Bajo'}
        </span>
      </div>
      <div className="micro-progress-track">
        <div className="micro-progress-fill" style={{ width:`${pct}%`, background:color, boxShadow:`0 0 8px ${color}60` }} />
      </div>
      <span className="micro-pct">{Math.round(pct)}%</span>
    </div>
  );
}

function ModalRecetasDieta({ dieta, onClose, addMealItem }) {
  const [agregado, setAgregado] = useState({});
  const [recetaAbierta, setRecetaAbierta] = useState(null);

  const filtro   = DIETA_FILTROS[dieta.value] || (() => true);
  const recetas  = RECETAS.filter(filtro);

  const agregarAlDiario = (receta) => {
    const mealMap = { desayuno:'breakfast', almuerzo:'lunch', cena:'dinner', snack:'snacks' };
    const mealType = mealMap[receta.tipo];
    receta.ingredientes.forEach((ing) => {
      const foodData = foodDatabase.find(f => f.id === ing.id);
      if (!foodData) return;
      addMealItem(mealType, {
        ...foodData,
        grams: ing.grams,
        name: `${foodData.name} (${receta.nombre})`,
      });
    });
    setAgregado(prev => ({ ...prev, [receta.id]: true }));
    setTimeout(() => setAgregado(prev => ({ ...prev, [receta.id]: false })), 3000);
    setRecetaAbierta(null);
  };

  return (
    <div className="diet-modal-overlay" onClick={onClose}>
      <div className="diet-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="diet-modal-header">
          <div className="diet-modal-title-row">
            <span className="diet-modal-icon">{dieta.emoji}</span>
            <div>
              <h3 className="diet-modal-title">{dieta.label}</h3>
              <p className="diet-modal-sub">{dieta.desc} · {recetas.length} recetas compatibles</p>
            </div>
          </div>
          <button className="diet-modal-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Lista de recetas */}
        {recetas.length === 0 ? (
          <div className="diet-modal-empty">
            <i className="bi bi-search"></i>
            <p>No hay recetas compatibles con esta dieta aún.</p>
          </div>
        ) : (
          <div className="diet-modal-list">
            {recetas.map(r => (
              <div key={r.id} className="diet-modal-receta">
                <div
                  className="diet-modal-receta-info"
                  onClick={() => setRecetaAbierta(recetaAbierta?.id === r.id ? null : r)}
                >
                  <span className="diet-modal-receta-icon">{r.icono}</span>
                  <div className="diet-modal-receta-datos">
                    <span className="diet-modal-receta-nombre">{r.nombre}</span>
                    <div className="diet-modal-receta-macros">
                      <span style={{ color:'var(--accent-green)' }}><i className="bi bi-fire"></i> {r.cal} kcal</span>
                      <span style={{ color:'var(--accent-orange)' }}>{r.protein}g P</span>
                      <span style={{ color:'var(--accent-blue)' }}>{r.carbs}g C</span>
                      <span style={{ color:'var(--accent-yellow)' }}>{r.fat}g G</span>
                    </div>
                  </div>
                  <div className="diet-modal-receta-badges">
                    <span
                      className="receta-tipo-badge"
                      style={{ background:`${COLORS[r.tipo]}18`, color:COLORS[r.tipo], border:`1px solid ${COLORS[r.tipo]}33` }}
                    >
                      {r.tipo}
                    </span>
                    <i className={`bi bi-chevron-${recetaAbierta?.id === r.id ? 'up' : 'down'}`} style={{ color:'var(--text-muted)', fontSize:12 }}></i>
                  </div>
                </div>

                {/* Detalle expandible */}
                {recetaAbierta?.id === r.id && (
                  <div className="diet-modal-receta-detalle">
                    <p className="diet-modal-receta-desc">{r.desc}</p>
                    <div className="diet-modal-ingredientes">
                      {r.ingredientes.map((ing, i) => {
                        const food    = foodDatabase.find(f => f.id === ing.id);
                        const calReal = food ? Math.round(food.cal * ing.grams / 100) : 0;
                        return (
                          <div key={i} className="diet-modal-ing-row">
                            <span>{food?.icon || '🥘'} {ing.nombre}</span>
                            <span>{ing.grams}g</span>
                            <span style={{ color:'var(--accent-orange)' }}>{calReal} kcal</span>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      className={`btn btn-primary diet-modal-agregar ${agregado[r.id] ? 'agregado' : ''}`}
                      onClick={() => agregarAlDiario(r)}
                    >
                      <i className={`bi ${agregado[r.id] ? 'bi-check-circle-fill' : 'bi-plus-circle'}`}></i>
                      {agregado[r.id] ? '¡Agregado!' : `Agregar al ${r.tipo}`}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Advanced({ appState }) {
  const { meals, profile, saveProfile, addMealItem } = appState;
  const [modalDieta, setModalDieta] = useState(null);

  const allMeals = [...meals.breakfast, ...meals.lunch, ...meals.dinner, ...meals.snacks];

  const mockCurrent = allMeals.reduce((acc, item) => {
    const r = item.grams / 100;
    return {
      vitaminC:   acc.vitaminC   + ((item.vitC      || 0) * r),
      vitaminD:   acc.vitaminD   + ((item.vitD      || 0) * r * 40),
      vitaminB12: acc.vitaminB12 + ((item.vitB12    || 0) * r),
      iron:       acc.iron       + ((item.iron      || 0) * r),
      calcium:    acc.calcium    + ((item.calcium   || 0) * r),
      magnesium:  acc.magnesium  + ((item.magnesium || 0) * r),
      zinc:       acc.zinc       + ((item.zinc      || 0) * r),
      potassium:  acc.potassium  + ((item.potassium || 0) * r),
      omega3:     acc.omega3     + ((item.omega3    || 0) * r),
      fiber:      acc.fiber      + ((item.fiber     || 0) * r),
    };
  }, { vitaminC:0, vitaminD:0, vitaminB12:0, iron:0, calcium:0, magnesium:0, zinc:0, potassium:0, omega3:0, fiber:0 });

  const dietTypes = [
    { value:'balanced',     label:'Balanceada',    emoji:'⚖️',  icon:'bi-check2-all',       desc:'Equilibrio óptimo de macros'      },
    { value:'keto',         label:'Cetogénica',    emoji:'🔥',  icon:'bi-lightning-charge', desc:'Alta grasa, mínimos carbos'       },
    { value:'lowcarb',      label:'Low Carb',      emoji:'🥗',  icon:'bi-dash-circle',      desc:'Reducción moderada de carbos'     },
    { value:'highprotein',  label:'Alta Proteína', emoji:'💪',  icon:'bi-egg',              desc:'Ideal para ganancia muscular'     },
    { value:'vegan',        label:'Vegana',        emoji:'🌱',  icon:'bi-tree',             desc:'Sin productos animales'           },
    { value:'mediterranean',label:'Mediterránea',  emoji:'🫒',  icon:'bi-water',            desc:'Grasas saludables y fibra'        },
  ];

  return (
    <div className="advanced-page">
      <div className="page-header animate-fade-up-1">
        <div>
          <p className="page-sub">Nutrición</p>
          <h2 className="page-title">Micronutrientes & Dieta</h2>
        </div>
        <span className="badge badge-blue"><i className="bi bi-microscope"></i> Análisis avanzado</span>
      </div>

      {/* Diet selector */}
      <div className="card diet-selector animate-fade-up-2">
        <p className="card-label"><i className="bi bi-list-stars"></i> Tipo de dieta</p>
        <div className="diet-grid">
          {dietTypes.map(d => (
            <button
              key={d.value}
              className={`diet-btn ${profile.dietType === d.value ? 'active' : ''}`}
              onClick={() => {
                saveProfile({ dietType: d.value });
                setModalDieta(d);
              }}
            >
              <i className={`bi ${d.icon}`}></i>
              <span className="diet-btn-label">{d.label}</span>
              <span className="diet-btn-desc">{d.desc}</span>
              <span className="diet-btn-ver">Ver recetas <i className="bi bi-arrow-right"></i></span>
            </button>
          ))}
        </div>
      </div>

      {/* Micronutrients */}
      <div className="animate-fade-up-3">
        <div className="section-header">
          <h3 className="section-title">Micronutrientes de hoy</h3>
          <span className="badge badge-green"><i className="bi bi-check-circle"></i> Tiempo real</span>
        </div>
        <div className="micro-grid">
          {Object.entries(micronutrientGoals).map(([id, data]) => (
            <MicroCard key={id} id={id} data={data} current={Math.round(mockCurrent[id] || 0)} />
          ))}
        </div>
      </div>

      {/* Vitamin guide */}
      <div className="card vitamin-info-card animate-fade-up-4">
        <p className="card-label"><i className="bi bi-book"></i> Guía de micronutrientes</p>
        <div className="vitamin-guide-grid">
          {[
            { icon:'bi-brightness-high', color:'var(--accent-yellow)', name:'Vitamina C',  foods:'Naranja, fresa, brócoli',   benefit:'Inmunidad y colágeno'      },
            { icon:'bi-sun',             color:'var(--accent-orange)', name:'Vitamina D',  foods:'Salmón, yema de huevo',     benefit:'Huesos y sistema nervioso' },
            { icon:'bi-droplet-fill',    color:'var(--accent-blue)',   name:'Hierro',      foods:'Carne roja, espinacas',     benefit:'Transporte de oxígeno'     },
            { icon:'bi-gem',             color:'#c0c0ff',              name:'Calcio',      foods:'Lácteos, almendras',        benefit:'Huesos y músculo'          },
            { icon:'bi-lightning-charge',color:'var(--accent-green)',  name:'Magnesio',    foods:'Avena, aguacate, nueces',   benefit:'Energía y recuperación'    },
            { icon:'bi-heart-pulse',     color:'#ff6b9d',              name:'Potasio',     foods:'Plátano, papa, aguacate',   benefit:'Función cardíaca'          },
          ].map(v => (
            <div key={v.name} className="vitamin-guide-item">
              <div className="vg-icon" style={{ background:`${v.color}18`, border:`1px solid ${v.color}33` }}>
                <i className={`bi ${v.icon}`} style={{ color:v.color }}></i>
              </div>
              <div>
                <p className="vg-name">{v.name}</p>
                <p className="vg-benefit">{v.benefit}</p>
                <p className="vg-foods"><i className="bi bi-basket2"></i> {v.foods}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal recetas por dieta */}
      {modalDieta && (
        <ModalRecetasDieta
          dieta={modalDieta}
          onClose={() => setModalDieta(null)}
          addMealItem={addMealItem}
        />
      )}
    </div>
  );
}