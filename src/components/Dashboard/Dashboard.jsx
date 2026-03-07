import { useState } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { foodDatabase } from '../../data/database';
import './Dashboard.css';

function CircleProgress({ value, max, color, size = 120, strokeWidth = 8, children }) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(value / max, 1);
  const offset = circumference - percent * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} className="progress-ring">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="progress-ring-circle"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        {children}
      </div>
    </div>
  );
}

function MacroBar({ label, value, goal, color, icon }) {
  const pct = Math.min((value / goal) * 100, 100);
  return (
    <div className="macro-bar">
      <div className="macro-bar-header">
        <span className="macro-bar-label">
          <i className={`bi ${icon}`}></i> {label}
        </span>
        <span className="macro-bar-value" style={{ color }}>
          {value}g <span className="macro-bar-goal">/ {goal}g</span>
        </span>
      </div>
      <div className="macro-bar-track">
        <div className="macro-bar-fill" style={{ width: `${pct}%`, background: color, boxShadow: `0 0 10px ${color}60` }} />
      </div>
    </div>
  );
}

function MealSection({ title, icon, items, mealType, onAdd, onRemove }) {
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [grams, setGrams] = useState(100);
  const [selected, setSelected] = useState(null);

  const filtered = foodDatabase.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 6);

  const totalCal = items.reduce((s, i) => s + Math.round(i.cal * i.grams / 100), 0);

  return (
    <div className="meal-section card">
      <div className="meal-header">
        <span className="meal-title">
          <i className={`bi ${icon}`}></i> {title}
        </span>
        <span className="meal-cal">{totalCal} kcal</span>
        <button className="btn-add-meal" onClick={() => setShowAdd(!showAdd)}>
          <i className={`bi bi-${showAdd ? 'x' : 'plus'}`}></i>
        </button>
      </div>

      {showAdd && (
        <div className="meal-add-panel">
          <input
            placeholder="Buscar alimento..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <div className="meal-search-results">
              {filtered.map(f => (
                <button
                  key={f.id}
                  className={`meal-search-item ${selected?.id === f.id ? 'selected' : ''}`}
                  onClick={() => setSelected(f)}
                >
                  <span>{f.icon} {f.name}</span>
                  <span className="meal-search-cal">{f.cal} kcal/100g</span>
                </button>
              ))}
            </div>
          )}
          {selected && (
            <div className="meal-grams-row">
              <label>Gramos</label>
              <input
                type="number" value={grams}
                onChange={e => setGrams(Number(e.target.value))}
                style={{ width: '80px' }}
                min="1" max="2000"
              />
              <button className="btn btn-primary" onClick={() => {
                onAdd(mealType, { ...selected, grams });
                setSelected(null); setSearch(''); setShowAdd(false);
              }}>
                <i className="bi bi-plus-lg"></i> Agregar
              </button>
            </div>
          )}
        </div>
      )}

      <div className="meal-items">
        {items.map(item => (
          <div key={item.id} className="meal-item">
            <span className="meal-item-icon">{item.icon}</span>
            <span className="meal-item-name">{item.name}</span>
            <span className="meal-item-grams">{item.grams}g</span>
            <span className="meal-item-cal">{Math.round(item.cal * item.grams / 100)} kcal</span>
            <button className="meal-item-del" onClick={() => onRemove(mealType, item.id)}>
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="meal-empty">Sin alimentos registrados</p>
        )}
      </div>
    </div>
  );
}

export default function Dashboard({ appState }) {
  const {
    profile, meals, exercises,
    calculateTargetCalories, calculateBMI, getBMICategory,
    getTotalConsumed, getTotalBurned,
    addMealItem, removeMealItem,
    tracking, addWater, removeWater,
  } = appState;

  const targetCal = calculateTargetCalories();
  const consumed = getTotalConsumed();
  const burned = getTotalBurned();
  const net = consumed.cal - burned;
  const remaining = Math.max(targetCal - net, 0);

  const bmi = calculateBMI();
  const bmiCat = getBMICategory();

  // Macro goals (simplified)
  const macroGoals = {
    protein: Math.round((targetCal * 0.30) / 4),
    carbs: Math.round((targetCal * 0.40) / 4),
    fat: Math.round((targetCal * 0.30) / 9),
  };

  const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dash-header animate-fade-up-1">
        <div>
          <p className="dash-date">{today}</p>
          <h1 className="dash-title">
            Hola, <span style={{ color: 'var(--accent-green)' }}>{profile.name || 'Atleta'}</span> 👋
          </h1>
        </div>
        <div className="dash-header-badges">
          <span className="badge badge-green"><i className="bi bi-fire"></i> {targetCal} kcal meta</span>
          <span className="badge badge-orange"><i className="bi bi-trophy"></i> IMC {bmi}</span>
        </div>
      </div>

      {/* Main stats row */}
      <div className="dash-stats-row animate-fade-up-2">
        {/* Calorie ring */}
        <div className="card dash-ring-card">
          <p className="card-label"><i className="bi bi-bullseye"></i> Balance Calórico</p>
          <div className="ring-wrapper">
            <CircleProgress value={net} max={targetCal} color="var(--accent-green)" size={160} strokeWidth={10}>
              <span className="ring-main">{remaining}</span>
              <span className="ring-sub">kcal restantes</span>
            </CircleProgress>
          </div>
          <div className="ring-legend">
            <div className="ring-legend-item">
              <i className="bi bi-plus-circle" style={{ color: 'var(--accent-orange)' }}></i>
              <span>{consumed.cal} consumidas</span>
            </div>
            <div className="ring-legend-item">
              <i className="bi bi-fire" style={{ color: 'var(--accent-blue)' }}></i>
              <span>{burned} quemadas</span>
            </div>
            <div className="ring-legend-item">
              <i className="bi bi-arrow-right-circle" style={{ color: 'var(--accent-green)' }}></i>
              <span>{targetCal} meta</span>
            </div>
          </div>
        </div>

        {/* Macros */}
        <div className="card dash-macros-card">
          <p className="card-label"><i className="bi bi-pie-chart"></i> Macronutrientes</p>
          <div className="macros-list">
            <MacroBar label="Proteínas" value={consumed.protein} goal={macroGoals.protein} color="var(--accent-orange)" icon="bi-egg" />
            <MacroBar label="Carbohidratos" value={consumed.carbs} goal={macroGoals.carbs} color="var(--accent-blue)" icon="bi-lightning" />
            <MacroBar label="Grasas" value={consumed.fat} goal={macroGoals.fat} color="var(--accent-yellow)" icon="bi-droplet" />
            <MacroBar label="Fibra" value={consumed.fiber} goal={28} color="var(--accent-green)" icon="bi-tree" />
          </div>
        </div>

        {/* Water + BMI */}
        <div className="dash-side-col">
          {/* Water */}
          <div className="card water-card">
            <p className="card-label"><i className="bi bi-droplet-fill"></i> Agua</p>
            <div className="water-display">
              <CircleProgress value={tracking.water} max={tracking.waterGoal} color="var(--accent-blue)" size={90} strokeWidth={7}>
                <span style={{ fontSize: '22px', fontWeight: '700', fontFamily: 'var(--font-display)', color: 'var(--accent-blue)' }}>
                  {tracking.water}
                </span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>/{tracking.waterGoal}</span>
              </CircleProgress>
              <div className="water-controls">
                <p className="water-ml">{tracking.water * 250} ml</p>
                <div className="water-btns">
                  <button className="water-btn" onClick={removeWater}><i className="bi bi-dash"></i></button>
                  <button className="water-btn water-btn-add" onClick={addWater}><i className="bi bi-plus"></i></button>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>vasos de 250ml</p>
              </div>
            </div>
          </div>

          {/* BMI */}
          <div className="card bmi-card">
            <p className="card-label"><i className="bi bi-person-bounding-box"></i> IMC</p>
            <div className="bmi-display">
              <span className="bmi-value" style={{ color: bmiCat.color }}>{bmi}</span>
              <span className="bmi-label" style={{ color: bmiCat.color }}>{bmiCat.label}</span>
            </div>
            <div className="bmi-bar">
              {[
                { label: 'Bajo', range: [0, 18.5], color: 'var(--accent-blue)' },
                { label: 'Normal', range: [18.5, 25], color: 'var(--accent-green)' },
                { label: 'Sobre', range: [25, 30], color: 'var(--accent-yellow)' },
                { label: 'Obs.', range: [30, 40], color: 'var(--accent-orange)' },
              ].map(seg => (
                <div
                  key={seg.label}
                  className="bmi-seg"
                  style={{
                    background: seg.color,
                    opacity: (parseFloat(bmi) >= seg.range[0] && parseFloat(bmi) < seg.range[1]) ? 1 : 0.2
                  }}
                  title={seg.label}
                />
              ))}
            </div>
            <p className="bmi-range-labels">
              <span>18.5</span><span>25</span><span>30</span>
            </p>
          </div>
        </div>
      </div>

      {/* Meals section */}
      <div className="dash-meals-grid animate-fade-up-3">
        {[
          { key: 'breakfast', title: 'Desayuno', icon: 'bi-brightness-high' },
          { key: 'lunch', title: 'Almuerzo', icon: 'bi-sun' },
          { key: 'dinner', title: 'Cena', icon: 'bi-moon' },
          { key: 'snacks', title: 'Snacks', icon: 'bi-cup-straw' },
        ].map(m => (
          <MealSection
            key={m.key}
            title={m.title}
            icon={m.icon}
            mealType={m.key}
            items={meals[m.key]}
            onAdd={addMealItem}
            onRemove={removeMealItem}
          />
        ))}
      </div>
    </div>
  );
}
