import { useState } from 'react';
import { Droplets, Settings2, Activity, Play, Square, Wind, X, SlidersHorizontal, ShieldAlert, Cpu } from 'lucide-react';

export default function Irrigation({ t }: { t: Record<string, string> }) {
  const [runningZones, setRunningZones] = useState<number[]>([3, 6]);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const toggleZone = (zone: number) => {
    if (runningZones.includes(zone)) {
      setRunningZones(runningZones.filter(z => z !== zone));
    } else {
      setRunningZones([...runningZones, zone]);
    }
  };

  const handleSettings = () => {
    alert("Zone Settings opened.");
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6 relative">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="mb-2">{t.irrigationTitle}</h1>
          <p className="text-muted">{t.irrigationDesc}</p>
        </div>
        <button onClick={() => setIsConfigOpen(true)} className="button">
          <Settings2 size={16} />
          {t.configureSystem}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="glass-panel p-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg">Main Reservoir</h3>
            <Droplets className="text-accent" />
          </div>
          <h2 className="text-4xl font-bold text-accent mb-2">78%</h2>
          <p className="text-sm text-muted mb-4">Approx. 450,000 Gallons</p>
          <div className="progress-bar mb-2">
            <div className="progress-fill bg-accent w-80"></div>
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg">Pump Status</h3>
            <Activity className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">{runningZones.length > 0 ? `Active (${runningZones.length}/8)` : 'Idle'}</h2>
          <p className="text-sm text-muted mb-4">Flow rate: {runningZones.length * 40} GPM</p>
          <div className="flex gap-2 mt-4">
             <button onClick={() => setRunningZones([])} className="button flex-1 justify-center py-2 text-xs bg-danger-btn hover:bg-red-600 transition"><Square size={14}/> Stop All</button>
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg">Next Schedule</h3>
            <Wind className="text-warning" />
          </div>
          <h2 className="text-xl font-bold mb-2">Sector 2 - Spraying</h2>
          <p className="text-sm text-warning mb-4">In 2 hours (14:00)</p>
          <button onClick={handleSettings} className="button-outline w-full justify-center py-2 text-xs">Modify Schedule</button>
        </div>
      </div>

      <div className="glass-panel p-6 mt-2">
        <h3 className="text-lg mb-6">Zone Controls</h3>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(zone => {
            const isRunning = runningZones.includes(zone);
            return (
            <div key={zone} className={`border rounded-xl p-4 flex flex-col gap-3 transition ${isRunning ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]' : 'border-border hover:border-primary/50 bg-black/5'}`}>
               <div className="flex justify-between items-center">
                 <span className="font-semibold">Zone 0{zone}</span>
                 <span className={`badge ${isRunning ? 'badge-primary' : 'badge-muted'}`}>
                    {isRunning ? 'Watering' : 'Idle'}
                 </span>
               </div>
               <div className="flex items-center gap-2 text-sm text-muted">
                 <Droplets size={14} className={isRunning ? 'text-primary' : 'text-accent'} /> Moisture: {40 + zone * 5}%
               </div>
               <div className="mt-2 flex gap-2">
                 <button onClick={() => toggleZone(zone)} title="Toggle" aria-label="Toggle" className={`flex-1 border rounded-lg py-1.5 cursor-pointer transition flex justify-center ${isRunning ? 'bg-danger/10 border-danger text-danger hover:bg-danger/20' : 'bg-transparent border-border text-text-main hover:bg-white/5'}`}>
                    {isRunning ? <Square size={14} /> : <Play size={14} className="text-primary" />}
                 </button>
                 <button onClick={handleSettings} title="Settings" aria-label="Settings" className="flex-1 bg-transparent border border-border text-text-main rounded-lg py-1.5 cursor-pointer hover:bg-white/5 transition flex justify-center">
                    <Settings2 size={14} />
                 </button>
               </div>
            </div>
          )})}
        </div>
      </div>

      {/* System Configuration Modal */}
      {isConfigOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border-primary/20">
            <button title="Close" aria-label="Close" onClick={() => setIsConfigOpen(false)} className="absolute top-4 right-4 bg-transparent border-none text-muted hover:text-white cursor-pointer transition">
               <X size={24} />
            </button>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <SlidersHorizontal size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">System Configuration</h2>
                <p className="text-sm text-muted">Global irrigation and sprayer settings</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              
              <div className="p-5 border border-border rounded-xl bg-black/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Cpu size={18} className="text-primary" />
                    <h4 className="font-semibold text-lg">AI Auto-Pilot</h4>
                  </div>
                  <label htmlFor="aiToggle" className="relative inline-flex items-center cursor-pointer">
                    <input id="aiToggle" type="checkbox" title="AI Auto-Pilot" aria-label="AI Auto-Pilot" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <p className="text-sm text-muted">Allow the AI to automatically start and stop irrigation zones based on real-time soil moisture and weather predictions.</p>
              </div>

              <div className="p-5 border border-border rounded-xl bg-black/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={18} className="text-warning" />
                    <h4 className="font-semibold text-lg">Water Usage Limit</h4>
                  </div>
                  <span className="text-warning font-bold">45,000 Gal / Day</span>
                </div>
                <div className="w-full bg-black/30 h-2 rounded-full mb-2">
                   <div className="bg-warning h-full rounded-full w-[70%]"></div>
                </div>
                <div className="flex justify-between text-xs text-muted">
                  <span>10,000</span>
                  <span>Max: 60,000</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="form-label" htmlFor="pumpPressure">Main Pump Pressure (PSI)</label>
                   <input id="pumpPressure" type="number" className="form-input" defaultValue="65" />
                 </div>
                 <div>
                   <label className="form-label" htmlFor="fertRate">Fertilizer Injection Rate (%)</label>
                   <input id="fertRate" type="number" className="form-input" defaultValue="12" />
                 </div>
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-8">
               <button className="button-outline px-6" onClick={() => setIsConfigOpen(false)}>Discard</button>
               <button className="button px-6" onClick={() => { alert('Configuration Saved!'); setIsConfigOpen(false); }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
