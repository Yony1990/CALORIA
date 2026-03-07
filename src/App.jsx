import { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Nutrition from './components/Nutrition/Advanced';
import Advanced from './components/Nutrition/Advanced';
import Calistenia from './components/Calistenia/Calistenia';
import Tracking from './components/Tracking/Tracking';
import Profile from './components/Dashboard/Profile';
import { useAppState } from './hooks/useAppState';
import './styles/global.css';
import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const appState = useAppState();

  const { profile, saveProfile } = appState; // ← extraemos de appState

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':  return <Dashboard appState={appState} />;
      case 'nutrition':  return <Nutrition appState={appState} />;
      // case 'advanced': return <Advanced appState={appState} />;
      case 'calistenia': return <Calistenia appState={appState} />;
      case 'tracking':   return <Tracking appState={appState} />;
      case 'profile':    return <Profile appState={appState} />;
      default:           return <Dashboard appState={appState} />;
    }
  };

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