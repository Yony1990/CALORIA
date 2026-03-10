import { useState } from 'react';
import './Bienestar.css';

const HABITOS = [
  { id: 'sueno',  label: 'Sueño',          icon: 'bi-moon-stars',     unit: 'horas', min: 0, max: 12,    step: 0.5, meta: 8,    color: 'var(--accent-blue)',   tip: 'Dormir bien regula el cortisol y reduce el apetito' },
  { id: 'estres', label: 'Estrés',          icon: 'bi-emoji-frown',    unit: '/5',    min: 1, max: 5,     step: 1,   meta: 1,    color: 'var(--accent-orange)', tip: 'El estrés alto eleva el cortisol y aumenta el almacenamiento de grasa' },
  { id: 'pasos',  label: 'Pasos',           icon: 'bi-person-walking', unit: 'pasos', min: 0, max: 20000, step: 500, meta: 8000, color: 'var(--accent-green)',  tip: '8000 pasos diarios equivalen a ~300 kcal extra quemadas' },
  { id: 'sol',    label: 'Minutos de sol',  icon: 'bi-sun',            unit: 'min',   min: 0, max: 120,   step: 5,   meta: 20,   color: 'var(--accent-yellow)', tip: 'El sol activa la síntesis de Vitamina D esencial para el metabolismo' },
  { id: 'suenoQ', label: 'Calidad sueño',   icon: 'bi-stars',          unit: '/5',    min: 1, max: 5,     step: 1,   meta: 5,    color: 'var(--accent-blue)',   tip: 'Sueño de mala calidad reduce la recuperación muscular' },
  { id: 'humor',  label: 'Humor',           icon: 'bi-emoji-smile',    unit: '/5',    min: 1, max: 5,     step: 1,   meta: 5,    color: '#ff6b9d',              tip: 'El bienestar mental afecta directamente tus decisiones alimenticias' },
];

const calPasos = (pasos) => Math.round(pasos * 0.04);

const impactoEstres = (estres) => {
  if (estres <= 2) return { label: 'Sin impacto',           color: 'var(--accent-green)',  kcal: 0    };
  if (estres === 3) return { label: '-50 kcal efectivas',   color: 'var(--accent-yellow)', kcal: -50  };
  if (estres === 4) return { label: '-120 kcal efectivas',  color: 'var(--accent-orange)', kcal: -120 };
  return               { label: '-200 kcal efectivas',  color: '#ff4444',              kcal: -200 };
};

const impactoSueno = (horas) => {
  if (horas >= 7.5) return { label: 'Metabolismo óptimo',      color: 'var(--accent-green)',  kcal: 0    };
  if (horas >= 6)   return { label: '-80 kcal metabolismo',    color: 'var(--accent-yellow)', kcal: -80  };
  return                   { label: '-150 kcal metabolismo',   color: 'var(--accent-orange)', kcal: -150 };
};

const defaultHabitos = { sueno: 7, estres: 2, pasos: 5000, sol: 15, suenoQ: 3, humor: 3 };

export default function Bienestar({ appState }) {
  const [guardado, setGuardado] = useState(false);

  const { getTotalConsumed, calculateTargetCalories } = appState;

  const [habitos, setHabitos] = useState(() => {
    const hoy = new Date().toLocaleDateString('es-ES');
    const fechaGuardada = localStorage.getItem('caloria_bienestar_fecha');
    // Si es un día nuevo, resetear los sliders
    if (fechaGuardada !== hoy) {
        localStorage.removeItem('caloria_bienestar');
        localStorage.removeItem('caloria_bienestar_fecha');
        return defaultHabitos;
    }
    const saved = localStorage.getItem('caloria_bienestar');
    return saved ? JSON.parse(saved) : defaultHabitos;
  });

  const [historial, setHistorial] = useState(() => {
    const saved = localStorage.getItem('caloria_bienestar_historial');
    return saved ? JSON.parse(saved) : [];
  });

  const saveHabito = (id, val) => {
    const updated = { ...habitos, [id]: val };
    setHabitos(updated);
    localStorage.setItem('caloria_bienestar', JSON.stringify(updated));
  };

  const guardarDia = () => {
    const hoy = new Date().toLocaleDateString('es-ES');
    const entry = { ...habitos, fecha: hoy, ts: Date.now() };
    const updated = [...historial.filter(h => h.fecha !== hoy), entry].slice(-14);
    setHistorial(updated);
    localStorage.setItem('caloria_bienestar_historial', JSON.stringify(updated));
    localStorage.setItem('caloria_bienestar_fecha', hoy);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  const consumed   = getTotalConsumed();
  const target     = calculateTargetCalories();
  const extraPasos = calPasos(habitos.pasos);
  const efEstres   = impactoEstres(habitos.estres);
  const efSueno    = impactoSueno(habitos.sueno);
  const calEfectivas = Math.round(target + extraPasos + efEstres.kcal + efSueno.kcal);

  const score = Math.min(100, Math.round(
    ((habitos.sueno / 8) * 25) +
    (((5 - habitos.estres) / 4) * 25) +
    ((Math.min(habitos.pasos, 8000) / 8000) * 20) +
    ((habitos.sol / 20) * 10) +
    ((habitos.suenoQ / 5) * 10) +
    ((habitos.humor / 5) * 10)
  ));
  const scoreColor = score >= 75 ? 'var(--accent-green)' : score >= 50 ? 'var(--accent-yellow)' : 'var(--accent-orange)';

  const circumference = 2 * Math.PI * 50;

  return (
    <div className="bienestar-page">

      {/* Header */}
      <div className="page-header animate-fade-up-1">
        <div>
          <p className="page-sub">Salud integral</p>
          <h2 className="page-title">Bienestar & Hábitos</h2>
        </div>

        
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className="badge" style={{ background: `${scoreColor}18`, color: scoreColor, border: `1px solid ${scoreColor}33` }}>
                <i className="bi bi-heart-pulse-fill"></i> Score {score}/100
            </span>
            <button className="btn btn-primary" onClick={guardarDia} disabled={guardado}>
                <i className={`bi ${guardado ? 'bi-check-circle-fill' : 'bi-check2'}`}></i>
                {guardado ? '¡Guardado!' : 'Guardar día'}
            </button>
        </div>

        {/* Toast notificación */}
        {guardado && (
        <div className="toast-guardado">
            <i className="bi bi-check-circle-fill"></i> Hábitos del día guardados correctamente
        </div>
        )}

      </div>

      {/* Impacto calórico */}
      <div className="card impacto-card animate-fade-up-2">
        <p className="card-label"><i className="bi bi-calculator"></i> Impacto en tu meta calórica hoy</p>
        <div className="impacto-grid">
          <div className="impacto-item">
            <span className="impacto-label">Meta base</span>
            <span className="impacto-val">{target} kcal</span>
          </div>
          <div className="impacto-item">
            <span className="impacto-label">+ Pasos ({habitos.pasos.toLocaleString()})</span>
            <span className="impacto-val" style={{ color: 'var(--accent-green)' }}>+{extraPasos} kcal</span>
          </div>
          <div className="impacto-item">
            <span className="impacto-label">Estrés</span>
            <span className="impacto-val" style={{ color: efEstres.color }}>{efEstres.label}</span>
          </div>
          <div className="impacto-item">
            <span className="impacto-label">Sueño</span>
            <span className="impacto-val" style={{ color: efSueno.color }}>{efSueno.label}</span>
          </div>
          <div className="impacto-item impacto-total">
            <span className="impacto-label">Meta ajustada</span>
            <span className="impacto-val impacto-val-main" style={{ color: 'var(--accent-green)' }}>{calEfectivas} kcal</span>
          </div>
          <div className="impacto-item">
            <span className="impacto-label">Consumidas hoy</span>
            <span className="impacto-val" style={{ color: consumed.cal > calEfectivas ? 'var(--accent-orange)' : 'var(--accent-blue)' }}>
              {consumed.cal} kcal
            </span>
          </div>
        </div>
      </div>

      {/* Hábitos del día */}
      <div className="animate-fade-up-3">
        <p className="section-label">Registrá tus hábitos de hoy</p>
        <div className="habitos-grid">
          {HABITOS.map(h => {
            const val    = habitos[h.id];
            const pct    = ((val - h.min) / (h.max - h.min)) * 100;

            {/* const cumple = h.id === 'estres' ? val <= 2 : val >= h.meta;
            const color  = cumple ? 'var(--accent-green)' : 'var(--accent-orange)'; */}
            const getEstado = () => {
                if (h.id === 'estres') {
                    if (val <= 2) return 'var(--accent-green)';
                    if (val <= 3) return 'var(--accent-orange)';
                    return '#ff3333';
                }
                const pctMeta = val / h.meta;
                if (pctMeta >= 1)   return 'var(--accent-green)';
                if (pctMeta >= 0.5) return 'var(--accent-orange)';
                return '#ff3333';
            };
            const cumple = h.id === 'estres' ? val <= 2 : val >= h.meta;
            const color  = getEstado();

            return (
              <div key={h.id} className="habito-card card">
                <div className="habito-top">
                  <div className="habito-icon-wrap" style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
                    <i className={`bi ${h.icon}`} style={{ color }}></i>
                  </div>
                  <div className="habito-info">
                    <span className="habito-label">{h.label}</span>
                    <span className="habito-val" style={{ color }}>{val} {h.unit}</span>
                  </div>
                  <span className={`habito-badge ${cumple ? 'badge-green' : 'badge-orange'}`}>
                    {cumple ? '✓ OK' : '! Mejorar'}
                  </span>
                </div>

                {/* Slider con track visible */}

                <div
                    className="habito-slider-wrap"
                    style={{ '--color': color, '--pct': `${pct}%` }}
                    onClick={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const newPct = Math.max(0, Math.min(1, x / rect.width));
                        const newVal = h.min + newPct * (h.max - h.min);
                        const stepped = Math.round(newVal / h.step) * h.step;
                        saveHabito(h.id, parseFloat(Math.min(h.max, Math.max(h.min, stepped)).toFixed(2)));
                    }}
                    onMouseMove={e => {
                        if (e.buttons !== 1) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const newPct = Math.max(0, Math.min(1, x / rect.width));
                        const newVal = h.min + newPct * (h.max - h.min);
                        const stepped = Math.round(newVal / h.step) * h.step;
                        saveHabito(h.id, parseFloat(Math.min(h.max, Math.max(h.min, stepped)).toFixed(2)));
                    }}
                    onTouchStart={e => {
                        e.preventDefault();
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.touches[0].clientX - rect.left;
                        const newPct = Math.max(0, Math.min(1, x / rect.width));
                        const newVal = h.min + newPct * (h.max - h.min);
                        const stepped = Math.round(newVal / h.step) * h.step;
                        saveHabito(h.id, parseFloat(Math.min(h.max, Math.max(h.min, stepped)).toFixed(2)));
                    }}
                    onTouchMove={e => {
                        e.preventDefault();
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.touches[0].clientX - rect.left;
                        const newPct = Math.max(0, Math.min(1, x / rect.width));
                        const newVal = h.min + newPct * (h.max - h.min);
                        const stepped = Math.round(newVal / h.step) * h.step;
                        saveHabito(h.id, parseFloat(Math.min(h.max, Math.max(h.min, stepped)).toFixed(2)));
                    }}
                    >
                    <div className="habito-track-bg" />
                    <div className="habito-track-fill" />
                    <div className="habito-thumb" />
                </div>
                
                {/* <div
                    className="habito-slider-wrap"
                    style={{ '--color': color, '--pct': `${pct}%` }}
                    onClick={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const newPct = Math.max(0, Math.min(1, x / rect.width));
                        const newVal = h.min + newPct * (h.max - h.min);
                        const stepped = Math.round(newVal / h.step) * h.step;
                        saveHabito(h.id, parseFloat(Math.min(h.max, Math.max(h.min, stepped)).toFixed(2)));
                    }}
                    onMouseMove={e => {
                        if (e.buttons !== 1) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const newPct = Math.max(0, Math.min(1, x / rect.width));
                        const newVal = h.min + newPct * (h.max - h.min);
                        const stepped = Math.round(newVal / h.step) * h.step;
                        saveHabito(h.id, parseFloat(Math.min(h.max, Math.max(h.min, stepped)).toFixed(2)));
                    }}
                    >
                    <div className="habito-track-bg" />
                    <div className="habito-track-fill" />
                    <div className="habito-thumb" />
                </div> */}

                <p className="habito-tip"><i className="bi bi-lightbulb"></i> {h.tip}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Score visual */}
      <div className="card score-card animate-fade-up-4">
        <p className="card-label"><i className="bi bi-award"></i> Puntuación de bienestar</p>
        <div className="score-display">

          {/* Círculo sin sombra desbordada */}
          <div className="score-ring-wrap">
            <svg width="140" height="140" viewBox="0 0 140 140" style={{ overflow: 'visible' }}>
              <circle cx="70" cy="70" r="55" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
              <circle
                cx="70" cy="70" r="55"
                fill="none"
                stroke={scoreColor}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - score / 100)}
                strokeLinecap="round"
                transform="rotate(-90 70 70)"
                style={{ filter: `drop-shadow(0 0 6px ${scoreColor})` }}
              />
            </svg>
            <div className="score-ring-inner">
              <span className="score-num" style={{ color: scoreColor }}>{score}</span>
              <span className="score-sub">/100</span>
            </div>
          </div>

          <div className="score-breakdown">
            {[
              { label: 'Sueño',   val: Math.round((habitos.sueno / 8) * 25),               max: 25, color: 'var(--accent-blue)'   },
              { label: 'Estrés',  val: Math.round(((5 - habitos.estres) / 4) * 25),        max: 25, color: 'var(--accent-orange)' },
              { label: 'Pasos',   val: Math.round((Math.min(habitos.pasos,8000)/8000)*20),  max: 20, color: 'var(--accent-green)'  },
              { label: 'Sol',     val: Math.round((habitos.sol / 20) * 10),                 max: 10, color: 'var(--accent-yellow)' },
              { label: 'Calidad', val: Math.round((habitos.suenoQ / 5) * 10),              max: 10, color: 'var(--accent-blue)'   },
              { label: 'Humor',   val: Math.round((habitos.humor / 5) * 10),               max: 10, color: '#ff6b9d'              },
            ].map(s => (
              <div key={s.label} className="score-row">
                <span className="score-row-label">{s.label}</span>
                <div className="score-row-bar">
                  <div className="score-row-fill" style={{ width: `${(s.val / s.max) * 100}%`, background: s.color }} />
                </div>
                <span className="score-row-val" style={{ color: s.color }}>{s.val}/{s.max}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historial */}
      {historial.length > 0 && (
        <div className="card historial-card animate-fade-up-4">
          <p className="card-label"><i className="bi bi-calendar-week"></i> Historial reciente</p>
          <div className="historial-grid">
            {historial.slice(-7).reverse().map((h, i) => {
              const s = Math.min(100, Math.round(((h.sueno/8)*25) + (((5-h.estres)/4)*25) + ((Math.min(h.pasos,8000)/8000)*20) + ((h.sol/20)*10) + ((h.suenoQ/5)*10) + ((h.humor/5)*10)));
              const c = s >= 75 ? 'var(--accent-green)' : s >= 50 ? 'var(--accent-yellow)' : 'var(--accent-orange)';
              return (
                <div key={i} className="historial-item">
                  <span className="historial-fecha">{h.fecha}</span>
                  <span className="historial-score" style={{ color: c }}>{s}</span>
                  <span className="historial-label">pts</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}