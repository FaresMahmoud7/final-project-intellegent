import { useState } from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Leaf, Droplet, Wind, AlertTriangle, CheckCircle2, TrendingUp, Loader2, X, FileText, ListChecks } from 'lucide-react';

const yieldData = [
  { month: 'Jan', projected: 4000, actual: 4100 },
  { month: 'Feb', projected: 3000, actual: 3200 },
  { month: 'Mar', projected: 2000, actual: 2800 },
  { month: 'Apr', projected: 2780, actual: 2900 },
  { month: 'May', projected: 1890, actual: 2100 },
  { month: 'Jun', projected: 2390, actual: 2500 },
  { month: 'Jul', projected: 3490, actual: 3800 },
];

const soilData = [
  { day: 'Mon', moisture: 45, nitrogen: 60, ph: 6.5 },
  { day: 'Tue', moisture: 42, nitrogen: 58, ph: 6.4 },
  { day: 'Wed', moisture: 38, nitrogen: 55, ph: 6.5 },
  { day: 'Thu', moisture: 55, nitrogen: 65, ph: 6.6 },
  { day: 'Fri', moisture: 50, nitrogen: 62, ph: 6.6 },
  { day: 'Sat', moisture: 48, nitrogen: 60, ph: 6.5 },
  { day: 'Sun', moisture: 45, nitrogen: 58, ph: 6.5 },
];

export default function Dashboard({ t }: { t: Record<string, string> }) {
  const [generating, setGenerating] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isInterventionsOpen, setIsInterventionsOpen] = useState(false);

  const handleGenerateReport = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setIsReportOpen(true);
    }, 1200);
  };

  const alerts = [
    { id: 1, type: 'warning', message: t.pestRiskInfo || 'Pest risk detected in Sector 4 (Corn)', time: '2 hours ago' },
    { id: 2, type: 'critical', message: 'Low moisture level in Sector 2. Irrigation triggered.', time: '5 hours ago' },
    { id: 3, type: 'success', message: 'Optimal harvest window for Soybeans in 3 days.', time: '1 day ago' },
  ];

  return (
    <div className="animate-fade-in flex flex-col gap-6 relative">
      
      {/* Header section */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="mb-2">{t.farmOverview}</h1>
          <p className="text-muted">{t.realTimeInsights}</p>
        </div>
        <button onClick={handleGenerateReport} className={`button transition-transform ${generating ? 'scale-95 opacity-80' : ''}`} disabled={generating}>
          {generating ? <Loader2 size={16} className="animate-spin" /> : <TrendingUp size={16} />}
          {generating ? 'Generating...' : t.generateReport}
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="glass-panel glass-panel-interactive p-6 stat-card">
          <div>
            <p className="text-muted text-sm mb-1">{t.cropHealth}</p>
            <h2 className="text-primary text-3xl font-bold mb-2">92%</h2>
            <div className="flex items-center gap-1 text-xs text-primary">
              <TrendingUp size={12} />
              <span>{t.fromLastWeek}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill bg-primary w-92"></div>
            </div>
          </div>
          <div className="stat-icon text-primary">
            <Leaf size={24} />
          </div>
        </div>

        <div className="glass-panel glass-panel-interactive p-6 stat-card delay-100">
          <div>
            <p className="text-muted text-sm mb-1">{t.avgMoisture}</p>
            <h2 className="text-accent text-3xl font-bold mb-2">48%</h2>
            <div className="flex items-center gap-1 text-xs text-muted">
              <span>{t.optimalRange}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill bg-accent w-48"></div>
            </div>
          </div>
          <div className="stat-icon text-accent">
            <Droplet size={24} />
          </div>
        </div>

        <div className="glass-panel glass-panel-interactive p-6 stat-card delay-200">
          <div>
            <p className="text-muted text-sm mb-1">{t.activeRx}</p>
            <h2 className="text-warning text-3xl font-bold mb-2">3</h2>
            <div className="flex items-center gap-1 text-xs text-muted">
              <span>{t.sprayingIrrigation}</span>
            </div>
          </div>
          <div className="stat-icon text-warning">
            <Wind size={24} />
          </div>
        </div>

        <div className="glass-panel glass-panel-interactive p-6 stat-card delay-300">
          <div>
            <p className="text-muted text-sm mb-1">{t.estYield}</p>
            <h2 className="text-3xl font-bold mb-2">14,250</h2>
            <div className="flex items-center gap-1 text-xs text-primary">
              <TrendingUp size={12} />
              <span>{t.yieldVsSeason}</span>
            </div>
          </div>
          <div className="stat-icon text-muted">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Yield Projection Chart */}
        <div className="glass-panel p-6 col-span-8 delay-200 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg">{t.yieldChartTitle}</h3>
            <span className="badge badge-primary">{t.marketSynced}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-black/5 rounded-xl border border-border">
               <p className="text-xs text-muted mb-1">Total Projected</p>
               <h4 className="text-xl font-bold">19,550 Tons</h4>
            </div>
            <div className="p-4 bg-black/5 rounded-xl border border-border">
               <p className="text-xs text-muted mb-1">Actual to Date</p>
               <h4 className="text-xl font-bold text-primary">21,400 Tons</h4>
            </div>
            <div className="p-4 bg-black/5 rounded-xl border border-border">
               <p className="text-xs text-muted mb-1">Variance</p>
               <h4 className="text-xl font-bold text-accent">+9.46% (Above Est)</h4>
            </div>
          </div>

          <div className="h-64 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yieldData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--text-muted)" tick={{fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-muted)" tick={{fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--sidebar-bg)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text-main)' }}
                  itemStyle={{ color: 'var(--text-main)' }}
                />
                <Area type="monotone" dataKey="actual" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="projected" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorProjected)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights & Alerts */}
        <div className="glass-panel p-6 col-span-4 delay-300 flex flex-col">
          <h3 className="text-lg mb-6">{t.aiInsights}</h3>
          <div className="flex-1 flex flex-col gap-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 rounded-xl border border-border bg-black/5 hover:bg-black/10 transition cursor-pointer flex gap-3 items-start">
                {alert.type === 'warning' && <AlertTriangle className="text-warning shrink-0" size={20} />}
                {alert.type === 'critical' && <Droplet className="text-accent shrink-0" size={20} />}
                {alert.type === 'success' && <CheckCircle2 className="text-primary shrink-0" size={20} />}
                
                <div>
                  <p className="text-sm font-medium mb-1">{alert.message}</p>
                  <p className="text-xs text-muted">{alert.time}</p>
                </div>
              </div>
            ))}
            
            <button onClick={() => setIsInterventionsOpen(true)} className="button-outline mt-auto py-3 w-full justify-center">
              {t.viewAllInterventions}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Charts / Maps */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Soil Analysis */}
        <div className="glass-panel p-6 delay-300 flex flex-col">
          <h3 className="text-lg mb-6">{t.nutrientTracking}</h3>
          
          <div className="flex justify-between items-center mb-6">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-warning mb-1">62 ppm</h4>
              <p className="text-xs text-muted">Current Nitrogen</p>
            </div>
            <div className="text-center">
              <h4 className="text-2xl font-bold text-accent mb-1">45%</h4>
              <p className="text-xs text-muted">Current Moisture</p>
            </div>
            <div className="text-center">
              <h4 className="text-2xl font-bold text-primary mb-1">6.5</h4>
              <p className="text-xs text-muted">Avg Soil pH</p>
            </div>
          </div>

          <div className="h-64 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={soilData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-muted)" tick={{fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-muted)" tick={{fill: 'var(--text-muted)'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--sidebar-bg)', border: '1px solid var(--border)', borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="moisture" name="Moisture (%)" stroke="var(--accent)" strokeWidth={3} dot={{r: 4, fill: 'var(--bg-dark)'}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="nitrogen" name="Nitrogen Level" stroke="var(--warning)" strokeWidth={3} dot={{r: 4, fill: 'var(--bg-dark)'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Prescription Map Preview */}
        <div className="glass-panel p-6 delay-300 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg">{t.variableRateMap}</h3>
            <span className="badge badge-accent">Sector 4</span>
          </div>
          
          <div className="map-container flex-1 flex items-center justify-center relative">
            <div className="absolute inset-0 map-bg-primary"></div>
            <div className="absolute inset-0 map-bg-warning clip-diamond"></div>
            
            <div className="map-overlay"></div>
            
            {/* Map Markers */}
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-warning rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-pulse delay-1s"></div>
            
            <div className="relative z-10 glass-panel p-4 text-center border-border/50">
              <p className="text-sm font-semibold">{t.droneProcessed}</p>
              <p className="text-xs text-muted">{t.sprayerOptimized}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button title="Close" aria-label="Close" onClick={() => setIsReportOpen(false)} className="absolute top-4 right-4 bg-transparent border-none text-muted hover:text-white cursor-pointer transition">
               <X size={24} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <FileText size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Comprehensive Field Report</h2>
                <p className="text-sm text-muted">Generated on {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
               <div className="p-4 bg-black/10 rounded-xl border border-border">
                 <p className="text-sm text-muted mb-1">Farm Health Score</p>
                 <h3 className="text-xl font-bold text-primary">94% (Excellent)</h3>
               </div>
               <div className="p-4 bg-black/10 rounded-xl border border-border">
                 <p className="text-sm text-muted mb-1">Total Active Area</p>
                 <h3 className="text-xl font-bold">1,240 Acres</h3>
               </div>
               <div className="p-4 bg-black/10 rounded-xl border border-border">
                 <p className="text-sm text-muted mb-1">Weather Impact (Next 7 Days)</p>
                 <h3 className="text-xl font-bold text-accent">Favorable (Light Rain)</h3>
               </div>
               <div className="p-4 bg-black/10 rounded-xl border border-border">
                 <p className="text-sm text-muted mb-1">Estimated Q3 Revenue</p>
                 <h3 className="text-xl font-bold text-warning">$1.45M</h3>
               </div>
            </div>

            <h3 className="text-lg font-bold mb-4 border-b border-border pb-2">AI Summary & Recommendations</h3>
            <p className="text-sm text-muted leading-relaxed mb-4">
              The overall crop health is excellent. Sector 4 corn fields have successfully responded to the localized fungicide application, reducing the pest risk by 80%. Moisture levels across the farm are within the optimal 40-60% range due to the Variable Rate Irrigation AI adjusting the flow rate efficiently.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Recommendation: Consider delaying the soybean harvest by 3 days. Our models indicate that a brief period of warm weather upcoming will accelerate final ripening, potentially increasing total yield weight by an estimated 2-4%.
            </p>

            <div className="flex justify-end gap-3 mt-8">
               <button className="button-outline" onClick={() => setIsReportOpen(false)}>Close</button>
               <button className="button" onClick={() => { alert('Downloading PDF...'); setIsReportOpen(false); }}>Download PDF</button>
            </div>
          </div>
        </div>
      )}

      {isInterventionsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel p-8 max-w-xl w-full max-h-[80vh] overflow-y-auto relative">
            <button title="Close" aria-label="Close" onClick={() => setIsInterventionsOpen(false)} className="absolute top-4 right-4 bg-transparent border-none text-muted hover:text-white cursor-pointer transition">
               <X size={24} />
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                <ListChecks size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Intervention Log</h2>
                <p className="text-sm text-muted">All recent AI and manual actions</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-black/5 rounded-xl border border-border">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-primary">Variable Rate Irrigation Applied</h4>
                  <span className="text-xs text-muted">Today, 10:30 AM</span>
                </div>
                <p className="text-sm text-muted">Decreased flow by 15% in Sector 2 due to localized rainfall prediction.</p>
              </div>
              
              <div className="p-4 bg-black/5 rounded-xl border border-border">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-warning">Fungicide Drone Dispatched</h4>
                  <span className="text-xs text-muted">Yesterday, 04:15 PM</span>
                </div>
                <p className="text-sm text-muted">Targeted spraying in Sector 4 to neutralize detected early-stage rust.</p>
              </div>

              <div className="p-4 bg-black/5 rounded-xl border border-border">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-accent">Prescription Map Updated</h4>
                  <span className="text-xs text-muted">2 days ago, 08:00 AM</span>
                </div>
                <p className="text-sm text-muted">Nitrogen levels adjusted based on the latest drone thermal scan.</p>
              </div>
              
              <div className="p-4 bg-black/5 rounded-xl border border-border">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-primary">Harvest Date Revised</h4>
                  <span className="text-xs text-muted">3 days ago, 11:20 AM</span>
                </div>
                <p className="text-sm text-muted">AI engine delayed Soybeans harvest window by 4 days for optimal yield.</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
               <button className="button-outline w-full" onClick={() => setIsInterventionsOpen(false)}>Close Log</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
