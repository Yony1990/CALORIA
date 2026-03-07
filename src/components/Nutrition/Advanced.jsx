import './Advanced.css';
import { micronutrientGoals } from '../../data/database';

function MicroCard({ id, data, current = 0 }) {
  const pct = Math.min((current / data.goal) * 100, 100);
  const status = pct >= 80 ? 'good' : pct >= 40 ? 'mid' : 'low';
  const colors = { good: 'var(--accent-green)', mid: 'var(--accent-yellow)', low: 'var(--accent-orange)' };
  const color = colors[status];

  return (
    <div className={`micro-card card micro-${status}`}>
      <div className="micro-card-top">
        <div className="micro-icon-wrap" style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
          <i className={`bi ${data.icon}`} style={{ color }}></i>
        </div>
        <div className="micro-info">
          <span className="micro-name">{data.name}</span>
          <span className="micro-vals">
            <span style={{ color, fontWeight: 700 }}>{current}</span>
            <span style={{ color: 'var(--text-muted)' }}> / {data.goal} {data.unit}</span>
          </span>
        </div>
        <span className={`micro-status-badge status-${status}`}>
          {status === 'good' ? '✓ OK' : status === 'mid' ? '~ Medio' : '! Bajo'}
        </span>
      </div>
      <div className="micro-progress-track">
        <div className="micro-progress-fill" style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}60` }} />
      </div>
      <span className="micro-pct">{Math.round(pct)}%</span>
    </div>
  );
}

export default function Advanced({ appState }) {
  const { meals } = appState;

  const allMeals = [...meals.breakfast, ...meals.lunch, ...meals.dinner, ...meals.snacks];

  const mockCurrent = allMeals.reduce((acc, item) => {
    const r = item.grams / 100;
    return {
      vitaminC:  acc.vitaminC  + ((item.vitC      || 0) * r),
      vitaminD:  acc.vitaminD  + ((item.vitD      || 0) * r * 40),
      vitaminB12:acc.vitaminB12+ ((item.vitB12    || 0) * r),
      iron:      acc.iron      + ((item.iron      || 0) * r),
      calcium:   acc.calcium   + ((item.calcium   || 0) * r),
      magnesium: acc.magnesium + ((item.magnesium || 0) * r),
      zinc:      acc.zinc      + ((item.zinc      || 0) * r),
      potassium: acc.potassium + ((item.potassium || 0) * r),
      omega3:    acc.omega3    + ((item.omega3    || 0) * r),
      fiber:     acc.fiber     + ((item.fiber     || 0) * r),
    };
  }, { vitaminC:0, vitaminD:0, vitaminB12:0, iron:0, calcium:0, magnesium:0, zinc:0, potassium:0, omega3:0, fiber:0 });

  const dietTypes = [
    { value: 'balanced', label: 'Balanceada', icon: 'bi-check2-all', desc: 'Equilibrio óptimo de macros' },
    { value: 'keto', label: 'Cetogénica', icon: 'bi-lightning-charge', desc: 'Alta grasa, mínimos carbos' },
    { value: 'lowcarb', label: 'Low Carb', icon: 'bi-dash-circle', desc: 'Reducción moderada de carbos' },
    { value: 'highprotein', label: 'Alta Proteína', icon: 'bi-egg', desc: 'Ideal para ganancia muscular' },
    { value: 'vegan', label: 'Vegana', icon: 'bi-tree', desc: 'Sin productos animales' },
    { value: 'mediterranean', label: 'Mediterránea', icon: 'bi-water', desc: 'Grasas saludables y fibra' },
  ];

  const { profile, saveProfile } = appState;

  return (
    <div className="advanced-page">
      <div className="page-header animate-fade-up-1">
        <div>
          <p className="page-sub">Nutrición</p>
          <h2 className="page-title">Micronutrientes & Dieta</h2>
        </div>
        <span className="badge badge-blue"><i className="bi bi-microscope"></i> Análisis avanzado</span>
      </div>

      {/* Diet type selector */}
      <div className="card diet-selector animate-fade-up-2">
        <p className="card-label"><i className="bi bi-list-stars"></i> Tipo de dieta</p>
        <div className="diet-grid">
          {dietTypes.map(d => (
            <button
              key={d.value}
              className={`diet-btn ${profile.dietType === d.value ? 'active' : ''}`}
              onClick={() => saveProfile({ dietType: d.value })}
            >
              <i className={`bi ${d.icon}`}></i>
              <span className="diet-btn-label">{d.label}</span>
              <span className="diet-btn-desc">{d.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Micronutrients */}
      <div className="animate-fade-up-3">
        <div className="section-header">
          <h3 className="section-title">Micronutrientes de hoy</h3>
          
          <span className="badge badge-green">
            <i className="bi bi-check-circle"></i> Tiempo real
          </span>
        </div>
        <div className="micro-grid">
          {Object.entries(micronutrientGoals).map(([id, data]) => (
            <MicroCard key={id} id={id} data={data} current={mockCurrent[id] || 0} />
          ))}
        </div>
      </div>

      {/* Vitamin info */}
      <div className="card vitamin-info-card animate-fade-up-4">
        <p className="card-label"><i className="bi bi-book"></i> Guía de micronutrientes</p>
        <div className="vitamin-guide-grid">
          {[
            { icon: 'bi-brightness-high', color: 'var(--accent-yellow)', name: 'Vitamina C', foods: 'Naranja, fresa, brócoli', benefit: 'Inmunidad y colágeno' },
            { icon: 'bi-sun', color: 'var(--accent-orange)', name: 'Vitamina D', foods: 'Salmón, yema de huevo', benefit: 'Huesos y sistema nervioso' },
            { icon: 'bi-droplet-fill', color: 'var(--accent-blue)', name: 'Hierro', foods: 'Carne roja, espinacas', benefit: 'Transporte de oxígeno' },
            { icon: 'bi-gem', color: '#c0c0ff', name: 'Calcio', foods: 'Lácteos, almendras', benefit: 'Huesos y músculo' },
            { icon: 'bi-lightning-charge', color: 'var(--accent-green)', name: 'Magnesio', foods: 'Avena, aguacate, nueces', benefit: 'Energía y recuperación' },
            { icon: 'bi-heart-pulse', color: '#ff6b9d', name: 'Potasio', foods: 'Plátano, papa, aguacate', benefit: 'Función cardíaca' },
          ].map(v => (
            <div key={v.name} className="vitamin-guide-item">
              <div className="vg-icon" style={{ background: `${v.color}18`, border: `1px solid ${v.color}33` }}>
                <i className={`bi ${v.icon}`} style={{ color: v.color }}></i>
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
    </div>
  );
}
