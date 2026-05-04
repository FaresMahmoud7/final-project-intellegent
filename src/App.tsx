import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Sprout, 
  Droplets, 
  Map as MapIcon, 
  LineChart, 
  Settings as SettingsIcon, 
  Bell, 
  Search,
  CloudSun,
  UserCircle
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Imagery from './components/Imagery';
import Irrigation from './components/Irrigation';
import Simulation from './components/Simulation';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import { translations } from './i18n';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState<'en' | 'ar'>(() => {
    return (localStorage.getItem('agrisense-lang') as 'en' | 'ar') || 'en';
  });
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const t = translations[language];

  useEffect(() => {
    localStorage.setItem('agrisense-lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard t={t} />;
      case 'imagery': return <Imagery t={t} />;
      case 'irrigation': return <Irrigation t={t} />;
      case 'simulation': return <Simulation t={t} />;
      case 'analytics': return <Analytics t={t} />;
      case 'settings': return <Settings t={t} theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />;
      default: return null;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="nav-brand">
          <div className="nav-brand-icon">
            <Sprout size={24} />
          </div>
          <h2 className="text-xl font-bold">AgriSense AI</h2>
        </div>

        <nav className="flex-1">
          <ul className="nav-menu">
            <li 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={20} className="shrink-0" />
              <span>{t.overview}</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'imagery' ? 'active' : ''}`}
              onClick={() => setActiveTab('imagery')}
            >
              <MapIcon size={20} className="shrink-0" />
              <span>{t.fieldImagery}</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'irrigation' ? 'active' : ''}`}
              onClick={() => setActiveTab('irrigation')}
            >
              <Droplets size={20} className="shrink-0" />
              <span>{t.irrigationSpray}</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'simulation' ? 'active' : ''}`}
              onClick={() => setActiveTab('simulation')}
            >
              <Sprout size={20} className="shrink-0" />
              <span>{t.cropSimulation}</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <LineChart size={20} className="shrink-0" />
              <span>{t.marketAnalytics}</span>
            </li>
          </ul>
        </nav>

        <div className="mt-auto pt-6 border-t-border">
          <ul className="nav-menu">
            <li 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <SettingsIcon size={20} className="shrink-0" />
              <span>{t.settings}</span>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="flex items-center gap-4 w-1/3">
            <div className="glass-panel px-4 py-2 flex items-center gap-2 w-full">
              <Search size={18} className="text-muted shrink-0" />
              <input 
                type="text" 
                placeholder={t.searchFields} 
                className="search-input"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CloudSun size={20} className="text-warning shrink-0" />
              <span>{t.weather}</span>
            </div>
            
            <div className="flex items-center gap-4 border-l-border pl-6">
              <button title={t.notifications} aria-label={t.notifications} className="relative bg-transparent border-none text-muted hover:text-main cursor-pointer transition">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-danger"></span>
              </button>
              
              <div className="flex items-center gap-2 cursor-pointer">
                <UserCircle size={32} className="text-primary shrink-0" />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold m-0">{t.farmManager}</p>
                  <p className="text-xs text-muted m-0">{t.adminRole}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="page-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
