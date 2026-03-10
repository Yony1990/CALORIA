import { activityLevels } from '../../data/database';
import { useRef, useState } from 'react';
import './Profile.css';

export default function Profile({ appState }) {
  const { profile, saveProfile, calculateBMR, calculateTDEE, calculateTargetCalories, calculateBMI, getBMICategory } = appState;
  const bmi    = calculateBMI();
  const bmiCat = getBMICategory();
  const bmr    = Math.round(calculateBMR());
  const tdee   = calculateTDEE();
  const target = Math.round(calculateTargetCalories());

  const fileRef = useRef(null);

  // ── Estado local para inputs numéricos ─────────────────
  const [weightInput,  setWeightInput]  = useState(String(profile.weight));
  const [heightInput,  setHeightInput]  = useState(String(profile.height));
  const [ageInput,     setAgeInput]     = useState(String(profile.age));

  // ── Avatar con BASE_URL para GitHub Pages ───────────────
  const avatarSrc = profile.avatar
    ? profile.avatar
    : `${import.meta.env.BASE_URL}avatars/${profile.sex === 'female' ? 'female' : 'male'}.avif`;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => saveProfile({ avatar: ev.target.result });
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-page">
      <div className="page-header animate-fade-up-1">
        <div>
          <p className="page-sub">Configuración</p>
          <h2 className="page-title">Mi Perfil</h2>
        </div>
        <div className="profile-avatar-wrap">
          <img src={avatarSrc} alt="avatar" className="profile-avatar-img" />
          <button className="profile-avatar-edit" onClick={() => fileRef.current.click()} title="Cambiar foto">
            <i className="bi bi-camera-fill"></i>
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
        </div>
      </div>

      <div className="profile-grid">
        {/* Form */}
        <div className="animate-fade-up-2">
          <div className="card profile-card">
            <p className="card-label"><i className="bi bi-person-badge"></i> Datos personales</p>
            <div className="profile-form">
              <div className="form-row">
                <div className="form-field">
                  <label>Nombre</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => saveProfile({ name: e.target.value })}
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="form-field">
                  <label>Edad</label>
                  <input
                    type="number" min="10" max="100"
                    value={ageInput}
                    onChange={e => {
                      setAgeInput(e.target.value);
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 10 && val <= 100) saveProfile({ age: val });
                    }}
                    onBlur={() => {
                      const val = parseInt(ageInput);
                      const safe = isNaN(val) ? 25 : Math.min(100, Math.max(10, val));
                      setAgeInput(String(safe));
                      saveProfile({ age: safe });
                    }}
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Sexo biológico</label>
                <div className="sex-toggle">
                  {['male', 'female'].map(s => (
                    <button
                      key={s}
                      className={`sex-btn ${profile.sex === s ? 'active' : ''}`}
                      onClick={() => saveProfile({ sex: s, avatar: null })}
                    >
                      <i className={`bi bi-gender-${s === 'male' ? 'male' : 'female'}`}></i>
                      {s === 'male' ? 'Masculino' : 'Femenino'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Peso actual (kg)</label>
                  <input
                    type="number" min="20" max="500" step="0.1"
                    value={weightInput}
                    onChange={e => {
                      setWeightInput(e.target.value);
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val) && val >= 20 && val <= 500) saveProfile({ weight: val });
                    }}
                    onBlur={() => {
                      const val = parseFloat(weightInput);
                      const safe = isNaN(val) ? 70 : Math.min(500, Math.max(20, val));
                      setWeightInput(String(safe));
                      saveProfile({ weight: safe });
                    }}
                  />
                </div>
                <div className="form-field">
                  <label>Altura (cm)</label>
                  <input
                    type="number" min="100" max="250"
                    value={heightInput}
                    onChange={e => {
                      setHeightInput(e.target.value);
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 100 && val <= 250) saveProfile({ height: val });
                    }}
                    onBlur={() => {
                      const val = parseInt(heightInput);
                      const safe = isNaN(val) ? 170 : Math.min(250, Math.max(100, val));
                      setHeightInput(String(safe));
                      saveProfile({ height: safe });
                    }}
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Objetivo</label>
                <div className="goal-selector">
                  {[
                    { value: 'lose',     label: 'Bajar de peso', icon: 'bi-arrow-down-circle', color: 'var(--accent-green)'  },
                    { value: 'maintain', label: 'Mantener',      icon: 'bi-dash-circle',       color: 'var(--accent-blue)'   },
                    { value: 'gain',     label: 'Ganar masa',    icon: 'bi-arrow-up-circle',   color: 'var(--accent-orange)' },
                  ].map(g => (
                    <button
                      key={g.value}
                      className={`goal-btn ${profile.goal === g.value ? 'active' : ''}`}
                      onClick={() => saveProfile({ goal: g.value })}
                      style={profile.goal === g.value ? { borderColor: g.color, background: `${g.color}18`, color: g.color } : {}}
                    >
                      <i className={`bi ${g.icon}`} style={{ color: profile.goal === g.value ? g.color : 'var(--text-muted)' }}></i>
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {profile.goal === 'lose' && (
                <div className="form-field">
                  <label>Ritmo de pérdida</label>
                  <div className="lose-rate-btns">
                    {[
                      { value: 0.25, label: 'Suave',    desc: '0.25 kg/sem' },
                      { value: 0.5,  label: 'Moderado', desc: '0.5 kg/sem'  },
                      { value: 0.75, label: 'Rápido',   desc: '0.75 kg/sem' },
                    ].map(r => (
                      <button
                        key={r.value}
                        className={`lose-rate-btn ${profile.targetWeightLoss === r.value ? 'active' : ''}`}
                        onClick={() => saveProfile({ targetWeightLoss: r.value })}
                      >
                        <span>{r.label}</span>
                        <span className="lose-rate-desc">{r.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity */}
          <div className="card activity-card animate-fade-up-3">
            <p className="card-label"><i className="bi bi-activity"></i> Nivel de actividad</p>
            <div className="activity-list">
              {activityLevels.map(a => (
                <button
                  key={a.value}
                  className={`activity-btn ${profile.activityLevel === a.value ? 'active' : ''}`}
                  onClick={() => saveProfile({ activityLevel: a.value })}
                >
                  <i className={`bi ${a.icon}`}></i>
                  <div className="activity-info">
                    <span className="activity-label">{a.label}</span>
                    <span className="activity-desc">{a.desc}</span>
                  </div>
                  <span className="activity-mult">×{a.value}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="profile-results animate-fade-up-2">
          <div className="card results-card">
            <p className="card-label"><i className="bi bi-calculator"></i> Tus métricas</p>
            <div className="results-list">
              <div className="result-item">
                <div className="result-icon" style={{ background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)' }}>
                  <i className="bi bi-fire" style={{ color: 'var(--accent-green)' }}></i>
                </div>
                <div>
                  <span className="result-label">TMB (Metabolismo basal)</span>
                  <span className="result-val" style={{ color: 'var(--accent-green)' }}>{bmr} kcal</span>
                  <span className="result-note">Calorías en reposo absoluto</span>
                </div>
              </div>
              <div className="result-item">
                <div className="result-icon" style={{ background: 'rgba(77,159,255,0.1)', border: '1px solid rgba(77,159,255,0.2)' }}>
                  <i className="bi bi-lightning" style={{ color: 'var(--accent-blue)' }}></i>
                </div>
                <div>
                  <span className="result-label">TDEE (Gasto total)</span>
                  <span className="result-val" style={{ color: 'var(--accent-blue)' }}>{tdee} kcal</span>
                  <span className="result-note">Con tu nivel de actividad</span>
                </div>
              </div>
              <div className="result-item highlight">
                <div className="result-icon" style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)' }}>
                  <i className="bi bi-bullseye" style={{ color: 'var(--accent-orange)' }}></i>
                </div>
                <div>
                  <span className="result-label">Meta diaria</span>
                  <span className="result-val result-val-main" style={{ color: 'var(--accent-orange)' }}>{target} kcal</span>
                  <span className="result-note">
                    {profile.goal === 'lose'     ? `Déficit de ${tdee - target} kcal/día`    :
                     profile.goal === 'gain'     ? `Superávit de ${target - tdee} kcal/día`  :
                     'Mantenimiento de peso'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card bmi-detail-card">
            <p className="card-label"><i className="bi bi-person-bounding-box"></i> IMC Detallado</p>
            <div className="bmi-detail-display">
              <span className="bmi-big" style={{ color: bmiCat.color }}>{bmi}</span>
              <div>
                <span className="bmi-cat-label" style={{ color: bmiCat.color }}>{bmiCat.label}</span>
                <span className="bmi-height-weight">{profile.height}cm · {profile.weight}kg</span>
              </div>
            </div>
            <div className="bmi-scale">
              {[
                { min: 0,    max: 18.5, label: 'Bajo peso', color: 'var(--accent-blue)'   },
                { min: 18.5, max: 25,   label: 'Normal',    color: 'var(--accent-green)'  },
                { min: 25,   max: 30,   label: 'Sobrepeso', color: 'var(--accent-yellow)' },
                { min: 30,   max: 40,   label: 'Obesidad',  color: 'var(--accent-orange)' },
              ].map(seg => (
                <div key={seg.label} className="bmi-scale-item">
                  <div className="bmi-scale-bar" style={{
                    background: seg.color,
                    opacity: parseFloat(bmi) >= seg.min && parseFloat(bmi) < seg.max ? 1 : 0.2,
                    boxShadow: parseFloat(bmi) >= seg.min && parseFloat(bmi) < seg.max ? `0 0 10px ${seg.color}` : 'none',
                  }} />
                  <span className="bmi-scale-label">{seg.label}</span>
                  <span className="bmi-scale-range">{seg.min}–{seg.max === 40 ? '40+' : seg.max}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}