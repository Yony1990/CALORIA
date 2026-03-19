import { useState } from 'react';

export default function Step4Perfil({ onNext, onPrev, datos, updateDatos }) {
  const [weightInput,  setWeightInput]  = useState(String(datos.weight));
  const [heightInput,  setHeightInput]  = useState(String(datos.height));
  const [ageInput,     setAgeInput]     = useState(String(datos.age));

  const canContinue = datos.name.trim().length > 0;

  return (
    <div className="intro-step step4">
      <div className="intro-step-header">
        <h2 className="intro-title">Contanos sobre vos</h2>
        <p className="intro-sub">Usamos estos datos para calcular tu meta calórica exacta</p>
      </div>

      <div className="intro-form">

        {/* Nombre */}
        <div className="intro-field">
          <label>¿Cómo te llamás?</label>
          <input
            type="text"
            placeholder="Tu nombre"
            value={datos.name}
            onChange={e => updateDatos({ name: e.target.value })}
            className="intro-input"
          />
        </div>

        {/* Sexo */}
        <div className="intro-field">
          <label>Sexo biológico</label>
          <div className="intro-sex-toggle">
            {['male', 'female'].map(s => (
              <button
                key={s}
                className={`intro-sex-btn ${datos.sex === s ? 'active' : ''}`}
                onClick={() => updateDatos({ sex: s })}
              >
                <i className={`bi bi-gender-${s === 'male' ? 'male' : 'female'}`}></i>
                {s === 'male' ? 'Masculino' : 'Femenino'}
              </button>
            ))}
          </div>
        </div>

        {/* Edad / Peso / Altura */}
        <div className="intro-row">
          <div className="intro-field">
            <label>Edad</label>
            <div className="intro-number-wrap">
              <input
                type="number"
                value={ageInput}
                className="intro-input"
                onChange={e => {
                  setAgeInput(e.target.value);
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 10 && val <= 100) updateDatos({ age: val });
                }}
                onBlur={() => {
                  const val = parseInt(ageInput);
                  const safe = isNaN(val) ? 25 : Math.min(100, Math.max(10, val));
                  setAgeInput(String(safe));
                  updateDatos({ age: safe });
                }}
              />
              <span className="intro-unit">años</span>
            </div>
          </div>

          <div className="intro-field">
            <label>Peso</label>
            <div className="intro-number-wrap">
              <input
                type="number"
                value={weightInput}
                className="intro-input"
                onChange={e => {
                  setWeightInput(e.target.value);
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val >= 20 && val <= 500) updateDatos({ weight: val });
                }}
                onBlur={() => {
                  const val = parseFloat(weightInput);
                  const safe = isNaN(val) ? 70 : Math.min(500, Math.max(20, val));
                  setWeightInput(String(safe));
                  updateDatos({ weight: safe });
                }}
              />
              <span className="intro-unit">kg</span>
            </div>
          </div>

          <div className="intro-field">
            <label>Altura</label>
            <div className="intro-number-wrap">
              <input
                type="number"
                value={heightInput}
                className="intro-input"
                onChange={e => {
                  setHeightInput(e.target.value);
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 100 && val <= 250) updateDatos({ height: val });
                }}
                onBlur={() => {
                  const val = parseInt(heightInput);
                  const safe = isNaN(val) ? 170 : Math.min(250, Math.max(100, val));
                  setHeightInput(String(safe));
                  updateDatos({ height: safe });
                }}
              />
              <span className="intro-unit">cm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="intro-nav">
        <button className="intro-btn-ghost" onClick={onPrev}>
          <i className="bi bi-arrow-left"></i> Atrás
        </button>
        <button
          className="intro-btn-primary"
          onClick={onNext}
          disabled={!canContinue}
          style={!canContinue ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
        >
          Siguiente <i className="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}