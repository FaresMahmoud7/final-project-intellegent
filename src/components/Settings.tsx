import { useState, useEffect } from 'react';
import { Globe, Moon, Sun, User, Bell, Shield, HardDrive, Check, CloudSun } from 'lucide-react';

interface SettingsProps {
  t: Record<string, string>;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  language: 'en' | 'ar';
  setLanguage: (l: 'en' | 'ar') => void;
}

const COLORS = [
  { name: 'Emerald', hex: '#10b981', rgb: '16, 185, 129' },
  { name: 'Blue', hex: '#3b82f6', rgb: '59, 130, 246' },
  { name: 'Purple', hex: '#8b5cf6', rgb: '139, 92, 246' },
  { name: 'Orange', hex: '#f97316', rgb: '249, 115, 22' },
];

export default function Settings({ t, theme, setTheme, language, setLanguage }: SettingsProps) {
  const [activeTab, setActiveTab] = useState<'account' | 'preferences' | 'notifications' | 'security' | 'integrations'>('preferences');
  const [accentColor, setAccentColor] = useState(COLORS[0]);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', accentColor.hex);
    document.documentElement.style.setProperty('--primary-rgb', accentColor.rgb);
    document.documentElement.style.setProperty('--primary-hover', accentColor.hex);
  }, [accentColor]);

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="glass-panel p-8 animate-fade-in">
            <h3 className="text-xl mb-6 border-b border-border pb-4">{t.account}</h3>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-black/20 rounded-full border-2 border-border flex items-center justify-center overflow-hidden">
                   <User size={48} className="text-muted" />
                </div>
                <div>
                   <h4 className="font-semibold mb-2">{t.profilePicture}</h4>
                   <button onClick={() => alert("Profile update modal opened.")} className="button-outline text-xs py-2 px-4">{t.updateProfile}</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="form-label" htmlFor="fullName">{t.fullName}</label>
                  <input id="fullName" type="text" className="form-input" defaultValue="Farm Manager" />
                </div>
                <div>
                  <label className="form-label" htmlFor="emailAddress">{t.email}</label>
                  <input id="emailAddress" type="email" className="form-input" defaultValue="admin@agrisense.ai" />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'preferences':
        return (
          <div className="glass-panel p-8 animate-fade-in">
            <h3 className="text-xl mb-6 border-b border-border pb-4">{t.preferences}</h3>
            
            <div className="flex flex-col gap-8">
              
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-lg mb-1">{t.language}</h4>
                  <p className="text-sm text-muted">{t.languageDesc}</p>
                </div>
                <select 
                  title="Select Language"
                  aria-label="Select Language"
                  className="form-input w-auto min-w-[200px]"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'en'|'ar')}
                >
                  <option value="en">English (US)</option>
                  <option value="ar">العربية (Arabic)</option>
                </select>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-border/50">
                <div>
                  <h4 className="font-semibold text-lg mb-1">{t.theme}</h4>
                  <p className="text-sm text-muted">{t.themeDesc}</p>
                </div>
                <div className="flex bg-black/10 rounded-xl p-1.5 border border-border">
                  <button 
                    title="Light Mode"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-none cursor-pointer transition ${theme === 'light' ? 'bg-white text-black shadow-sm font-semibold' : 'bg-transparent text-muted'}`}
                    onClick={() => setTheme('light')}
                  >
                    <Sun size={18} /> {t.light}
                  </button>
                  <button 
                    title="Dark Mode"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-none cursor-pointer transition ${theme === 'dark' ? 'bg-gray-800 text-white shadow-sm font-semibold' : 'bg-transparent text-muted'}`}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon size={18} /> {t.dark}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-border/50">
                <div>
                  <h4 className="font-semibold text-lg mb-1">{t.colorTheme}</h4>
                  <p className="text-sm text-muted">{t.colorDesc}</p>
                </div>
                <div className="flex gap-4">
                  {COLORS.map(c => (
                    <button 
                      key={c.name}
                      title={c.name}
                      onClick={() => setAccentColor(c)}
                      className={`w-10 h-10 rounded-full border-none cursor-pointer flex items-center justify-center transition-transform hover:scale-110 theme-color-${c.name} ${accentColor.hex === c.hex ? `theme-shadow-${c.name}` : ''}`}
                    >
                       {accentColor.hex === c.hex && <Check size={18} color="white" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="glass-panel p-8 animate-fade-in">
            <h3 className="text-xl mb-6 border-b border-border pb-4">{t.notifications}</h3>
            <div className="flex flex-col gap-6">
               <div className="flex justify-between items-center p-4 bg-black/5 rounded-xl border border-border">
                 <div>
                   <h4 className="font-semibold text-lg mb-1">{t.emailAlerts}</h4>
                   <p className="text-sm text-muted">{t.alertDesc}</p>
                 </div>
                 <input title="Toggle Email" aria-label="Toggle Email" type="checkbox" defaultChecked className="w-6 h-6 accent-primary cursor-pointer" />
               </div>
               <div className="flex justify-between items-center p-4 bg-black/5 rounded-xl border border-border">
                 <div>
                   <h4 className="font-semibold text-lg mb-1">{t.smsAlerts}</h4>
                   <p className="text-sm text-muted">{t.alertDesc}</p>
                 </div>
                 <input title="Toggle SMS" aria-label="Toggle SMS" type="checkbox" className="w-6 h-6 accent-primary cursor-pointer" />
               </div>
               <div className="flex justify-between items-center p-4 bg-black/5 rounded-xl border border-border">
                 <div>
                   <h4 className="font-semibold text-lg mb-1">{t.pushAlerts}</h4>
                   <p className="text-sm text-muted">{t.alertDesc}</p>
                 </div>
                 <input title="Toggle Push" aria-label="Toggle Push" type="checkbox" defaultChecked className="w-6 h-6 accent-primary cursor-pointer" />
               </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="glass-panel p-8 animate-fade-in">
            <h3 className="text-xl mb-6 border-b border-border pb-4">{t.security}</h3>
            <div className="flex flex-col gap-6">
               <div className="flex justify-between items-center bg-black/5 p-6 rounded-xl border border-border">
                 <div>
                   <h4 className="font-semibold text-lg mb-1">{t.password}</h4>
                   <p className="text-sm text-muted tracking-widest">********</p>
                 </div>
                 <button className="button-outline text-sm py-2 px-4">{t.changePassword}</button>
               </div>
               <div className="flex justify-between items-center bg-black/5 p-6 rounded-xl border border-border">
                 <div>
                   <h4 className="font-semibold text-lg mb-1">{t.twoFactor}</h4>
                   <p className="text-sm text-muted">Disabled</p>
                 </div>
                 <button className="button text-sm py-2 px-4">Enable 2FA</button>
               </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="glass-panel p-8 animate-fade-in">
            <h3 className="text-xl mb-6 border-b border-border pb-4">{t.integrations}</h3>
            <div className="flex flex-col gap-6">
               <div className="flex justify-between items-center p-5 border border-border rounded-2xl bg-black/5 hover:border-primary transition">
                 <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center">
                     <CloudSun size={28} />
                   </div>
                   <div>
                     <h4 className="font-semibold text-lg mb-1">{t.weatherApi} (OpenWeather)</h4>
                     <p className="text-sm text-primary flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block"></span> {t.connected}</p>
                   </div>
                 </div>
                 <button className="button-outline text-sm py-2 px-4">Manage</button>
               </div>
               
               <div className="flex justify-between items-center p-5 border border-border rounded-2xl bg-black/5 opacity-70 hover:opacity-100 hover:border-primary transition">
                 <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-green-500/20 text-green-500 rounded-xl flex items-center justify-center">
                     <HardDrive size={28} />
                   </div>
                   <div>
                     <h4 className="font-semibold text-lg mb-1">{t.tractorApi} (John Deere)</h4>
                     <p className="text-sm text-muted">Not Connected</p>
                   </div>
                 </div>
                 <button className="button text-sm py-2 px-4">{t.connect}</button>
               </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6 max-w-6xl w-full">
      <div className="mb-4">
        <h1 className="mb-2">{t.settingsTitle}</h1>
        <p className="text-muted text-lg">{t.settingsDesc}</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Settings Nav */}
        <div className="col-span-3 flex flex-col gap-2">
           <button 
             onClick={() => setActiveTab('account')}
             className={`nav-item border-none w-full text-left bg-transparent flex gap-3 text-lg py-3 ${activeTab === 'account' ? 'active' : ''}`}
           >
             <User size={20} /> {t.account}
           </button>
           <button 
             onClick={() => setActiveTab('preferences')}
             className={`nav-item border-none w-full text-left bg-transparent flex gap-3 text-lg py-3 ${activeTab === 'preferences' ? 'active' : ''}`}
           >
             <Globe size={20} /> {t.preferences}
           </button>
           <button 
             onClick={() => setActiveTab('notifications')}
             className={`nav-item border-none w-full text-left bg-transparent flex gap-3 text-lg py-3 ${activeTab === 'notifications' ? 'active' : ''}`}
           >
             <Bell size={20} /> {t.notifications}
           </button>
           <button 
             onClick={() => setActiveTab('security')}
             className={`nav-item border-none w-full text-left bg-transparent flex gap-3 text-lg py-3 ${activeTab === 'security' ? 'active' : ''}`}
           >
             <Shield size={20} /> {t.security}
           </button>
           <button 
             onClick={() => setActiveTab('integrations')}
             className={`nav-item border-none w-full text-left bg-transparent flex gap-3 text-lg py-3 ${activeTab === 'integrations' ? 'active' : ''}`}
           >
             <HardDrive size={20} /> {t.integrations}
           </button>
        </div>

        {/* Settings Content */}
        <div className="col-span-9 flex flex-col gap-6">
          {renderContent()}

          <div className="flex justify-end gap-4 mt-2">
             <button className="button-outline px-6 py-2">{t.cancel}</button>
             <button className="button px-6 py-2">{t.saveChanges}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
