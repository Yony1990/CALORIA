const calcBMR = (datos) => {
  const { sex, weight, height, age } = datos;
  if (sex === 'male') return 10 * weight + 6.25 * height - 5 * age + 5;
  return 10 * weight + 6.25 * height - 5 * age - 161;
};

const GOAL_LABELS = { lose: 'Bajar de peso', maintain: 'Mantener peso', gain: 'Ganar masa' };
const GOAL_COLORS = { lose: 'var(--accent-green)', maintain: 'var(--accent-blue)', gain: 'var(--accent-orange)' };

export default function Step6Listo({ onComplete, onPrev, datos }) {
  const bmr  = Math.round(calcBMR(datos));
  const tdee = Math.round(bmr * datos.activityLevel);
  const meta = datos.goal === 'lose'
    ? Math.round(tdee - datos.targetWeightLoss * 1100)
    : datos.goal === 'gain'
    ? Math.round(tdee + 300)
    : tdee;

  return (
    <div className="intro-step step6">
      <div className="step6-emoji">🎉</div>
      <h2 className="intro-title">¡Todo listo, {datos.name}!</h2>
      <p className="intro-sub">Tu perfil fue configurado. Acá está tu resumen:</p>

      <div className="step6-resumen">
        <div className="step6-stat">
          <span className="step6-stat-label">Metabolismo basal</span>
          <span className="step6-stat-val" style={{ color: 'var(--accent-blue)' }}>{bmr} kcal</span>
        </div>
        <div className="step6-stat">
          <span className="step6-stat-label">Gasto total diario</span>
          <span className="step6-stat-val" style={{ color: 'var(--accent-yellow)' }}>{tdee} kcal</span>
        </div>
        <div className="step6-stat step6-stat-main">
          <span className="step6-stat-label">Tu meta calórica diaria</span>
          <span className="step6-stat-val-main" style={{ color: GOAL_COLORS[datos.goal] }}>{meta} kcal</span>
          <span className="step6-stat-goal" style={{ color: GOAL_COLORS[datos.goal] }}>
            {GOAL_LABELS[datos.goal]}
          </span>
        </div>
      </div>

      <div className="step6-tips">
        <p className="step6-tip"><i className="bi bi-check-circle-fill" style={{ color:'var(--accent-green)' }}></i> Podés ajustar estos datos en tu perfil cuando quieras</p>
        <p className="step6-tip"><i className="bi bi-check-circle-fill" style={{ color:'var(--accent-green)' }}></i> Tus datos se guardan localmente en tu dispositivo</p>
        <p className="step6-tip"><i className="bi bi-check-circle-fill" style={{ color:'var(--accent-green)' }}></i> Todo es personalizable según tu progreso</p>
      </div>

      <div className="intro-nav">
        <button className="intro-btn-ghost" onClick={onPrev}>
          <i className="bi bi-arrow-left"></i> Atrás
        </button>
        <button className="intro-btn-primary step6-btn" onClick={onComplete}>
          <i className="bi bi-rocket-takeoff"></i> Empezar CalorIA
        </button>
      </div>
    </div>
  );
}