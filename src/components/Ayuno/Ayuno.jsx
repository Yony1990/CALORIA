import { useState, useEffect, useRef } from 'react';
import './Ayuno.css';

const PROTOCOLOS = [
  {
    id: '16-8',
    nombre: '16:8',
    ayuno: 16,
    alimentacion: 8,
    desc: 'El más popular. 16h de ayuno, 8h para comer.',
    nivel: 'Principiante',
    color: 'var(--accent-green)',
    icon: 'bi-clock',
    horario: '12:00pm — 8:00pm',
    beneficios: ['Pérdida de peso gradual', 'Mejora sensibilidad insulina', 'Fácil de mantener'],
    ideal: 'Saltear el desayuno y comer entre mediodía y las 8pm. Ideal para comenzar.',
    calorias: 'Sin restricción calórica durante la ventana.',
  },
  {
    id: '18-6',
    nombre: '18:6',
    ayuno: 18,
    alimentacion: 6,
    desc: 'Más intenso. Mayor quema de grasa.',
    nivel: 'Intermedio',
    color: 'var(--accent-blue)',
    icon: 'bi-clock-history',
    horario: '2:00pm — 8:00pm',
    beneficios: ['Mayor quema de grasa', 'Cetosis más rápida', 'Mejor control del apetito'],
    ideal: 'Comer entre las 2pm y las 8pm. Requiere adaptación previa al 16:8.',
    calorias: 'Sin restricción calórica durante la ventana.',
  },
  {
    id: '20-4',
    nombre: '20:4',
    ayuno: 20,
    alimentacion: 4,
    desc: 'Avanzado. Ventana muy reducida.',
    nivel: 'Avanzado',
    color: 'var(--accent-orange)',
    icon: 'bi-hourglass-split',
    horario: '4:00pm — 8:00pm',
    beneficios: ['Máxima quema de grasa', 'Autofagia intensa', 'Alto nivel de cetosis'],
    ideal: 'Solo 4h para comer, típicamente entre 4pm y 8pm. Solo para experimentados.',
    calorias: 'Asegurar suficientes calorías en la ventana.',
  },
  {
    id: '5-2',
    nombre: '5:2',
    ayuno: 0,
    alimentacion: 0,
    desc: '5 días normal, 2 días 500 kcal.',
    nivel: 'Flexible',
    color: '#ff6b9d',
    icon: 'bi-calendar-week',
    horario: '2 días a elección (no consecutivos)',
    beneficios: ['Muy flexible', 'Sin restricción 5 días', 'Sostenible a largo plazo'],
    ideal: 'Elegí 2 días no consecutivos (ej: lunes y jueves) para restringir a 500 kcal.',
    calorias: '500 kcal los días de ayuno, normal los demás.',
  },
];

const FASES = [
  { horasMin: 0,  horasMax: 4,  nombre: 'Digestión',      icon: '🍽️', desc: 'El cuerpo procesa la última comida.',          color: '#aaaaaa'              },
  { horasMin: 4,  horasMax: 8,  nombre: 'Glucógeno',      icon: '⚡', desc: 'Se consume el glucógeno almacenado.',          color: 'var(--accent-yellow)' },
  { horasMin: 8,  horasMax: 12, nombre: 'Quema de grasa', icon: '🔥', desc: 'El cuerpo empieza a usar grasa como energía.', color: 'var(--accent-orange)' },
  { horasMin: 12, horasMax: 16, nombre: 'Cetosis leve',   icon: '💪', desc: 'Niveles bajos de insulina, cetosis iniciando.', color: 'var(--accent-green)'  },
  { horasMin: 16, horasMax: 20, nombre: 'Cetosis',        icon: '🚀', desc: 'Cetosis activa, máxima quema de grasa.',        color: 'var(--accent-blue)'   },
  { horasMin: 20, horasMax: 99, nombre: 'Autofagia',      icon: '✨', desc: 'Limpieza celular profunda activada.',           color: '#c0c0ff'              },
];

const getFaseActual = (horasAyunadas) =>
  FASES.find(f => horasAyunadas >= f.horasMin && horasAyunadas < f.horasMax) || FASES[0];

const formatTiempo = (segundos) => {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = segundos % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
};

export default function Ayuno({ appState }) {
  const [protocoloId,       setProtocoloId]       = useState(() => localStorage.getItem('caloria_ayuno_protocolo') || '16-8');
  const [ayunoActivo,       setAyunoActivo]       = useState(() => !!localStorage.getItem('caloria_ayuno_inicio'));
  const [segundos,          setSegundos]          = useState(0);
  const [historial,         setHistorial]         = useState(() => JSON.parse(localStorage.getItem('caloria_ayuno_historial') || '[]'));
  const [protocoloExpandido,setProtocoloExpandido]= useState(null);
  const intervalRef = useRef(null);

  const protocolo = PROTOCOLOS.find(p => p.id === protocoloId) || PROTOCOLOS[0];

  // ── Calcular segundos desde inicio guardado ────────────
  useEffect(() => {
    const inicio = localStorage.getItem('caloria_ayuno_inicio');
    if (inicio) {
      const diff = Math.floor((Date.now() - parseInt(inicio)) / 1000);
      setSegundos(diff);
      setAyunoActivo(true);
    }
  }, []);

  // ── Tick del temporizador ──────────────────────────────
  useEffect(() => {
    if (ayunoActivo) {
      intervalRef.current = setInterval(() => {
        const inicio = localStorage.getItem('caloria_ayuno_inicio');
        if (inicio) {
          const diff = Math.floor((Date.now() - parseInt(inicio)) / 1000);
          setSegundos(diff);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [ayunoActivo]);

  const iniciarAyuno = () => {
    const ahora = Date.now();
    localStorage.setItem('caloria_ayuno_inicio', String(ahora));
    localStorage.setItem('caloria_ayuno_protocolo', protocoloId);
    setSegundos(0);
    setAyunoActivo(true);
  };

  const terminarAyuno = () => {
    const horasCompletadas = parseFloat((segundos / 3600).toFixed(1));
    const completado = protocolo.ayuno > 0 ? horasCompletadas >= protocolo.ayuno : true;
    const entrada = {
      fecha:     new Date().toLocaleDateString('es-ES'),
      protocolo: protocolo.nombre,
      horas:     horasCompletadas,
      completado,
      ts:        Date.now(),
    };
    const nuevoHistorial = [entrada, ...historial].slice(0, 14);
    setHistorial(nuevoHistorial);
    localStorage.setItem('caloria_ayuno_historial', JSON.stringify(nuevoHistorial));
    localStorage.removeItem('caloria_ayuno_inicio');
    setAyunoActivo(false);
    setSegundos(0);
  };

  const horasAyunadas = segundos / 3600;
  const metaSegundos  = protocolo.ayuno * 3600;
  const pct           = protocolo.ayuno > 0 ? Math.min((segundos / metaSegundos) * 100, 100) : 0;
  const faseActual    = getFaseActual(horasAyunadas);
  const segsRestantes = Math.max(metaSegundos - segundos, 0);
  const completado    = segundos >= metaSegundos && protocolo.ayuno > 0;

  const size          = 220;
  const strokeWidth   = 12;
  const radius        = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset        = circumference - (pct / 100) * circumference;

  return (
    <div className="ayuno-page">

      {/* Header */}
      <div className="page-header animate-fade-up-1">
        <div>
          <p className="page-sub">Salud</p>
          <h2 className="page-title">Ayuno Intermitente</h2>
        </div>
        {ayunoActivo && (
          <span className="badge" style={{ background:`${faseActual.color}18`, color:faseActual.color, border:`1px solid ${faseActual.color}33` }}>
            <i className="bi bi-circle-fill" style={{ fontSize:8 }}></i> En ayuno
          </span>
        )}
      </div>

      {/* Selector de protocolo */}
      {!ayunoActivo && (
        <div className="card ayuno-protocolos animate-fade-up-2">
          <p className="card-label"><i className="bi bi-list-stars"></i> Protocolo</p>
          <div className="protocolos-grid">
            {PROTOCOLOS.map(p => (
              <div key={p.id} className="protocolo-wrap">
                <button
                  className={`protocolo-btn ${protocoloId === p.id ? 'active' : ''}`}
                  style={protocoloId === p.id ? { borderColor: p.color, background:`${p.color}12` } : {}}
                  onClick={() => {
                    setProtocoloId(p.id);
                    localStorage.setItem('caloria_ayuno_protocolo', p.id);
                    setProtocoloExpandido(protocoloExpandido === p.id ? null : p.id);
                  }}
                >
                  <div className="protocolo-top">
                    <i className={`bi ${p.icon}`} style={{ color: protocoloId === p.id ? p.color : 'var(--text-muted)' }}></i>
                    <span className="protocolo-nivel" style={{ color: protocoloId === p.id ? p.color : 'var(--text-muted)' }}>{p.nivel}</span>
                  </div>
                  <span className="protocolo-nombre" style={{ color: protocoloId === p.id ? p.color : 'var(--text-primary)' }}>{p.nombre}</span>
                  <span className="protocolo-desc">{p.desc}</span>
                  <div className="protocolo-expand-hint">
                    <i className={`bi bi-chevron-${protocoloExpandido === p.id ? 'up' : 'down'}`}></i>
                  </div>
                </button>

                {/* Accordion */}
                {protocoloExpandido === p.id && (
                  <div className="protocolo-detalle" style={{ borderColor:`${p.color}33` }}>
                    <div className="protocolo-detalle-row">
                      <i className="bi bi-clock" style={{ color: p.color }}></i>
                      <div>
                        <span className="pd-label">Horario sugerido</span>
                        <span className="pd-val">{p.horario}</span>
                      </div>
                    </div>
                    <div className="protocolo-detalle-row">
                      <i className="bi bi-fire" style={{ color: p.color }}></i>
                      <div>
                        <span className="pd-label">Calorías</span>
                        <span className="pd-val">{p.calorias}</span>
                      </div>
                    </div>
                    <div className="protocolo-detalle-row">
                      <i className="bi bi-lightbulb" style={{ color: p.color }}></i>
                      <div>
                        <span className="pd-label">Cómo hacerlo</span>
                        <span className="pd-val">{p.ideal}</span>
                      </div>
                    </div>
                    <div className="protocolo-beneficios">
                      <span className="pd-label">Beneficios</span>
                      <div className="beneficios-list">
                        {p.beneficios.map((b, i) => (
                          <span key={i} className="beneficio-tag" style={{ background:`${p.color}12`, color:p.color, border:`1px solid ${p.color}33` }}>
                            ✓ {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Temporizador principal */}
      <div className="card ayuno-timer-card animate-fade-up-3">
        <div className="ayuno-timer-wrap">

          {/* Ring */}
          <div className="ayuno-ring-wrap">
            <svg width={size} height={size} style={{ overflow:'visible' }}>
              <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
              <circle
                cx={size/2} cy={size/2} r={radius}
                fill="none"
                stroke={completado ? 'var(--accent-green)' : faseActual.color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size/2} ${size/2})`}
                style={{ filter:`drop-shadow(0 0 8px ${completado ? 'var(--accent-green)' : faseActual.color})`, transition:'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div className="ayuno-ring-inner">
              {ayunoActivo ? (
                <>
                  <span className="ayuno-fase-icon">{faseActual.icon}</span>
                  <span className="ayuno-tiempo">{formatTiempo(segundos)}</span>
                  <span className="ayuno-fase-nombre" style={{ color: faseActual.color }}>{faseActual.nombre}</span>
                  {protocolo.ayuno > 0 && (
                    <span className="ayuno-pct">{Math.round(pct)}%</span>
                  )}
                </>
              ) : (
                <>
                  <i className="bi bi-clock-history ayuno-idle-icon"></i>
                  <span className="ayuno-idle-text">Listo para<br/>ayunar</span>
                </>
              )}
            </div>
          </div>

          {/* Info lateral */}
          <div className="ayuno-timer-info">
            {ayunoActivo ? (
              <>
                <div className="ayuno-info-card">
                  <span className="ayuno-info-label">Protocolo</span>
                  <span className="ayuno-info-val" style={{ color: protocolo.color }}>{protocolo.nombre}</span>
                </div>
                <div className="ayuno-info-card">
                  <span className="ayuno-info-label">Meta</span>
                  <span className="ayuno-info-val">{protocolo.ayuno}h ayuno</span>
                </div>
                {protocolo.ayuno > 0 && (
                  <div className="ayuno-info-card">
                    <span className="ayuno-info-label">{completado ? '✅ Completado' : 'Restante'}</span>
                    <span className="ayuno-info-val" style={{ color: completado ? 'var(--accent-green)' : 'var(--text-primary)' }}>
                      {completado ? '¡Meta lograda!' : formatTiempo(segsRestantes)}
                    </span>
                  </div>
                )}
                <div className="ayuno-info-card">
                  <span className="ayuno-info-label">Fase actual</span>
                  <span className="ayuno-info-val" style={{ color: faseActual.color }}>
                    {faseActual.icon} {faseActual.nombre}
                  </span>
                </div>
                <p className="ayuno-fase-desc">{faseActual.desc}</p>
              </>
            ) : (
              <>
                <div className="ayuno-info-card">
                  <span className="ayuno-info-label">Protocolo</span>
                  <span className="ayuno-info-val" style={{ color: protocolo.color }}>{protocolo.nombre}</span>
                </div>
                <div className="ayuno-info-card">
                  <span className="ayuno-info-label">Ayuno</span>
                  <span className="ayuno-info-val">{protocolo.ayuno}h</span>
                </div>
                <div className="ayuno-info-card">
                  <span className="ayuno-info-label">Alimentación</span>
                  <span className="ayuno-info-val">{protocolo.alimentacion}h</span>
                </div>
                <p className="ayuno-fase-desc">{protocolo.desc}</p>
              </>
            )}

            <button
              className={`btn ayuno-btn ${ayunoActivo ? 'ayuno-btn-stop' : 'ayuno-btn-start'}`}
              onClick={ayunoActivo ? terminarAyuno : iniciarAyuno}
            >
              <i className={`bi ${ayunoActivo ? 'bi-stop-circle' : 'bi-play-circle'}`}></i>
              {ayunoActivo ? 'Terminar ayuno' : 'Iniciar ayuno'}
            </button>
          </div>
        </div>
      </div>

      {/* Fases del ayuno */}
      <div className="card ayuno-fases-card animate-fade-up-4">
        <p className="card-label"><i className="bi bi-diagram-3"></i> Fases del ayuno</p>
        <div className="fases-list">
          {FASES.map((fase, i) => {
            const activa = ayunoActivo && horasAyunadas >= fase.horasMin && horasAyunadas < fase.horasMax;
            const pasada = ayunoActivo && horasAyunadas >= fase.horasMax;
            return (
              <div key={i} className={`fase-item ${activa ? 'activa' : ''} ${pasada ? 'pasada' : ''}`}>
                <div className="fase-icon-wrap" style={{ background:`${fase.color}18`, border:`1px solid ${activa || pasada ? fase.color : 'var(--border)'}33` }}>
                  <span>{fase.icon}</span>
                </div>
                <div className="fase-info">
                  <span className="fase-nombre" style={{ color: activa ? fase.color : pasada ? fase.color : 'var(--text-secondary)' }}>
                    {fase.nombre}
                    {activa && <span className="fase-activa-badge">● Ahora</span>}
                    {pasada && <span className="fase-pasada-badge">✓</span>}
                  </span>
                  <span className="fase-horas">{fase.horasMin}h — {fase.horasMax === 99 ? '24h+' : `${fase.horasMax}h`}</span>
                  <span className="fase-desc">{fase.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historial */}
      {historial.length > 0 && (
        <div className="card ayuno-historial-card animate-fade-up-4">
          <p className="card-label"><i className="bi bi-calendar-check"></i> Historial reciente</p>
          <div className="historial-ayuno-list">
            {historial.slice(0, 7).map((h, i) => (
              <div key={i} className="historial-ayuno-item">
                <div className="historial-ayuno-fecha">
                  <span className="ha-fecha">{h.fecha}</span>
                  <span className="ha-protocolo">{h.protocolo}</span>
                </div>
                <div className="historial-ayuno-resultado">
                  <span className="ha-horas">{h.horas}h</span>
                  <span className={`ha-badge ${h.completado ? 'completado' : 'parcial'}`}>
                    {h.completado ? '✓ Completado' : '~ Parcial'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}