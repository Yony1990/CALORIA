import logo from '../../../assets/img/logo.png';

export default function Step1Bienvenida({ onNext }) {
  return (
    <div className="intro-step step1">
      <div className="step1-logo-wrap">
        <img src={logo} alt="CalorIA" className="step1-logo" />
        <div className="step1-logo-glow" />
      </div>
      <h1 className="step1-title">Cal<span>or</span>IA</h1>
      <p className="step1-sub">Tu asistente inteligente de nutrición y bienestar</p>
      <div className="step1-badges">
        <span className="step1-badge">🥗 Nutrición</span>
        <span className="step1-badge">💪 Calistenia</span>
        <span className="step1-badge">🧘 Bienestar</span>
      </div>
      <button className="intro-btn-primary" onClick={onNext}>
        Comenzar <i className="bi bi-arrow-right"></i>
      </button>
      <p className="step1-footer">Gratis · Sin publicidad · Tus datos son tuyos</p>
    </div>
  );
}