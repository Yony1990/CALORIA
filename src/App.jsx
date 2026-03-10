import { useEffect, useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Nutrition from './components/Nutrition/Advanced';
import Calistenia from './components/Calistenia/Calistenia';
import Tracking from './components/Tracking/Tracking';
import Profile from './components/Dashboard/Profile';
import Bienestar from './components/Bienestar/Bienestar';
import Metas from './components/Metas/Metas';
import Recetas from './components/Recetas/Recetas';
import Calculadora from './components/Calculadora/Calculadora';
import { useAppState } from './hooks/useAppState';
import './styles/global.css';
import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const appState = useAppState();
  const { profile, saveProfile } = appState;

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':  return <Dashboard appState={appState} />;
      case 'nutrition':  return <Nutrition appState={appState} />;
      case 'calistenia': return <Calistenia appState={appState} />;
      case 'tracking':   return <Tracking appState={appState} />;
      case 'profile':    return <Profile appState={appState} />;
      case 'bienestar':  return <Bienestar appState={appState} />;
      case 'metas':      return <Metas appState={appState} />;
      case 'recetas':    return <Recetas appState={appState} />;
      case 'calculadora': return <Calculadora appState={appState} />;
      default:           return <Dashboard appState={appState} />;
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activePage]);

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        profile={profile}
        onAvatarChange={(img) => saveProfile({ avatar: img })}
      />
      <main className="app-main">
        <div className="page-content">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}