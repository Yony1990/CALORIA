import { useRef } from 'react';
import './Sidebar.css';

const navItems = [
  { id: 'dashboard',  icon: 'bi-grid-1x2',      label: 'Dashboard'  },
  { id: 'nutrition',  icon: 'bi-journal-text',   label: 'Nutrición'  },
  // { id: 'advanced',   icon: 'bi-capsule',        label: 'Micros'     },
  { id: 'calistenia', icon: 'bi-person-arms-up', label: 'Calistenia' },
  { id: 'tracking',   icon: 'bi-graph-up-arrow', label: 'Progreso'   },
  // { id: 'profile',    icon: 'bi-person-circle',  label: 'Perfil'     },
];

const slogans = {
  lose:     '💪 Cada día más cerca',
  maintain: '⚖️ En equilibrio perfecto',
  gain:     '🔥 Construyendo tu mejor versión',
};

export default function Sidebar({ activePage, setActivePage, profile, onAvatarChange }) {
  const fileRef = useRef(null);

  const avatarSrc = profile.avatar
    ? profile.avatar
    : profile.sex === 'female'
      ? '/avatars/female.avif'
      : '/avatars/male.avif';

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onAvatarChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <i className="bi bi-lightning-charge-fill"></i>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
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

      {/* Avatar card */}
      <div className="sidebar-profile" onClick={() => setActivePage('profile')}>
        <div className="sp-avatar-wrap">
          <img src={avatarSrc} alt="avatar" className="sp-avatar" />
        </div>
        <div className="sp-info">
          <p className="sp-name">{profile.name || 'Atleta'}</p>
          <p className="sp-slogan">{slogans[profile.goal] || '💪 Cada día más cerca'}</p>
        </div>
      </div>
    </aside>
  );
}