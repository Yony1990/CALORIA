import { useRef, useState } from 'react';
import './Sidebar.css';
import logo from '../../assets/img/logo.png';

const navItemsPrimary = [
  { id: 'dashboard',  icon: 'bi-grid-1x2',       label: 'Dashboard'  },
  { id: 'nutrition',  icon: 'bi-journal-text',   label: 'Nutrición'  },
  { id: 'calistenia', icon: 'bi-person-arms-up', label: 'Calistenia' },
  { id: 'bienestar',  icon: 'bi-heart-pulse',    label: 'Bienestar'  },
  { id: 'metas',      icon: 'bi-trophy',         label: 'Metas'      },
];

const navItemsSecondary = [
  { id: 'tracking',    icon: 'bi-graph-up-arrow', label: 'Progreso'    },
  { id: 'recetas',     icon: 'bi-book',           label: 'Recetas'     },
  { id: 'plan',        icon: 'bi-calendar-week',  label: 'Plan'        },
  { id: 'lista',       icon: 'bi-cart3',          label: 'Compras'     },
  { id: 'ayuno',       icon: 'bi-clock-history',  label: 'Ayuno'       },
  { id: 'calculadora', icon: 'bi-calculator',     label: 'Calculadora' },
];

const slogans = {
  lose:     '💪 Cada día más cerca',
  maintain: '⚖️ En equilibrio perfecto',
  gain:     '🔥 Construyendo tu mejor versión',
};

export default function Sidebar({ activePage, setActivePage, profile, onAvatarChange }) {
  const fileRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const avatarSrc = profile.avatar || `${import.meta.env.BASE_URL}avatars/${profile.sex === 'female' ? 'female' : 'male'}.avif`;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onAvatarChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  const isSecondaryActive = navItemsSecondary.some(i => i.id === activePage);
  const allNavItems = [...navItemsPrimary, ...navItemsSecondary];

  return (
    <aside className="sidebar">
      {/* Logo — solo desktop */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <img src={logo} alt="img logo" />
        </div>
      </div>

      {/* Avatar card — solo desktop */}
      <div className="sidebar-profile" onClick={() => setActivePage('profile')}>
        <div className="sp-avatar-wrap">
          <img src={avatarSrc} alt="avatar" className="sp-avatar" />
        </div>
        <div className="sp-info">
          <p className="sp-name">{profile.name || 'Atleta'}</p>
          <p className="sp-slogan">{slogans[profile.goal] || '💪 Cada día más cerca'}</p>
        </div>
      </div>

      {/* Nav desktop */}
      <nav className="sidebar-nav">
        {allNavItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
            title={item.label}
          >
            <i className={`bi ${item.icon}`}></i>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* ── MOBILE BOTTOM NAV ─────────────────────────── */}
      {/* ── MOBILE BOTTOM NAV ─────────────────────────── */}
<div className="mobile-nav">

  {/* Fila secundaria — se expande hacia arriba */}
  <div className={`mobile-nav-secondary ${expanded ? 'open' : ''}`}>
    {navItemsSecondary.map(item => (
      <button
        key={item.id}
        className={`mobile-nav-item ${activePage === item.id ? 'active' : ''}`}
        onClick={() => { setActivePage(item.id); setExpanded(false); }}
      >
        <i className={`bi ${item.icon}`}></i>
        <span>{item.label}</span>
      </button>
    ))}
  </div>

  {/* Fila principal — avatar siempre visible */}
  <div className="mobile-nav-primary">

    {/* Avatar siempre primero */}
    <button
      className={`mobile-nav-avatar-btn ${activePage === 'profile' ? 'active' : ''}`}
      onClick={() => { setActivePage('profile'); setExpanded(false); }}
    >
      <img src={avatarSrc} alt="avatar" className="mobile-avatar-img" />
    </button>

    {navItemsPrimary.map(item => (
      <button
        key={item.id}
        className={`mobile-nav-item ${activePage === item.id ? 'active' : ''}`}
        onClick={() => { setActivePage(item.id); setExpanded(false); }}
      >
        <i className={`bi ${item.icon}`}></i>
        <span>{item.label}</span>
      </button>
    ))}

    {/* Flecha expandir */}
    <button
      className={`mobile-nav-expand ${expanded ? 'open' : ''} ${isSecondaryActive ? 'secondary-active' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <i className="bi bi-chevron-up expand-arrow"></i>
      {isSecondaryActive && !expanded && <span className="expand-dot"></span>}
    </button>

  </div>
</div>

      <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleFile} />
    </aside>
  );
}