import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import './Tracking.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: <strong>{p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Tracking({ appState }) {
  const { tracking, saveTracking, weightHistory, logWeight, profile } = appState;
  const [newWeight, setNewWeight] = useState('');
  const [activeTab, setActiveTab] = useState('weight');

  const chartData = weightHistory.slice(-30).map(entry => ({
    date: new Date(entry.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
    peso: entry.weight,
  }));

  const handleLogWeight = () => {
    const w = parseFloat(newWeight);
    if (w > 20 && w < 500) {
      logWeight(w);
      setNewWeight('');
    }
  };

  const weightDiff = weightHistory.length > 1
    ? (weightHistory[weightHistory.length - 1].weight - weightHistory[0].weight).toFixed(1)
    : 0;

  const bodyFatCategory = () => {
    if (!tracking.bodyFat) return null;
    const bf = tracking.bodyFat;
    if (profile.sex === 'male') {
      if (bf < 6) return { label: 'Esencial', color: 'var(--accent-blue)' };
      if (bf < 14) return { label: 'Atlético', color: 'var(--accent-green)' };
      if (bf < 18) return { label: 'Fitness', color: 'var(--accent-yellow)' };
      if (bf < 25) return { label: 'Promedio', color: 'var(--accent-orange)' };
      return { label: 'Obeso', color: '#ff4444' };
    } else {
      if (bf < 14) return { label: 'Esencial', color: 'var(--accent-blue)' };
      if (bf < 21) return { label: 'Atlético', color: 'var(--accent-green)' };
      if (bf < 25) return { label: 'Fitness', color: 'var(--accent-yellow)' };
      if (bf < 32) return { label: 'Promedio', color: 'var(--accent-orange)' };
      return { label: 'Obeso', color: '#ff4444' };
    }
  };

  const bfCat = bodyFatCategory();

  return (
    <div className="tracking-page">
      <div className="page-header animate-fade-up-1">
        <div>
          <p className="page-sub">Progreso</p>
          <h2 className="page-title">Seguimiento</h2>
        </div>
      </div>

      {/* Summary cards */}
      <div className="tracking-summary animate-fade-up-2">
        <div className="card track-stat">
          <i className="bi bi-person-fill" style={{ color: 'var(--accent-green)', fontSize: '22px' }}></i>
          <div>
            <span className="track-stat-val">{tracking.currentWeight} kg</span>
            <span className="track-stat-lbl">Peso actual</span>
          </div>
        </div>
        <div className="card track-stat">
          <i className="bi bi-arrow-down-circle-fill" style={{ color: parseFloat(weightDiff) < 0 ? 'var(--accent-green)' : 'var(--accent-orange)', fontSize: '22px' }}></i>
          <div>
            <span className="track-stat-val" style={{ color: parseFloat(weightDiff) < 0 ? 'var(--accent-green)' : 'var(--accent-orange)' }}>
              {weightDiff > 0 ? '+' : ''}{weightDiff} kg
            </span>
            <span className="track-stat-lbl">Cambio total</span>
          </div>
        </div>
        <div className="card track-stat">
          <i className="bi bi-calendar-check" style={{ color: 'var(--accent-blue)', fontSize: '22px' }}></i>
          <div>
            <span className="track-stat-val">{weightHistory.length}</span>
            <span className="track-stat-lbl">Registros</span>
          </div>
        </div>
        {tracking.bodyFat && (
          <div className="card track-stat">
            <i className="bi bi-percent" style={{ color: bfCat?.color || 'var(--accent-yellow)', fontSize: '22px' }}></i>
            <div>
              <span className="track-stat-val" style={{ color: bfCat?.color }}>{tracking.bodyFat}%</span>
              <span className="track-stat-lbl">Grasa corporal · {bfCat?.label}</span>
            </div>
          </div>
        )}
      </div>

      <div className="tracking-grid">
        {/* Weight log + chart */}
        <div className="tracking-main">
          <div className="card chart-card animate-fade-up-3">
            <p className="card-label"><i className="bi bi-graph-up"></i> Evolución del peso</p>
            {chartData.length > 1 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone" dataKey="peso" name="Peso (kg)"
                    stroke="var(--accent-green)" fill="url(#weightGrad)"
                    strokeWidth={2} dot={{ fill: 'var(--accent-green)', r: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="chart-empty">
                <i className="bi bi-graph-up" style={{ fontSize: '40px', color: 'var(--text-muted)' }}></i>
                <p>Registra tu peso para ver la gráfica</p>
              </div>
            )}
          </div>

          {/* Log weight */}
          <div className="card weight-logger animate-fade-up-4">
            <p className="card-label"><i className="bi bi-plus-circle"></i> Registrar peso</p>
            <div className="weight-input-row">
              <input
                type="number"
                placeholder="Ej: 72.5"
                value={newWeight}
                onChange={e => setNewWeight(e.target.value)}
                min="20" max="500" step="0.1"
                style={{ maxWidth: '160px' }}
              />
              <span className="weight-unit">kg</span>
              <button className="btn btn-primary" onClick={handleLogWeight}>
                <i className="bi bi-check-lg"></i> Guardar
              </button>
            </div>
            {weightHistory.length > 0 && (
              <div className="weight-history-list">
                {weightHistory.slice(-5).reverse().map((entry, i) => (
                  <div key={i} className="weight-history-item">
                    <span className="wh-date">{new Date(entry.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    <span className="wh-val">{entry.weight} kg</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Body measurements  */}
        <div className="tracking-side animate-fade-up-3">
          <div className="card measures-card">
            <p className="card-label"><i className="bi bi-rulers"></i> Medidas corporales</p>
            <div className="measures-grid">
              {[
                { key: 'waist', label: 'Cintura', icon: 'bi-circle', color: 'var(--accent-orange)' },
                { key: 'hip', label: 'Cadera', icon: 'bi-circle-fill', color: 'var(--accent-purple)' },
                { key: 'chest', label: 'Pecho', icon: 'bi-heart', color: 'var(--accent-blue)' },
                { key: 'arms', label: 'Brazos', icon: 'bi-lightning', color: 'var(--accent-yellow)' },
                { key: 'bodyFat', label: 'Grasa %', icon: 'bi-percent', color: 'var(--accent-green)' },
              ].map(m => (
                <div key={m.key} className="measure-field">
                  <label>
                    <i className={`bi ${m.icon}`} style={{ color: m.color }}></i> {m.label}
                  </label>
                  <div className="measure-input-wrap">
                    <input
                      type="number"
                      value={tracking[m.key] || ''}
                      onChange={e => saveTracking({ [m.key]: parseFloat(e.target.value) || null })}
                      placeholder="—"
                      min="1" max="300" step="0.1"
                    />
                    <span className="measure-unit">{m.key === 'bodyFat' ? '%' : 'cm'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Water goal settings */}
          <div className="card water-goal-card">
            <p className="card-label"><i className="bi bi-droplet"></i> Meta de agua</p>
            <div className="water-goal-display">
              <span className="water-goal-num">{tracking.waterGoal}</span>
              <span className="water-goal-unit">vasos / día</span>
            </div>
            <div className="water-goal-slider">
              <input
                type="range" min="4" max="16" step="1"
                value={tracking.waterGoal}
                onChange={e => saveTracking({ waterGoal: parseInt(e.target.value) })}
              />
              <div className="water-slider-labels">
                <span>4</span><span>8</span><span>12</span><span>16</span>
              </div>
            </div>
            <p className="water-goal-ml">{tracking.waterGoal * 250} ml · {(tracking.waterGoal * 0.25).toFixed(1)} L</p>
          </div>
        </div>
      </div>
    </div>
  );
}
