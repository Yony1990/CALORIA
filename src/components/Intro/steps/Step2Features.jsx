const FEATURES = [
  { icon: '🍽️', title: 'Diario de comidas',    desc: 'Registrá todo lo que comés y tracked tus calorías y macros en tiempo real.' },
  { icon: '💪', title: 'Calistenia',            desc: 'Rutinas de entrenamiento con progresión semanal y cálculo de calorías quemadas.' },
  { icon: '📅', title: 'Plan Semanal',          desc: 'Planificá tus comidas de toda la semana con recetas saludables.' },
  { icon: '🧘', title: 'Bienestar integral',    desc: 'Seguimiento de sueño, estrés, pasos y hábitos que afectan tu metabolismo.' },
];

export default function Step2Features({ onNext, onPrev }) {
  return (
    <div className="intro-step step2">
      <div className="intro-step-header">
        <h2 className="intro-title">Todo lo que necesitás</h2>
        <p className="intro-sub">Una sola app para tu salud completa</p>
      </div>

      <div className="features-list">
        {FEATURES.map((f, i) => (
          <div key={i} className="feature-item" style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="feature-icon">{f.icon}</span>
            <div className="feature-info">
              <span className="feature-title">{f.title}</span>
              <span className="feature-desc">{f.desc}</span>
            </div>
          </div>
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