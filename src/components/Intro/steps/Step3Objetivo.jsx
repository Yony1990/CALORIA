const OBJETIVOS = [
  { value: 'lose',     icon: '📉', title: 'Bajar de peso',  desc: 'Reducir grasa corporal con déficit calórico controlado.', color: 'var(--accent-green)'  },
  { value: 'maintain', icon: '⚖️', title: 'Mantener peso',  desc: 'Equilibrar calorías para mantener tu peso actual.',       color: 'var(--accent-blue)'   },
  { value: 'gain',     icon: '📈', title: 'Ganar masa',     desc: 'Aumentar masa muscular con superávit calórico.',          color: 'var(--accent-orange)' },
];

export default function Step3Objetivo({ onNext, onPrev, datos, updateDatos }) {
  return (
    <div className="intro-step step3">
      <div className="intro-step-header">
        <h2 className="intro-title">¿Cuál es tu objetivo?</h2>
        <p className="intro-sub">Esto define tu meta calórica diaria</p>
      </div>

      <div className="objetivos-list">
        {OBJETIVOS.map(o => (
          <button
            key={o.value}
            className={`objetivo-card ${datos.goal === o.value ? 'active' : ''}`}
            style={datos.goal === o.value ? { borderColor: o.color, background: `${o.color}12` } : {}}
            onClick={() => updateDatos({ goal: o.value })}
          >
            <span className="objetivo-icon">{o.icon}</span>
            <div className="objetivo-info">
              <span className="objetivo-title" style={{ color: datos.goal === o.value ? o.color : 'var(--text-primary)' }}>
                {o.title}
              </span>
              <span className="objetivo-desc">{o.desc}</span>
            </div>
            {datos.goal === o.value && (
              <i className="bi bi-check-circle-fill" style={{ color: o.color, fontSize: 20, flexShrink: 0 }}></i>
            )}
          </button>
        ))}
      </div>

      {datos.goal === 'lose' && (
        <div className="ritmo-selector">
          <p className="ritmo-label">¿A qué ritmo querés bajar?</p>
          <div className="ritmo-btns">
            {[
              { value: 0.25, label: 'Suave',    desc: '0.25 kg/sem' },
              { value: 0.5,  label: 'Moderado', desc: '0.5 kg/sem'  },
              { value: 0.75, label: 'Rápido',   desc: '0.75 kg/sem' },
            ].map(r => (
              <button
                key={r.value}
                className={`ritmo-btn ${datos.targetWeightLoss === r.value ? 'active' : ''}`}
                onClick={() => updateDatos({ targetWeightLoss: r.value })}
              >
                <span>{r.label}</span>
                <span className="ritmo-desc">{r.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

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