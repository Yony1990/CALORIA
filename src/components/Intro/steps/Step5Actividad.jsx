const NIVELES = [
  { value: 1.2,   label: 'Sedentario',  desc: 'Poco o nada de ejercicio',  icon: '🪑' },
  { value: 1.375, label: 'Ligero',      desc: '1-3 días/semana',           icon: '🚶' },
  { value: 1.55,  label: 'Moderado',    desc: '3-5 días/semana',           icon: '🏃' },
  { value: 1.725, label: 'Activo',      desc: '6-7 días/semana',           icon: '💪' },
  { value: 1.9,   label: 'Muy activo',  desc: 'Atleta / trabajo físico',   icon: '🏆' },
];

export default function Step5Actividad({ onNext, onPrev, datos, updateDatos }) {
  return (
    <div className="intro-step step5">
      <div className="intro-step-header">
        <h2 className="intro-title">¿Qué tan activo sos?</h2>
        <p className="intro-sub">Esto ajusta tu gasto calórico total diario</p>
      </div>

      <div className="niveles-list">
        {NIVELES.map(n => (
          <button
            key={n.value}
            className={`nivel-card ${datos.activityLevel === n.value ? 'active' : ''}`}
            onClick={() => updateDatos({ activityLevel: n.value })}
          >
            <span className="nivel-icon">{n.icon}</span>
            <div className="nivel-info">
              <span className="nivel-label">{n.label}</span>
              <span className="nivel-desc">{n.desc}</span>
            </div>
            {datos.activityLevel === n.value && (
              <i className="bi bi-check-circle-fill nivel-check"></i>
            )}
          </button>
        ))}
      </div>

      <div className="intro-nav">
        <button className="intro-btn-ghost" onClick={onPrev}>
          <i className="bi bi-arrow-left"></i> Atrás
        </button>
        <button className="intro-btn-primary" onClick={onNext}>
          Siguiente <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}