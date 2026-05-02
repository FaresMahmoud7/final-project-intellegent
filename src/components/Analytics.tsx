import { useState } from 'react';
import { LineChart as ChartIcon, ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const baseMarketData = [
  { month: 'Jan', corn: 4.5, wheat: 5.8, soy: 10.2 },
  { month: 'Feb', corn: 4.6, wheat: 5.9, soy: 10.4 },
  { month: 'Mar', corn: 4.8, wheat: 6.1, soy: 10.9 },
  { month: 'Apr', corn: 5.1, wheat: 6.4, soy: 11.2 },
  { month: 'May', corn: 5.0, wheat: 6.3, soy: 11.0 },
  { month: 'Jun', corn: 5.3, wheat: 6.7, soy: 11.5 },
];

export default function Analytics({ t }: { t: Record<string, string> }) {
  const [syncing, setSyncing] = useState(false);
  const [marketData, setMarketData] = useState(baseMarketData);

  const handleSync = () => {
    setSyncing(true);
    // Simulate fetching new live data
    setTimeout(() => {
      setMarketData(marketData.map(d => ({
        month: d.month,
        corn: +(d.corn + (Math.random() * 0.2 - 0.1)).toFixed(2),
        wheat: +(d.wheat + (Math.random() * 0.2 - 0.1)).toFixed(2),
        soy: +(d.soy + (Math.random() * 0.2 - 0.1)).toFixed(2),
      })));
      setSyncing(false);
    }, 1000);
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="mb-2">{t.analyticsTitle}</h1>
          <p className="text-muted">{t.analyticsDesc}</p>
        </div>
        <button onClick={handleSync} className={`button-outline transition-transform ${syncing ? 'opacity-70' : ''}`}>
          <Globe size={16} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Syncing...' : t.syncMarketData}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="glass-panel p-6 border-b-4 border-warning">
          <p className="text-muted text-sm mb-2">Corn (Bushel)</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold">${marketData[marketData.length - 1].corn.toFixed(2)}</h2>
            <div className="flex items-center text-primary text-sm font-semibold mb-1">
              <ArrowUpRight size={16} /> 2.4%
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 border-b-4 border-accent">
          <p className="text-muted text-sm mb-2">Wheat (Bushel)</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold">${marketData[marketData.length - 1].wheat.toFixed(2)}</h2>
            <div className="flex items-center text-primary text-sm font-semibold mb-1">
              <ArrowUpRight size={16} /> 4.1%
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 border-b-4 border-primary">
          <p className="text-muted text-sm mb-2">Soybeans (Bushel)</p>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold">${marketData[marketData.length - 1].soy.toFixed(2)}</h2>
            <div className="flex items-center text-danger text-sm font-semibold mb-1">
              <ArrowDownRight size={16} /> -0.8%
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg flex items-center gap-2"><ChartIcon size={20}/> {t.priceTrends}</h3>
          <span className="badge badge-accent">6 Months</span>
        </div>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-muted)" tick={{fill: 'var(--text-muted)'}} />
              <YAxis stroke="var(--text-muted)" tick={{fill: 'var(--text-muted)'}} tickFormatter={(value) => `$${value}`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--sidebar-bg)', borderColor: 'var(--border)', borderRadius: '12px' }} />
              <Line type="monotone" dataKey="corn" name="Corn" stroke="var(--warning)" strokeWidth={3} dot={{r:4, fill:'var(--bg-dark)'}} />
              <Line type="monotone" dataKey="wheat" name="Wheat" stroke="var(--accent)" strokeWidth={3} dot={{r:4, fill:'var(--bg-dark)'}} />
              <Line type="monotone" dataKey="soy" name="Soybeans" stroke="var(--primary)" strokeWidth={3} dot={{r:4, fill:'var(--bg-dark)'}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mt-2">
         <div className="glass-panel p-6">
            <h3 className="text-lg mb-4">{t.revenueForecast}</h3>
            <p className="text-sm text-muted mb-4">{t.basedOnCurrentYield}</p>
            <h2 className="text-4xl font-bold text-primary">$1.24M</h2>
            <p className="text-sm mt-2 text-primary font-medium">+15% {t.vsLastYear}</p>
         </div>
         <div className="glass-panel p-6">
            <h3 className="text-lg mb-4">{t.aiRecommendation}</h3>
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
              <p className="text-sm leading-relaxed">
                <strong>{t.holdCornTitle}</strong><br/>
                {t.holdCornDesc}
              </p>
            </div>
         </div>
      </div>
    </div>
  );
}
