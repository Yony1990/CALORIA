import { useState } from 'react';
import './Metas.css';

const LOGROS = [
  // ── ALIMENTACIÓN ───────────────────────────────────────
  { id: 'primer_dia',       icon: '🌱', titulo: 'Primer paso',         desc: 'Registrá tu primer alimento',                 condition: (s) => s.totalComidas >= 1      },
  { id: 'diez_comidas',     icon: '🍽️', titulo: 'Buen apetito',         desc: 'Registrá 10 alimentos en total',              condition: (s) => s.totalComidas >= 10     },
  { id: 'cincuenta_comidas',icon: '🍱', titulo: 'Foodie dedicado',      desc: 'Registrá 50 alimentos en total',              condition: (s) => s.totalComidas >= 50     },
  { id: 'cien_comidas',     icon: '🏅', titulo: 'Chef de élite',        desc: 'Registrá 100 alimentos en total',             condition: (s) => s.totalComidas >= 100    },
  { id: 'calorias_meta',    icon: '🎯', titulo: 'En la meta',           desc: 'Cumplí tu meta calórica exacta un día',       condition: (s) => s.diasEnMeta >= 1        },
  { id: 'calorias_meta_7',  icon: '🎯', titulo: 'Semana perfecta',      desc: 'Cumplí tu meta calórica 7 días seguidos',     condition: (s) => s.diasEnMeta >= 7        },
  { id: 'sin_exceso',       icon: '🌟', titulo: 'Disciplina total',     desc: 'No superaste tu meta calórica en 7 días',     condition: (s) => s.diasSinExceso >= 7     },
  { id: 'sin_exceso_30',    icon: '💫', titulo: 'Mes de acero',         desc: 'No superaste tu meta calórica en 30 días',    condition: (s) => s.diasSinExceso >= 30    },
  { id: 'proteina',         icon: '🥩', titulo: 'Rey de proteínas',     desc: 'Cumplí tu meta de proteína 5 días',           condition: (s) => s.diasProteinaMeta >= 5  },
  { id: 'proteina_30',      icon: '💪', titulo: 'Máquina de músculo',   desc: 'Cumplí tu meta de proteína 30 días',          condition: (s) => s.diasProteinaMeta >= 30 },
  { id: 'fibra',            icon: '🥦', titulo: 'Amigo de la fibra',    desc: 'Cumplí tu meta de fibra 7 días seguidos',     condition: (s) => s.diasFibraMeta >= 7     },
  { id: 'desayuno_7',       icon: '🌅', titulo: 'Buenos días',          desc: 'Registrá desayuno 7 días seguidos',           condition: (s) => s.diasDesayuno >= 7      },

  // ── HIDRATACIÓN ────────────────────────────────────────
  { id: 'agua_perfecta',    icon: '💧', titulo: 'Hidratación perfecta', desc: 'Cumplí tu meta de agua un día completo',      condition: (s) => s.aguaPerfecta >= 1      },
  { id: 'agua_7',           icon: '🌊', titulo: 'Océano interior',      desc: 'Cumplí tu meta de agua 7 días seguidos',      condition: (s) => s.aguaPerfecta >= 7      },
  { id: 'agua_30',          icon: '🐋', titulo: 'Ballena azul',         desc: 'Cumplí tu meta de agua 30 días seguidos',     condition: (s) => s.aguaPerfecta >= 30     },

  // ── EJERCICIO ──────────────────────────────────────────
  { id: 'primer_ejercicio', icon: '🏃', titulo: 'En movimiento',        desc: 'Registrá tu primer ejercicio',                condition: (s) => s.totalEjercicios >= 1   },
  { id: 'ejercicio_7',      icon: '🔥', titulo: 'Semana activa',        desc: 'Registrá ejercicio 7 días seguidos',          condition: (s) => s.rachaEjercicio >= 7    },
  { id: 'ejercicio_30',     icon: '⚡', titulo: 'Atleta del mes',       desc: 'Registrá ejercicio 30 días seguidos',         condition: (s) => s.rachaEjercicio >= 30   },
  { id: 'kcal_quemadas',    icon: '🌡️', titulo: 'Calor máximo',         desc: 'Quemá 500 kcal en un día',                    condition: (s) => s.maxKcalDia >= 500      },
  { id: 'kcal_quemadas_2',  icon: '🚀', titulo: 'Afterburn',            desc: 'Quemá 1000 kcal en un día',                   condition: (s) => s.maxKcalDia >= 1000     },

  // ── PESO ───────────────────────────────────────────────
  { id: 'peso_registrado',  icon: '⚖️', titulo: 'Báscula desbloqueada', desc: 'Registrá tu peso por primera vez',            condition: (s) => s.kgProgreso >= 0.1     },
  { id: 'peso_1kg',         icon: '📉', titulo: 'Primer kilo',          desc: '1kg hacia tu meta cumplido',                  condition: (s) => s.kgProgreso >= 1        },
  { id: 'peso_3kg',         icon: '📊', titulo: 'Buen ritmo',           desc: '3kg hacia tu meta cumplidos',                 condition: (s) => s.kgProgreso >= 3        },
  { id: 'peso_5kg',         icon: '🏆', titulo: 'Gran progreso',        desc: '5kg hacia tu meta cumplidos',                 condition: (s) => s.kgProgreso >= 5        },
  { id: 'peso_10kg',        icon: '👑', titulo: 'Transformación total', desc: '10kg hacia tu meta cumplidos',                condition: (s) => s.kgProgreso >= 10       },

  // ── BIENESTAR ──────────────────────────────────────────
  { id: 'bienestar_50',     icon: '😊', titulo: 'Equilibrio',           desc: 'Alcanzá score de bienestar 50+',              condition: (s) => s.mejorScore >= 50       },
  { id: 'bienestar_75',     icon: '🧘', titulo: 'Mente sana',           desc: 'Alcanzá score de bienestar 75+',              condition: (s) => s.mejorScore >= 75       },
  { id: 'bienestar_100',    icon: '✨', titulo: 'Bienestar perfecto',   desc: 'Alcanzá score de bienestar 100',              condition: (s) => s.mejorScore >= 100      },

  // ── RACHAS ─────────────────────────────────────────────
  { id: 'semana_comidas',   icon: '📅', titulo: 'Una semana completa',  desc: '7 días consecutivos registrando comidas',     condition: (s) => s.rachaComidas >= 7      },
  { id: 'racha_30',         icon: '🗓️', titulo: 'Mes completo',         desc: '30 días consecutivos en la app',              condition: (s) => s.rachaComidas >= 30     },
];

export default function Metas({ appState }) {
  const {
    profile,
    weightHistory,
    meals,
    tracking,
    getTotalConsumed,
    calculateTargetCalories,
    getMacroGoals,
  } = appState;

  const [pesoObjetivo, setPesoObjetivo] = useState(() => {
    const saved = localStorage.getItem('caloria_peso_objetivo');
    if (saved) return parseFloat(saved);
    return profile.goal === 'lose'
      ? parseFloat(profile.weight) - 10
      : parseFloat(profile.weight) + 5;
  });

  const savePesoObjetivo = (val) => {
    setPesoObjetivo(val);
    localStorage.setItem('caloria_peso_objetivo', String(val));
  };

  // ── Pesos — siempre parseFloat para evitar bugs de string ──
  const pesoActual = parseFloat(profile.weight) || 0;

  // Guardar peso inicial la primera vez
  if (!localStorage.getItem('caloria_peso_inicial') && pesoActual > 0) {
    localStorage.setItem('caloria_peso_inicial', String(pesoActual));
  }

  const pesoInicial =
    weightHistory.length > 0
      ? parseFloat(weightHistory[0].weight)
      : parseFloat(localStorage.getItem('caloria_peso_inicial')) || pesoActual;

  const pesoObj     = parseFloat(pesoObjetivo) || pesoActual;
  const totalCambio = Math.abs(pesoInicial - pesoObj);
  const cambioHecho = Math.abs(pesoActual  - pesoInicial);
  const pctPeso     = totalCambio > 0 ? Math.min((cambioHecho / totalCambio) * 100, 100) : 0;
  const kgRestantes = Math.abs(pesoActual - pesoObj);
  const kgProgreso  = Math.abs(pesoInicial - pesoActual);

  // ── Proyección ─────────────────────────────────────────
  const target  = calculateTargetCalories();
  const tdee    = Math.round(
    profile.activityLevel *
      (10 * pesoActual + 6.25 * parseFloat(profile.height) -
        5 * parseFloat(profile.age) + (profile.sex === 'male' ? 5 : -161))
  );
  const difDiario     = Math.abs(tdee - target);
  const diasEstimados = difDiario > 0 ? Math.round((kgRestantes * 7700) / difDiario) : null;
  const fechaEstimada = diasEstimados
    ? (() => {
        const d = new Date();
        d.setDate(d.getDate() + diasEstimados);
        return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
      })()
    : null;

  // ── Stats para logros ──────────────────────────────────
  const allMeals      = [...meals.breakfast, ...meals.lunch, ...meals.dinner, ...meals.snacks];
  const totalComidas  = allMeals.length;
  const consumed      = getTotalConsumed();
  const macroGoals    = getMacroGoals();
  const histBienestar = JSON.parse(localStorage.getItem('caloria_bienestar_historial') || '[]');
  const mejorScore    =
    histBienestar.length > 0
      ? Math.max(
          ...histBienestar.map((h) =>
            Math.round(
              ((h.sueno / 8) * 25) +
              (((5 - h.estres) / 4) * 25) +
              ((Math.min(h.pasos, 8000) / 8000) * 20) +
              ((h.sol / 20) * 10) +
              ((h.suenoQ / 5) * 10) +
              ((h.humor / 5) * 10)
            )
          )
        )
      : 0;

  const stats = {
    totalComidas,
    rachaComidas:     totalComidas > 0 ? 1 : 0,
    aguaPerfecta:     tracking.water >= tracking.waterGoal ? 1 : 0,
    diasEnMeta:       Math.abs(consumed.cal - target) <= 50 ? 1 : 0,
    rachaEjercicio:   0,
    kgProgreso,
    mejorScore,
    diasProteinaMeta: consumed.protein >= macroGoals.protein ? 1 : 0,
    diasSinExceso:    consumed.cal <= target ? 1 : 0,
    diasFibraMeta:    0,
    diasDesayuno:     meals.breakfast.length > 0 ? 1 : 0,
    totalEjercicios:  0,
    maxKcalDia:       0,
  };

  const logrosDesbloqueados = LOGROS.filter((l) => l.condition(stats));
  const logrosBloqueados    = LOGROS.filter((l) => !l.condition(stats));

  console.log({ pesoActual, pesoInicial, pesoObj, totalCambio, cambioHecho, pctPeso });
  return (
    <div className="metas-page">

      {/* Header */}
      <div className="page-header animate-fade-up-1">
        <div>
          <p className="page-sub">Objetivos</p>
          <h2 className="page-title">Metas & Logros</h2>
        </div>
        <span className="badge badge-green">
          <i className="bi bi-trophy-fill"></i> {logrosDesbloqueados.length}/{LOGROS.length} logros
        </span>
      </div>

      {/* Meta de peso */}
      <div className="card meta-peso-card animate-fade-up-2">
        <p className="card-label"><i className="bi bi-bullseye"></i> Meta de peso</p>
        <div className="meta-peso-grid">
          <div className="meta-peso-stat">
            <span className="meta-peso-val">{pesoInicial} kg</span>
            <span className="meta-peso-label">Peso inicial</span>
          </div>
          <div className="meta-peso-stat">
            <span className="meta-peso-val" style={{ color: 'var(--accent-green)' }}>{pesoActual} kg</span>
            <span className="meta-peso-label">Peso actual</span>
          </div>
          <div className="meta-peso-stat">
            <span className="meta-peso-val" style={{ color: 'var(--accent-orange)' }}>{pesoObj} kg</span>
            <span className="meta-peso-label">Peso objetivo</span>
          </div>
        </div>

        {/* Ajustar peso objetivo */}
        <div className="meta-peso-input">
          <label>Ajustar peso objetivo (kg)</label>
          <div className="meta-peso-input-row">
            <button onClick={() => savePesoObjetivo(Math.max(30, pesoObj - 0.5))}>
              <i className="bi bi-dash"></i>
            </button>
            <input
              type="number"
              value={pesoObj}
              min="30" max="300" step="0.5"
              onChange={(e) => savePesoObjetivo(parseFloat(e.target.value) || pesoObj)}
            />
            <button onClick={() => savePesoObjetivo(Math.min(300, pesoObj + 0.5))}>
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="meta-progreso-wrap">
          <div className="meta-progreso-track">
            <div className="meta-progreso-fill" style={{ width: `${pctPeso}%` }} />
            <div className="meta-progreso-thumb" style={{ left: `${pctPeso}%` }} />
          </div>
          <div className="meta-progreso-labels">
            <span>{pesoInicial} kg</span>
            <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>
              {Math.round(pctPeso)}% completado
            </span>
            <span>{pesoObj} kg</span>
          </div>
        </div>

        {/* Proyección */}
        {diasEstimados && (
          <div className="meta-proyeccion">
            <div className="meta-proy-item">
              <i className="bi bi-calendar-check" style={{ color: 'var(--accent-blue)' }}></i>
              <div>
                <span className="meta-proy-label">Fecha estimada</span>
                <span className="meta-proy-val">{fechaEstimada}</span>
              </div>
            </div>
            <div className="meta-proy-item">
              <i className="bi bi-clock" style={{ color: 'var(--accent-yellow)' }}></i>
              <div>
                <span className="meta-proy-label">Días restantes</span>
                <span className="meta-proy-val">{diasEstimados} días</span>
              </div>
            </div>
            <div className="meta-proy-item">
              <i className="bi bi-arrow-down-circle" style={{ color: 'var(--accent-green)' }}></i>
              <div>
                <span className="meta-proy-label">Kg restantes</span>
                <span className="meta-proy-val">{kgRestantes.toFixed(1)} kg</span>
              </div>
            </div>
            <div className="meta-proy-item">
              <i className="bi bi-fire" style={{ color: 'var(--accent-orange)' }}></i>
              <div>
                <span className="meta-proy-label">Déficit diario</span>
                <span className="meta-proy-val">{difDiario} kcal</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logros desbloqueados */}
      {logrosDesbloqueados.length > 0 && (
        <div className="animate-fade-up-3">
          <p className="section-label">🏆 Logros desbloqueados ({logrosDesbloqueados.length})</p>
          <div className="logros-grid">
            {logrosDesbloqueados.map((l) => (
              <div key={l.id} className="logro-card logro-unlocked">
                <span className="logro-icon">{l.icon}</span>
                <div className="logro-info">
                  <span className="logro-titulo">{l.titulo}</span>
                  <span className="logro-desc">{l.desc}</span>
                </div>
                <i className="bi bi-check-circle-fill logro-check"></i>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logros bloqueados */}
      <div className="animate-fade-up-4">
        <p className="section-label">🔒 Por desbloquear ({logrosBloqueados.length})</p>
        <div className="logros-grid">
          {logrosBloqueados.map((l) => (
            <div key={l.id} className="logro-card logro-locked">
              <span className="logro-icon logro-icon-locked">{l.icon}</span>
              <div className="logro-info">
                <span className="logro-titulo">{l.titulo}</span>
                <span className="logro-desc">{l.desc}</span>
              </div>
              <i className="bi bi-lock-fill logro-lock"></i>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}