import { useState } from 'react';
import { TestTube, PlayCircle, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { hillClimbing, geneticAlgorithm } from '../lib/algorithms';

const baseGrowthData = [
  { day: 0, baseline: 0, optimized: 0 },
  { day: 20, baseline: 15, optimized: 25 },
  { day: 40, baseline: 35, optimized: 55 },
  { day: 60, baseline: 60, optimized: 85 },
  { day: 80, baseline: 80, optimized: 100 },
  { day: 100, baseline: 100, optimized: 100 },
];

export default function Simulation({ t }: { t: Record<string, string> }) {
  const [crop, setCrop] = useState('Corn');
  const [strategy, setStrategy] = useState('AI');
  const [running, setRunning] = useState(false);

  // Dynamic calculations
  const multiplier = crop === 'Corn' ? 1 : crop === 'Soybeans' ? 0.8 : 1.2;
  // Using Hill Climbing to optimize specific growth parameters
  const hillClimbResult = hillClimbing((x) => -Math.pow(x - 1.2, 2) + 1.5, 1.0);
  const hcBonus = strategy === 'AI' ? hillClimbResult.value : 1.0;

  // Using Genetic Algorithm to find the best seed/water/fertilizer mix factor
  const gaResult = geneticAlgorithm(20, 3, (genes) => {
    const [seed, water, fertilizer] = genes;
    return seed * 0.4 + water * 0.3 + fertilizer * 0.3; // Simple fitness function
  });
  const gaBonus = strategy === 'AI' ? gaResult.score * 0.5 + 1 : 1.0;

  const optMultiplier = strategy === 'AI' ? (1.1 * hcBonus * gaBonus) : strategy === 'Fixed' ? 1.05 : 0.9;
  
  const growthData = baseGrowthData.map(d => ({
    day: d.day,
    baseline: Math.min(100, Math.round(d.baseline * multiplier)),
    optimized: Math.min(100, Math.round(d.optimized * multiplier * optMultiplier)),
  }));

  const estYieldBonus = strategy === 'AI' ? (14.5 * multiplier * hcBonus).toFixed(1) : (4.2 * multiplier).toFixed(1);
  const waterSaved = strategy === 'AI' ? (2.1 * multiplier * gaBonus).toFixed(1) : (0.5 * multiplier).toFixed(1);

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 800);
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="mb-2">{t.simulationTitle}</h1>
          <p className="text-muted">{t.simulationDesc}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="glass-panel p-6 col-span-4 flex flex-col gap-5">
          <h3 className="text-lg flex items-center gap-2"><TestTube size={20}/> {t.parameters}</h3>
          
          <div>
            <label className="form-label">{t.cropType}</label>
            <select title="Crop Type" aria-label="Crop Type" className="form-input" value={crop} onChange={e => setCrop(e.target.value)}>
              <option value="Corn">Corn (Maize)</option>
              <option value="Soybeans">Soybeans</option>
              <option value="Wheat">Wheat</option>
            </select>
          </div>

          <div>
            <label className="form-label">{t.seedVariety}</label>
            <select title="Seed Variety" aria-label="Seed Variety" className="form-input">
              <option>Drought Resistant (DKC-50)</option>
              <option>High Yield (HY-22)</option>
            </select>
          </div>

          <div>
            <label className="form-label" htmlFor="spacing">{t.spacing}</label>
            <input id="spacing" type="text" className="form-input" defaultValue="15 inches" />
          </div>

          <div>
            <label className="form-label">{t.irrigationStrategy}</label>
            <select title="Irrigation Strategy" aria-label="Irrigation Strategy" className="form-input" value={strategy} onChange={e => setStrategy(e.target.value)}>
              <option value="AI">AI Variable Rate (Recommended)</option>
              <option value="Fixed">Fixed Daily</option>
              <option value="Manual">Manual Trigger</option>
            </select>
          </div>

          <button onClick={handleRun} className={`button mt-auto py-3 justify-center text-lg transition-transform ${running ? 'scale-95' : ''}`}>
            <PlayCircle size={20} className={running ? "animate-spin" : ""} />
            {running ? 'Running...' : t.runSimulation}
          </button>
        </div>

        <div className="col-span-8 flex flex-col gap-6">
          <div className="glass-panel p-6 flex-1 flex flex-col">
            <h3 className="text-lg mb-6 flex items-center gap-2"><BarChart2 size={20}/> {t.growthPrediction}</h3>
            <div className="flex-1 w-full min-h-300">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--text-muted)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--text-muted)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--text-muted)" tick={{fill: 'var(--text-muted)'}} />
                  <YAxis stroke="var(--text-muted)" tick={{fill: 'var(--text-muted)'}} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--border)', borderRadius: '12px', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }} />
                  <Area type="monotone" dataKey="baseline" stroke="var(--text-muted)" strokeWidth={2} fillOpacity={1} fill="url(#colorBase)" name="Standard Timeline" />
                  <Area type="monotone" dataKey="optimized" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorOpt)" name="Optimized (AI)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="glass-panel p-5">
               <p className="text-muted text-sm mb-1">{t.estYield}</p>
               <h3 className="text-2xl font-bold text-primary mb-1">+{estYieldBonus}%</h3>
               <p className="text-xs text-muted">{t.comparedToStandard}</p>
             </div>
             <div className="glass-panel p-5">
               <p className="text-muted text-sm mb-1">{t.waterSaved}</p>
               <h3 className="text-2xl font-bold text-accent mb-1">{waterSaved}M Gal</h3>
               <p className="text-xs text-muted">{t.usingVariableRate}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
