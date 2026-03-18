import { useState, useEffect } from 'react';
import { foodDatabase, recetas } from '../../data/database';
import './Dashboard.css';

const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const MEAL_MAP = { desayuno: 'breakfast', almuerzo: 'lunch', cena: 'dinner', snack: 'snacks' };

function CircleProgress({ value, max, color, size = 120, strokeWidth = 8, children }) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(value / max, 1);
  const offset = circumference - percent * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} className="progress-ring">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        <circle
          cx={size/2} cy={size/2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="progress-ring-circle" strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
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
        <span className="macro-bar-label"><i className={`bi ${icon}`}></i> {label}</span>
        <span className="macro-bar-value" style={{ color }}>{value}g <span className="macro-bar-goal">/ {goal}g</span></span>
      </div>
      <div className="macro-bar-track">
        <div className="macro-bar-fill" style={{ width:`${pct}%`, background:color, boxShadow:`0 0 10px ${color}60` }} />
      </div>
    </div>
  );
}

function DonutChart({ value, max, color, size = 80, strokeWidth = 8, label, sublabel }) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const offset = circumference - pct * circumference;

  return (
    <div className="donut-wrap">
      <div style={{ position:'relative', width:size, height:size }}>
        <svg width={size} height={size} style={{ overflow:'visible' }}>
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
          <circle
            cx={size/2} cy={size/2} r={radius}
            fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ filter:`drop-shadow(0 0 5px ${color})`, transition:'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </svg>
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
          <span style={{ fontSize:'14px', fontWeight:'800', fontFamily:'var(--font-display)', color, lineHeight:1 }}>{label}</span>
          <span style={{ fontSize:'9px', color:'var(--text-muted)' }}>{sublabel}</span>
        </div>
      </div>
    </div>
  );
}

function MacroTip({ consumed, goals, profile }) {
  const tips = [];

  const proteinPct = goals.protein > 0 ? consumed.protein / goals.protein : 0;
  const carbsPct   = goals.carbs   > 0 ? consumed.carbs   / goals.carbs   : 0;
  const fatPct     = goals.fat     > 0 ? consumed.fat     / goals.fat     : 0;
  const fiberPct   = consumed.fiber / 28;

  if (consumed.protein === 0 && consumed.carbs === 0) {
    tips.push({ icon: '📝', color: 'var(--text-muted)', text: 'Registrá tus comidas para ver tips personalizados.' });
  } else {
    if (proteinPct < 0.5)  tips.push({ icon: '🥩', color: 'var(--accent-orange)', text: 'Te falta proteína — agregá pollo, atún o huevos.' });
    if (proteinPct >= 1)   tips.push({ icon: '💪', color: 'var(--accent-green)',  text: '¡Proteína al día! Ideal para mantener masa muscular.' });
    if (carbsPct > 1.2)    tips.push({ icon: '⚡', color: 'var(--accent-yellow)', text: 'Carbohidratos altos — preferí fuentes como avena o boniato.' });
    if (carbsPct < 0.4)    tips.push({ icon: '🔋', color: 'var(--accent-blue)',   text: 'Pocos carbos — necesitás energía para el día.' });
    if (fatPct > 1.2)      tips.push({ icon: '🫒', color: 'var(--accent-yellow)', text: 'Grasas elevadas — priorizá fuentes saludables como aguacate.' });
    if (fiberPct < 0.5)    tips.push({ icon: '🥦', color: 'var(--accent-green)',  text: 'Poca fibra — sumá brócoli, espinaca o legumbres.' });
    if (fiberPct >= 1)     tips.push({ icon: '✅', color: 'var(--accent-green)',  text: '¡Meta de fibra cumplida! Excelente para la digestión.' });
    if (profile.goal === 'lose' && proteinPct >= 0.9 && carbsPct <= 1)
                           tips.push({ icon: '🎯', color: 'var(--accent-green)',  text: 'Macros ideales para bajar de peso. ¡Seguí así!' });
  }

  return (
    <div className="macro-tips">
      <p className="macro-tips-label"><i className="bi bi-lightbulb"></i> Tips del día</p>
      {tips.slice(0, 3).map((t, i) => (
        <div key={i} className="macro-tip-item" style={{ borderLeftColor: t.color }}>
          <span className="macro-tip-icon">{t.icon}</span>
          <span className="macro-tip-text">{t.text}</span>
        </div>
      ))}
    </div>
  );
}

function CalorieStatus({ consumed, target, goal }) {
  if (consumed === 0) return null;
  const diff = consumed - target;
  const isOver = diff > 0;
  const pct = Math.round(Math.abs(diff) / target * 100);

  let status, color, icon, msg, bgColor;

  if (goal === 'lose') {
    if (!isOver) {
      status = '✅ Déficit calórico';
      color = 'var(--accent-green)';
      bgColor = 'rgba(0,229,160,0.08)';
      icon = 'bi-arrow-down-circle-fill';
      msg = `Estás ${Math.abs(diff)} kcal por debajo de tu meta. ¡Vas bien para bajar de peso!`;
    } else {
      status = '⚠️ Superaste tu meta';
      color = 'var(--accent-orange)';
      bgColor = 'rgba(255,139,71,0.08)';
      icon = 'bi-exclamation-triangle-fill';
      msg = `Estás ${diff} kcal por encima de tu meta. Intentá compensar mañana.`;
    }
  } else if (goal === 'gain') {
    if (isOver) {
      status = '✅ Superávit calórico';
      color = 'var(--accent-green)';
      bgColor = 'rgba(0,229,160,0.08)';
      icon = 'bi-arrow-up-circle-fill';
      msg = `Estás ${diff} kcal por encima de tu meta. ¡Bien para ganar masa!`;
    } else {
      status = '⚠️ Por debajo de tu meta';
      color = 'var(--accent-yellow)';
      bgColor = 'rgba(255,214,71,0.08)';
      icon = 'bi-exclamation-circle-fill';
      msg = `Te faltan ${Math.abs(diff)} kcal para tu meta de ganancia.`;
    }
  } else {
    if (Math.abs(diff) <= 100) {
      status = '✅ Balance equilibrado';
      color = 'var(--accent-green)';
      bgColor = 'rgba(0,229,160,0.08)';
      icon = 'bi-check-circle-fill';
      msg = 'Estás dentro del rango para mantener tu peso. ¡Perfecto!';
    } else if (isOver) {
      status = '⚠️ Superaste tu meta';
      color = 'var(--accent-orange)';
      bgColor = 'rgba(255,139,71,0.08)';
      icon = 'bi-exclamation-triangle-fill';
      msg = `Estás ${diff} kcal por encima. Tratá de mantenerte más cerca de la meta.`;
    } else {
      status = '⚠️ Por debajo de tu meta';
      color = 'var(--accent-yellow)';
      bgColor = 'rgba(255,214,71,0.08)';
      icon = 'bi-exclamation-circle-fill';
      msg = `Te faltan ${Math.abs(diff)} kcal para tu meta de mantenimiento.`;
    }
  }

  return (
    <div className="calorie-status" style={{ background: bgColor, border: `1px solid ${color}33` }}>
      <div className="calorie-status-header">
        <i className={`bi ${icon}`} style={{ color }}></i>
        <span className="calorie-status-title" style={{ color }}>{status}</span>
        <span className="calorie-status-pct" style={{ color }}>{pct}%</span>
      </div>
      <p className="calorie-status-msg">{msg}</p>
    </div>
  );
}

function MealSection({ title, icon, items, mealType, onAdd, onRemove }) {
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch]   = useState('');
  const [grams, setGrams]     = useState(100);
  const [selected, setSelected] = useState(null);

  const filtered = foodDatabase.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 6);

  const totalCal = items.reduce((s, i) => s + Math.round(i.cal * i.grams / 100), 0);

  return (
    <div className="meal-section card">
      <div className="meal-header">
        <span className="meal-title"><i className={`bi ${icon}`}></i> {title}</span>
        <span className="meal-cal">{totalCal} kcal</span>
        <button className="btn-add-meal" onClick={() => setShowAdd(!showAdd)}>
          <i className={`bi bi-${showAdd ? 'x' : 'plus'}`}></i>
        </button>
      </div>

      {showAdd && (
        <div className="meal-add-panel">
          <input placeholder="Buscar alimento..." value={search} onChange={e => setSearch(e.target.value)} />
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
                style={{ width:'80px' }} min="1" max="2000"
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
        {items.length === 0 && <p className="meal-empty">Sin alimentos registrados</p>}
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

  // ── Sincronización automática con Plan Semanal ─────────
  useEffect(() => {
    const diaHoy = DIAS_SEMANA[new Date().getDay()];
    const fechaHoy = new Date().toLocaleDateString('es-ES');
    
    // Si ya se cargó el plan hoy, no volver a cargar
    const yaSeCargoHoy = localStorage.getItem('caloria_plan_cargado');
    if (yaSeCargoHoy === fechaHoy) return;

    const planGuardado = localStorage.getItem('caloria_plan_semanal');
    if (!planGuardado) return;

    const plan = JSON.parse(planGuardado);
    const planHoy = plan[diaHoy];
    if (!planHoy) return;

    const diarioVacio =
      meals.breakfast.length === 0 &&
      meals.lunch.length     === 0 &&
      meals.dinner.length    === 0 &&
      meals.snacks.length    === 0;

    if (!diarioVacio) return;

    Object.entries(planHoy).forEach(([comida, item]) => {
      if (!item) return;
      if (item.esReceta) {
        const recetaCompleta = recetas.find(r => r.id === item.id);
        if (!recetaCompleta) return;
        recetaCompleta.ingredientes.forEach(ing => {
          const food = foodDatabase.find(f => f.id === ing.id);
          if (!food) return;
          addMealItem(MEAL_MAP[comida], {
            ...food,
            grams: ing.grams,
            name: `${food.name} (${recetaCompleta.nombre})`,
          });
        });
      } else {
        addMealItem(MEAL_MAP[comida], { ...item, grams: item.grams || 100 });
      }
    });

    // Marcar que ya se cargó hoy
    localStorage.setItem('caloria_plan_cargado', fechaHoy);
  }, []);

  const targetCal = calculateTargetCalories();
  const consumed  = getTotalConsumed();
  const burned    = getTotalBurned();
  const net       = consumed.cal - burned;
  const remaining = Math.max(targetCal - net, 0);
  const bmi       = calculateBMI();
  const bmiCat    = getBMICategory();

  const macroGoals = {
    protein: Math.round((targetCal * 0.30) / 4),
    carbs:   Math.round((targetCal * 0.40) / 4),
    fat:     Math.round((targetCal * 0.30) / 9),
  };

  const ringColor = (() => {
    if (profile.goal === 'lose')     return net > targetCal ? 'var(--accent-orange)' : 'var(--accent-green)';
    if (profile.goal === 'gain')     return net < targetCal ? 'var(--accent-yellow)' : 'var(--accent-green)';
    return Math.abs(net - targetCal) <= 100 ? 'var(--accent-green)' : 'var(--accent-orange)';
  })();

  const today = new Date().toLocaleDateString('es-ES', { weekday:'long', day:'numeric', month:'long' });

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dash-header animate-fade-up-1">
        <div>
          <p className="dash-date">{today}</p>
          <h1 className="dash-title">
            Hola, <span style={{ color:'var(--accent-green)' }}>{profile.name || 'Atleta'}</span> 👋
          </h1>
        </div>
        <div className="dash-header-badges">
          <span className="badge badge-green"><i className="bi bi-fire"></i> {targetCal} kcal meta</span>
          <span className="badge badge-orange"><i className="bi bi-trophy"></i> IMC {bmi}</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="dash-stats-row animate-fade-up-2">

        {/* Ring */}
        <div className="card dash-ring-card">
          <p className="card-label"><i className="bi bi-bullseye"></i> Balance Calórico</p>
          <div className="ring-wrapper">
            <CircleProgress value={net} max={targetCal} color={ringColor} size={160} strokeWidth={10}>
              <span className="ring-main" style={{ color: ringColor }}>{remaining}</span>
              <span className="ring-sub">kcal restantes</span>
            </CircleProgress>
          </div>
          <div className="ring-legend">
            <div className="ring-legend-item">
              <i className="bi bi-plus-circle" style={{ color:'var(--accent-orange)' }}></i>
              <span>{consumed.cal} consumidas</span>
            </div>
            <div className="ring-legend-item">
              <i className="bi bi-fire" style={{ color:'var(--accent-blue)' }}></i>
              <span>{burned} quemadas</span>
            </div>
            <div className="ring-legend-item">
              <i className="bi bi-arrow-right-circle" style={{ color:'var(--accent-green)' }}></i>
              <span>{targetCal} meta</span>
            </div>
          </div>
          <CalorieStatus consumed={net} target={targetCal} goal={profile.goal} />
        </div>

        {/* Macros */}
        <div className="card dash-macros-card">
          <p className="card-label"><i className="bi bi-pie-chart"></i> Macronutrientes</p>
          <div className="macros-list">
            <MacroBar label="Proteínas"     value={consumed.protein} goal={macroGoals.protein} color="var(--accent-orange)" icon="bi-egg" />
            <MacroBar label="Carbohidratos" value={consumed.carbs}   goal={macroGoals.carbs}   color="var(--accent-blue)"   icon="bi-lightning" />
            <MacroBar label="Grasas"        value={consumed.fat}     goal={macroGoals.fat}      color="var(--accent-yellow)" icon="bi-droplet" />
            <MacroBar label="Fibra"         value={consumed.fiber}   goal={28}                  color="var(--accent-green)"  icon="bi-tree" />
          </div>

          <div className="macros-bottom">
            <div className="macros-donuts">
              <p className="macros-donuts-label"><i className="bi bi-circle-half"></i> Distribución</p>
              <div className="donuts-row">
                <DonutChart value={consumed.protein} max={macroGoals.protein} color="var(--accent-orange)" size={80} strokeWidth={7}
                  label={`${macroGoals.protein > 0 ? Math.round(consumed.protein / macroGoals.protein * 100) : 0}%`} sublabel="Prot." />
                <DonutChart value={consumed.carbs}   max={macroGoals.carbs}   color="var(--accent-blue)"   size={80} strokeWidth={7}
                  label={`${macroGoals.carbs > 0 ? Math.round(consumed.carbs / macroGoals.carbs * 100) : 0}%`}     sublabel="Carbs" />
                <DonutChart value={consumed.fat}     max={macroGoals.fat}     color="var(--accent-yellow)" size={80} strokeWidth={7}
                  label={`${macroGoals.fat > 0 ? Math.round(consumed.fat / macroGoals.fat * 100) : 0}%`}           sublabel="Grasa" />
                <DonutChart value={consumed.fiber}   max={28}                 color="var(--accent-green)"  size={80} strokeWidth={7}
                  label={`${Math.round(consumed.fiber / 28 * 100)}%`} sublabel="Fibra" />
              </div>
            </div>
            <MacroTip consumed={consumed} goals={macroGoals} profile={profile} />
          </div>
        </div>

        {/* Water + BMI */}
        <div className="dash-side-col">
          <div className="card water-card">
            <p className="card-label"><i className="bi bi-droplet-fill"></i> Agua</p>
            <div className="water-display">
              <CircleProgress value={tracking.water} max={tracking.waterGoal} color="var(--accent-blue)" size={90} strokeWidth={7}>
                <span style={{ fontSize:'22px', fontWeight:'700', fontFamily:'var(--font-display)', color:'var(--accent-blue)' }}>{tracking.water}</span>
                <span style={{ fontSize:'10px', color:'var(--text-muted)' }}>/{tracking.waterGoal}</span>
              </CircleProgress>
              <div className="water-controls">
                <p className="water-ml">{tracking.water * 250} ml</p>
                <div className="water-btns">
                  <button className="water-btn" onClick={removeWater}><i className="bi bi-dash"></i></button>
                  <button className="water-btn water-btn-add" onClick={addWater}><i className="bi bi-plus"></i></button>
                </div>
                <p style={{ fontSize:'11px', color:'var(--text-muted)' }}>vasos de 250ml</p>
              </div>
            </div>
          </div>

          <div className="card bmi-card">
            <p className="card-label"><i className="bi bi-person-bounding-box"></i> IMC</p>
            <div className="bmi-display">
              <span className="bmi-value" style={{ color: bmiCat.color }}>{bmi}</span>
              <span className="bmi-label" style={{ color: bmiCat.color }}>{bmiCat.label}</span>
            </div>
            <div className="bmi-bar">
              {[
                { label:'Bajo',   range:[0, 18.5],  color:'var(--accent-blue)'   },
                { label:'Normal', range:[18.5, 25], color:'var(--accent-green)'  },
                { label:'Sobre',  range:[25, 30],   color:'var(--accent-yellow)' },
                { label:'Obs.',   range:[30, 40],   color:'var(--accent-orange)' },
              ].map(seg => (
                <div key={seg.label} className="bmi-seg"
                  style={{ background: seg.color, opacity: (parseFloat(bmi) >= seg.range[0] && parseFloat(bmi) < seg.range[1]) ? 1 : 0.2 }}
                  title={seg.label}
                />
              ))}
            </div>
            <p className="bmi-range-labels"><span>18.5</span><span>25</span><span>30</span></p>
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="dash-meals-grid animate-fade-up-3">
        {[
          { key:'breakfast', title:'Desayuno', icon:'bi-brightness-high' },
          { key:'lunch',     title:'Almuerzo', icon:'bi-sun'             },
          { key:'dinner',    title:'Cena',     icon:'bi-moon'            },
          { key:'snacks',    title:'Snacks',   icon:'bi-cup-straw'       },
        ].map(m => (
          <MealSection key={m.key} title={m.title} icon={m.icon} mealType={m.key}
            items={meals[m.key]} onAdd={addMealItem} onRemove={removeMealItem} />
        ))}
      </div>

    </div>
  );
}