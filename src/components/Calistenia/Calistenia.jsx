import { useState, useMemo } from 'react';
import './Calistenia.css';

// ── FÓRMULA MET ─────────────────────────────────────────
// Calorías = MET × peso(kg) × 0.0175 × minutos
const calcCal = (met, peso, mins) => Math.round(met * peso * 0.0175 * mins);

// ── BASE DE EJERCICIOS CON MET ───────────────────────────
const EJERCICIOS = {
  flexiones:        { nombre: 'Flexiones',         met: 8.0, musculo: 'Pecho/Tríceps',   icono: '💪', desc: 'Posición de plancha, bajar pecho al suelo y subir' },
  flexionesInclin:  { nombre: 'Flex. Inclinadas',  met: 6.0, musculo: 'Pecho/Hombros',   icono: '💪', desc: 'Manos elevadas, variante más fácil' },
  flexionesDiamond: { nombre: 'Flex. Diamante',    met: 9.0, musculo: 'Tríceps',          icono: '💪', desc: 'Manos juntas formando diamante' },
  flexionesArcher:  { nombre: 'Flex. Archer',      met: 9.5, musculo: 'Pecho/Unilateral', icono: '💪', desc: 'Un brazo extendido lateralmente' },
  sentadillas:      { nombre: 'Sentadillas',        met: 5.0, musculo: 'Piernas/Glúteos', icono: '🦵', desc: 'Pies separados al ancho de hombros, bajar hasta 90°' },
  sentadillasSumo:  { nombre: 'Sent. Sumo',        met: 5.5, musculo: 'Glúteos/Aductores',icono: '🦵', desc: 'Pies muy abiertos, puntas hacia afuera' },
  pistolSquat:      { nombre: 'Pistol Squat',      met: 8.0, musculo: 'Piernas/Equilibrio',icono: '🦵', desc: 'Sentadilla con una sola pierna' },
  zancadas:         { nombre: 'Zancadas',           met: 5.5, musculo: 'Piernas/Glúteos', icono: '🦵', desc: 'Un paso largo al frente bajando la rodilla' },
  dominadas:        { nombre: 'Dominadas',          met: 8.0, musculo: 'Espalda/Bíceps',  icono: '🏋️', desc: 'Colgado de barra, subir hasta barbilla sobre ella' },
  australianas:     { nombre: 'Australianas',       met: 6.0, musculo: 'Espalda/Bíceps',  icono: '🏋️', desc: 'Variante horizontal, barra baja o mesa' },
  fondos:           { nombre: 'Fondos',             met: 8.0, musculo: 'Tríceps/Pecho',   icono: '💪', desc: 'En paralelas o silla, bajar y subir el cuerpo' },
  plancha:          { nombre: 'Plancha',            met: 4.0, musculo: 'Core',             icono: '🧘', desc: 'Cuerpo recto apoyado en antebrazos y puntas' },
  planchaLateral:   { nombre: 'Plancha Lateral',   met: 4.5, musculo: 'Core/Oblicuos',   icono: '🧘', desc: 'Apoyado en un antebrazo de lado' },
  mountainClimbers: { nombre: 'Mountain Climbers', met: 8.0, musculo: 'Core/Cardio',     icono: '🔥', desc: 'En plancha, alternar rodillas al pecho rápido' },
  burpees:          { nombre: 'Burpees',            met: 10.0,musculo: 'Full Body/Cardio',icono: '🔥', desc: 'Plancha + flexión + salto explosivo' },
  jumpingJacks:     { nombre: 'Jumping Jacks',      met: 8.0, musculo: 'Cardio',          icono: '🔥', desc: 'Saltos abriendo piernas y brazos' },
  lSit:             { nombre: 'L-Sit',              met: 5.0, musculo: 'Core/Fuerza',     icono: '🧘', desc: 'Sentado en el suelo, levantar cuerpo con brazos' },
  pikePushup:       { nombre: 'Pike Push-up',       met: 7.0, musculo: 'Hombros',         icono: '💪', desc: 'Cuerpo en V invertida, flexión para hombros' },
  hiperextensiones: { nombre: 'Hiperextensiones',  met: 4.5, musculo: 'Lumbar/Glúteos',  icono: '🧘', desc: 'Boca abajo, levantar tronco del suelo' },
  gluteBridge:      { nombre: 'Glute Bridge',       met: 4.0, musculo: 'Glúteos',         icono: '🦵', desc: 'Tumbado boca arriba, elevar caderas' },
};

// ── PLANES POR NIVEL ─────────────────────────────────────
const generarPlan = (nivel, peso, meta) => {
  // series y reps según nivel
  const cfg = {
    principiante: { s: 3, mul: 1.0, descanso: '60s' },
    intermedio:   { s: 4, mul: 1.3, descanso: '45s' },
    avanzado:     { s: 5, mul: 1.6, descanso: '30s' },
  }[nivel];

  // ajuste según meta
  const metaMul = meta === 'lose' ? 1.2 : meta === 'gain' ? 0.9 : 1.0;

  const ex = (id, reps, mins) => ({
    id,
    ...EJERCICIOS[id],
    series: cfg.s,
    reps: Math.round(reps * cfg.mul * metaMul),
    mins,
    cal: calcCal(EJERCICIOS[id].met, peso, mins),
    descanso: cfg.descanso,
  });

  const planes = {
    fullbody: {
      nombre: 'Fullbody 3x Semana',
      icono: '⚡',
      desc: 'Trabaja todo el cuerpo 3 veces por semana con descanso entre sesiones. Ideal para principiantes e intermedios.',
      diasSemana: ['Lunes', 'Miércoles', 'Viernes'],
      sesiones: {
        principiante: [
          { dia: 'Lunes',     ejercicios: [ex('flexionesInclin',8,8), ex('sentadillas',12,10), ex('australianas',6,8), ex('plancha',30,4), ex('gluteBridge',12,8)] },
          { dia: 'Miércoles', ejercicios: [ex('flexiones',8,8),       ex('zancadas',10,10),    ex('fondos',8,8),       ex('mountainClimbers',20,5), ex('hiperextensiones',12,6)] },
          { dia: 'Viernes',   ejercicios: [ex('flexionesInclin',10,8),ex('sentadillasSumo',12,10),ex('australianas',8,8),ex('planchaLateral',20,4),ex('jumpingJacks',20,5)] },
        ],
        intermedio: [
          { dia: 'Lunes',     ejercicios: [ex('flexiones',12,10), ex('sentadillas',15,12), ex('dominadas',6,10), ex('plancha',45,5), ex('burpees',8,8)] },
          { dia: 'Miércoles', ejercicios: [ex('flexionesDiamond',10,10), ex('zancadas',12,12), ex('fondos',12,10), ex('mountainClimbers',25,6), ex('gluteBridge',15,8)] },
          { dia: 'Viernes',   ejercicios: [ex('pikePushup',10,10), ex('sentadillasSumo',15,12), ex('dominadas',8,10), ex('lSit',20,5), ex('jumpingJacks',30,6)] },
        ],
        avanzado: [
          { dia: 'Lunes',     ejercicios: [ex('flexionesArcher',10,12), ex('pistolSquat',6,12), ex('dominadas',10,12), ex('plancha',60,6), ex('burpees',12,10)] },
          { dia: 'Miércoles', ejercicios: [ex('flexionesDiamond',14,12), ex('zancadas',15,12), ex('fondos',15,12), ex('mountainClimbers',35,8), ex('lSit',30,6)] },
          { dia: 'Viernes',   ejercicios: [ex('flexionesArcher',12,12), ex('pistolSquat',8,12), ex('dominadas',12,12), ex('planchaLateral',45,6), ex('jumpingJacks',40,7)] },
        ],
      },
    },
    ppl: {
      nombre: 'Push / Pull / Legs',
      icono: '🔱',
      desc: 'Divide el entrenamiento por grupos musculares. Más volumen por músculo, ideal para intermedios y avanzados.',
      diasSemana: ['Lunes', 'Martes', 'Jueves', 'Viernes'],
      sesiones: {
        principiante: [
          { dia: 'Lunes (Push)',  ejercicios: [ex('flexionesInclin',8,8),  ex('flexiones',8,8),   ex('pikePushup',6,8),  ex('fondos',8,8),  ex('jumpingJacks',15,5)] },
          { dia: 'Martes (Pull)', ejercicios: [ex('australianas',6,8),     ex('australianas',8,8), ex('hiperextensiones',10,6), ex('plancha',30,4), ex('mountainClimbers',15,5)] },
          { dia: 'Jueves (Legs)', ejercicios: [ex('sentadillas',12,10),    ex('zancadas',10,10),  ex('sentadillasSumo',12,10), ex('gluteBridge',12,8), ex('jumpingJacks',20,5)] },
          { dia: 'Viernes (Full)',ejercicios: [ex('burpees',6,8),          ex('flexiones',8,8),   ex('sentadillas',10,10), ex('plancha',30,4), ex('mountainClimbers',20,5)] },
        ],
        intermedio: [
          { dia: 'Lunes (Push)',  ejercicios: [ex('flexiones',12,10), ex('flexionesDiamond',10,10), ex('pikePushup',10,10), ex('fondos',12,10), ex('burpees',8,8)] },
          { dia: 'Martes (Pull)', ejercicios: [ex('dominadas',6,10),  ex('australianas',12,10),    ex('hiperextensiones',12,6), ex('plancha',45,5), ex('mountainClimbers',25,6)] },
          { dia: 'Jueves (Legs)', ejercicios: [ex('sentadillas',15,12), ex('zancadas',12,12),      ex('sentadillasSumo',15,12), ex('gluteBridge',15,8), ex('pistolSquat',5,10)] },
          { dia: 'Viernes (Full)',ejercicios: [ex('burpees',10,10),   ex('flexiones',12,10),       ex('dominadas',6,10), ex('plancha',45,5), ex('jumpingJacks',30,6)] },
        ],
        avanzado: [
          { dia: 'Lunes (Push)',  ejercicios: [ex('flexionesArcher',10,12), ex('flexionesDiamond',15,12), ex('pikePushup',12,12), ex('fondos',15,12), ex('burpees',15,10)] },
          { dia: 'Martes (Pull)', ejercicios: [ex('dominadas',12,12),       ex('australianas',15,12),     ex('hiperextensiones',15,8), ex('lSit',30,6), ex('mountainClimbers',35,8)] },
          { dia: 'Jueves (Legs)', ejercicios: [ex('pistolSquat',8,12),      ex('zancadas',15,12),         ex('sentadillasSumo',18,12), ex('gluteBridge',18,10), ex('jumpingJacks',40,7)] },
          { dia: 'Viernes (Full)',ejercicios: [ex('burpees',15,12),         ex('flexionesArcher',10,12),  ex('dominadas',12,12), ex('planchaLateral',45,6), ex('mountainClimbers',40,8)] },
        ],
      },
    },
    hiit: {
      nombre: 'HIIT Calistenia',
      icono: '🔥',
      desc: 'Circuitos de alta intensidad por intervalos. Máxima quema de calorías en poco tiempo. Ideal para perder grasa.',
      diasSemana: ['Lunes', 'Miércoles', 'Viernes', 'Sábado'],
      sesiones: {
        principiante: [
          { dia: 'Lunes',   ejercicios: [ex('jumpingJacks',20,5), ex('sentadillas',15,8), ex('flexionesInclin',8,6), ex('mountainClimbers',15,5), ex('plancha',20,3)] },
          { dia: 'Miércoles',ejercicios: [ex('burpees',5,6),      ex('zancadas',10,8),    ex('australianas',6,6),    ex('jumpingJacks',20,5),     ex('gluteBridge',12,5)] },
          { dia: 'Viernes', ejercicios: [ex('jumpingJacks',25,6), ex('sentadillas',12,8), ex('flexiones',6,6),       ex('mountainClimbers',20,5), ex('plancha',25,3)] },
          { dia: 'Sábado',  ejercicios: [ex('burpees',6,6),       ex('sentadillasSumo',15,8),ex('flexionesInclin',8,6),ex('jumpingJacks',25,5),   ex('hiperextensiones',10,5)] },
        ],
        intermedio: [
          { dia: 'Lunes',   ejercicios: [ex('burpees',10,8),  ex('sentadillas',20,10), ex('flexiones',12,8),  ex('mountainClimbers',25,6), ex('plancha',40,4)] },
          { dia: 'Miércoles',ejercicios: [ex('jumpingJacks',40,7),ex('dominadas',6,8), ex('zancadas',15,10),  ex('fondos',10,8),           ex('lSit',20,4)] },
          { dia: 'Viernes', ejercicios: [ex('burpees',12,10), ex('sentadillasSumo',20,10),ex('flexionesDiamond',10,8),ex('mountainClimbers',30,7),ex('plancha',45,5)] },
          { dia: 'Sábado',  ejercicios: [ex('jumpingJacks',50,8),ex('pistolSquat',5,8),ex('pikePushup',10,8), ex('dominadas',6,8),         ex('planchaLateral',30,4)] },
        ],
        avanzado: [
          { dia: 'Lunes',   ejercicios: [ex('burpees',15,10), ex('pistolSquat',8,12),  ex('flexionesArcher',10,10), ex('mountainClimbers',40,8), ex('lSit',30,5)] },
          { dia: 'Miércoles',ejercicios: [ex('jumpingJacks',60,9),ex('dominadas',12,12),ex('fondos',15,10),  ex('burpees',15,10),          ex('planchaLateral',45,5)] },
          { dia: 'Viernes', ejercicios: [ex('burpees',20,12), ex('pistolSquat',10,12), ex('flexionesDiamond',15,10),ex('mountainClimbers',50,9),ex('plancha',60,6)] },
          { dia: 'Sábado',  ejercicios: [ex('jumpingJacks',60,9),ex('flexionesArcher',12,10),ex('dominadas',12,12),ex('lSit',40,6),        ex('hiperextensiones',15,6)] },
        ],
      },
    },
  };

  return planes;
};

// ── PROGRESIÓN 4 SEMANAS ──────────────────────────────────
const semanaLabel = ['Semana 1 — Base', 'Semana 2 — Volumen', 'Semana 3 — Intensidad', 'Semana 4 — Deload'];
const semanaMul   = [1.0, 1.15, 1.3, 0.7];
const semanaDesc  = [
  'Aprendé la técnica correcta de cada ejercicio. Volumen bajo.',
  'Aumentamos el volumen. Más series y repeticiones.',
  'Máxima intensidad. Llevá cada serie cerca del límite.',
  'Semana de descarga. Reduce el volumen para recuperarte.',
];

export default function Calistenia({ appState }) {
  const { profile, exercises, addExercise, removeExercise } = appState;
  const peso = profile.weight || 70;
  const actLevel = profile.activityLevel || 1.55;
  const meta = profile.goal || 'maintain';

  const nivel = actLevel <= 1.375 ? 'principiante' : actLevel <= 1.55 ? 'intermedio' : 'avanzado';
  const nivelColor = { principiante: 'var(--accent-green)', intermedio: 'var(--accent-yellow)', avanzado: 'var(--accent-orange)' }[nivel];

  const [planActivo, setPlanActivo] = useState('fullbody');
  const [semana, setSemana] = useState(0);
  const [diaActivo, setDiaActivo] = useState(0);
  const [completados, setCompletados] = useState({});

  const planes = useMemo(() => generarPlan(nivel, peso, meta), [nivel, peso, meta]);
  const plan = planes[planActivo];
  const sesiones = plan.sesiones[nivel];
  const sesion = sesiones[diaActivo];

  const toggleCompletado = (idx) => {
    setCompletados(prev => ({ ...prev, [`${planActivo}-${semana}-${diaActivo}-${idx}`]: !prev[`${planActivo}-${semana}-${diaActivo}-${idx}`] }));
  };

  const calTotal = sesion.ejercicios.reduce((s, e) => s + Math.round(e.cal * semanaMul[semana]), 0);
  const completadosHoy = sesion.ejercicios.filter((_, i) => completados[`${planActivo}-${semana}-${diaActivo}-${i}`]).length;

  return (
    <div className="calistenia-page">

      {/* Header */}
      <div className="page-header animate-fade-up-1">
        <div>
          <p className="page-sub">Entrenamiento</p>
          <h2 className="page-title">Plan de Calistenia</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className="badge" style={{ background: `${nivelColor}18`, color: nivelColor, border: `1px solid ${nivelColor}33` }}>
            <i className="bi bi-bar-chart-fill"></i> {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
          </span>
          <span className="badge badge-blue">
            <i className="bi bi-fire"></i> ~{calTotal} kcal hoy
          </span>
        </div>
      </div>

      {/* Selector de plan */}
      <div className="animate-fade-up-2">
        <p className="section-label">Método de entrenamiento</p>
        <div className="plan-selector">
          {Object.entries(planes).map(([key, p]) => (
            <button key={key} className={`plan-btn ${planActivo === key ? 'active' : ''}`} onClick={() => { setPlanActivo(key); setDiaActivo(0); }}>
              <span className="plan-icono">{p.icono}</span>
              <span className="plan-nombre">{p.nombre}</span>
            </button>
          ))}
        </div>
        <p className="plan-desc">{plan.desc}</p>
      </div>

      {/* Selector de semana */}
      <div className="animate-fade-up-3">
        <p className="section-label">Semana del mes</p>
        <div className="semana-selector">
          {semanaLabel.map((s, i) => (
            <button key={i} className={`semana-btn ${semana === i ? 'active' : ''}`} onClick={() => setSemana(i)}>
              <span className="semana-num">S{i + 1}</span>
              <span className="semana-label">{s.split('—')[1]}</span>
              {i === 3 && <span className="semana-badge">💤</span>}
            </button>
          ))}
        </div>
        <p className="semana-desc"><i className="bi bi-info-circle"></i> {semanaDesc[semana]}</p>
      </div>

      {/* Selector de día */}
      <div className="animate-fade-up-3">
        <p className="section-label">Día de entrenamiento</p>
        <div className="dia-selector">
          {sesiones.map((s, i) => (
            <button key={i} className={`dia-btn ${diaActivo === i ? 'active' : ''}`} onClick={() => setDiaActivo(i)}>
              {s.dia}
            </button>
          ))}
          <span className="dia-descanso">🛌 Descanso los demás días</span>
        </div>
      </div>

      {/* Progreso del día */}
      {completadosHoy > 0 && (
        <div className="card progreso-card animate-fade-up-3">
          <div className="progreso-bar-wrap">
            <div className="progreso-bar-fill" style={{ width: `${(completadosHoy / sesion.ejercicios.length) * 100}%` }} />
          </div>
          <p className="progreso-txt">{completadosHoy} / {sesion.ejercicios.length} ejercicios completados</p>
        </div>
      )}

      {/* Ejercicios del día */}
      <div className="animate-fade-up-4">
        <div className="section-header">
          <h3 className="section-title">{sesion.dia} — {plan.nombre}</h3>
          <span className="badge badge-orange"><i className="bi bi-fire"></i> ~{calTotal} kcal</span>
        </div>
        <div className="ejercicios-list">
          {sesion.ejercicios.map((ej, idx) => {
            const key = `${planActivo}-${semana}-${diaActivo}-${idx}`;
            const done = !!completados[key];
            const repsAjustadas = Math.round(ej.reps * semanaMul[semana]);
            const calAjustadas = Math.round(ej.cal * semanaMul[semana]);
            return (
              <div key={idx} className={`ejercicio-card card ${done ? 'done' : ''}`} onClick={() => toggleCompletado(idx)}>
                <div className="ej-left">
                  <span className="ej-icono">{ej.icono}</span>
                  <div className="ej-info">
                    <p className="ej-nombre">{ej.nombre}</p>
                    <p className="ej-musculo"><i className="bi bi-crosshair"></i> {ej.musculo}</p>
                    <p className="ej-desc">{ej.desc}</p>
                  </div>
                </div>
                <div className="ej-right">
                  <div className="ej-stat">
                    <span className="ej-stat-val">{ej.series}</span>
                    <span className="ej-stat-label">series</span>
                  </div>
                  <div className="ej-stat">
                    <span className="ej-stat-val" style={{ color: 'var(--accent-green)' }}>
                      {ej.nombre === 'Plancha' || ej.nombre === 'Plancha Lateral' || ej.nombre === 'L-Sit'
                        ? `${repsAjustadas}s` : repsAjustadas}
                    </span>
                    <span className="ej-stat-label">{ej.nombre === 'Plancha' || ej.nombre === 'Plancha Lateral' || ej.nombre === 'L-Sit' ? 'seg' : 'reps'}</span>
                  </div>
                  <div className="ej-stat">
                    <span className="ej-stat-val" style={{ color: 'var(--accent-orange)' }}>{calAjustadas}</span>
                    <span className="ej-stat-label">kcal</span>
                  </div>
                  <div className="ej-descanso">
                    <i className="bi bi-hourglass-split"></i> {ej.descanso}
                  </div>
                  {done && <div className="ej-done-badge"><i className="bi bi-check-circle-fill"></i></div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resumen semanal */}
      <div className="card resumen-card animate-fade-up-4">
        <p className="card-label"><i className="bi bi-calendar-week"></i> Resumen semanal estimado</p>
        <div className="resumen-grid">
          <div className="resumen-item">
            <span className="resumen-val" style={{ color: 'var(--accent-green)' }}>{sesiones.length}</span>
            <span className="resumen-label">Días activos</span>
          </div>
          <div className="resumen-item">
            <span className="resumen-val" style={{ color: 'var(--accent-orange)' }}>
              {sesiones.reduce((s, ses) => s + ses.ejercicios.reduce((a, e) => a + Math.round(e.cal * semanaMul[semana]), 0), 0)}
            </span>
            <span className="resumen-label">kcal/semana</span>
          </div>
          <div className="resumen-item">
            <span className="resumen-val" style={{ color: 'var(--accent-blue)' }}>
              {sesiones.reduce((s, ses) => s + ses.ejercicios.length, 0)}
            </span>
            <span className="resumen-label">Ejercicios totales</span>
          </div>
          <div className="resumen-item">
            <span className="resumen-val" style={{ color: 'var(--accent-yellow)' }}>
              {sesiones.reduce((s, ses) => s + ses.ejercicios.reduce((a, e) => a + e.series, 0), 0)}
            </span>
            <span className="resumen-label">Series totales</span>
          </div>
        </div>
      </div>

    </div>
  );
}