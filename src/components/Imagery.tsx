import { useState } from 'react';
import { Crosshair, Layers, Download, CheckCircle2, Navigation, FileImage, Loader2, ThermometerSun, Leaf, AlertTriangle } from 'lucide-react';

export default function Imagery({ t }: { t: Record<string, string> }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);
  const [activeLayer, setActiveLayer] = useState<'ndvi' | 'thermal' | 'rgb'>('ndvi');

  const handleActionClick = () => {
    setIsModalOpen(true);
    setActionSuccess(false);
  };

  const handleConfirmAction = () => {
    setActionSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <div className="animate-fade-in flex flex-col gap-6 relative h-full">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="mb-2">{t.imageryTitle}</h1>
          <p className="text-muted">{t.imageryDesc}</p>
        </div>
        <div className="flex gap-3">
          <button className="button-outline">
            <Layers size={16} />
            {t.layerFilters}
          </button>
          <button className="button">
            <Crosshair size={16} />
            {t.requestDrone}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-[600px]">
        {/* Main Map Area */}
        <div className="glass-panel p-6 col-span-8 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg">{t.highResMap}</h3>
            
            {/* Layer Toggles */}
            <div className="flex bg-black/10 rounded-xl p-1 border border-border">
              <button 
                onClick={() => setActiveLayer('ndvi')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border-none cursor-pointer transition text-sm ${activeLayer === 'ndvi' ? 'bg-primary text-white shadow-sm font-semibold' : 'bg-transparent text-muted hover:text-white'}`}
              >
                <Leaf size={14} /> NDVI
              </button>
              <button 
                onClick={() => setActiveLayer('thermal')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border-none cursor-pointer transition text-sm ${activeLayer === 'thermal' ? 'bg-warning text-white shadow-sm font-semibold' : 'bg-transparent text-muted hover:text-white'}`}
              >
                <ThermometerSun size={14} /> Thermal
              </button>
              <button 
                onClick={() => setActiveLayer('rgb')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg border-none cursor-pointer transition text-sm ${activeLayer === 'rgb' ? 'bg-accent text-white shadow-sm font-semibold' : 'bg-transparent text-muted hover:text-white'}`}
              >
                <FileImage size={14} /> RGB
              </button>
            </div>
          </div>
          
          <div className="map-container flex-1 border border-border/50 rounded-2xl relative overflow-hidden bg-black/20">
            {/* Dynamic Background based on layer */}
            <div className={`absolute inset-0 transition-opacity duration-700 ${activeLayer === 'ndvi' ? 'opacity-100' : 'opacity-0'}`}>
               <div className="absolute inset-0 map-bg-primary"></div>
               <div className="absolute inset-0 map-bg-warning clip-diamond opacity-60"></div>
            </div>
            
            <div className={`absolute inset-0 transition-opacity duration-700 ${activeLayer === 'thermal' ? 'opacity-100' : 'opacity-0'}`}>
               <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-orange-500/20 to-blue-500/20"></div>
            </div>
            
            <div className={`absolute inset-0 transition-opacity duration-700 ${activeLayer === 'rgb' ? 'opacity-100' : 'opacity-0'}`}>
               <div className="absolute inset-0 bg-[#3f4e2e]/30"></div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgNDAgTCA0MCAwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] pointer-events-none opacity-50"></div>
            
            <div className="map-overlay"></div>
            
            {/* Anomaly Marker */}
            <div className="absolute top-[35%] left-[45%] w-8 h-8 bg-danger/20 rounded-full flex items-center justify-center animate-pulse z-10">
              <div className="w-3 h-3 bg-danger rounded-full shadow-[0_0_15px_rgba(239,68,68,1)]"></div>
            </div>

            {/* Anomaly Floating Card */}
            <div className="absolute top-[42%] left-[45%] glass-panel p-5 z-20 border-danger/40 shadow-2xl backdrop-blur-xl transform -translate-x-1/2 min-w-[280px]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-danger">
                  <span className="w-2.5 h-2.5 bg-danger rounded-full animate-ping"></span>
                  <span className="font-bold text-sm tracking-wide">{t.anomalyDetected}</span>
                </div>
                <span className="badge badge-danger text-[10px] px-2 py-0.5">High Risk</span>
              </div>
              
              <div className="p-3 bg-black/20 rounded-lg mb-4 border border-border/30">
                 <p className="text-sm text-muted leading-relaxed m-0">{t.pestRiskInfo}</p>
              </div>
              
              <button onClick={handleActionClick} className="button text-sm py-2 px-4 w-full justify-center bg-danger hover:bg-red-600 border-none shadow-[0_4px_12px_rgba(239,68,68,0.3)] transition-transform hover:-translate-y-0.5">
                {t.takeAction}
              </button>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-6 left-6 glass-panel p-3 flex gap-4 text-xs font-medium border-border/40 z-10">
               <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-primary/60"></span> Healthy</div>
               <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-warning/60"></span> Monitor</div>
               <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-danger/60"></span> Risk</div>
            </div>
          </div>
        </div>

        {/* Sidebar: Recent Scans */}
        <div className="glass-panel p-6 col-span-4 flex flex-col max-h-full overflow-hidden">
          <h3 className="text-lg mb-6 flex items-center gap-2">
             <Layers size={20} className="text-primary"/> {t.recentScans}
          </h3>
          <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
            
            {/* Active Processing Scan */}
            <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 cursor-wait flex gap-4 items-center">
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/20">
                 <Loader2 size={24} className="text-primary animate-spin" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold mb-1 text-primary">Sector 6 - Processing...</h4>
                <p className="text-xs text-primary/70 mb-2">Analyzing thermal imagery</p>
                <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-primary h-full w-2/3 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Completed Scans */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="p-4 rounded-xl border border-border bg-black/10 hover:bg-black/20 hover:border-primary/40 transition-all cursor-pointer flex gap-4 items-center group">
                <div className="w-16 h-16 rounded-xl bg-black/30 flex items-center justify-center shrink-0 border border-border group-hover:border-primary/30 transition-colors">
                   <FileImage size={24} className="text-muted group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">Sector {item + 1} - Corn</h4>
                  <p className="text-xs text-muted mb-2 flex items-center gap-1">Today, 08:{item}0 AM</p>
                  <div className="flex gap-2">
                    <span className="badge badge-primary badge-mini">RGB</span>
                    {item % 2 === 0 && <span className="badge badge-warning badge-mini">Thermal</span>}
                  </div>
                </div>
                <button title="Download" aria-label="Download" className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-white hover:bg-primary transition border-none cursor-pointer bg-black/20">
                  <Download size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="glass-panel p-8 max-w-md w-full shadow-2xl relative border-primary/20">
            {!actionSuccess ? (
              <>
                <div className="flex items-center gap-3 mb-2 text-danger">
                  <AlertTriangle size={24} />
                  <h2 className="text-xl font-bold text-white">Resolve Anomaly</h2>
                </div>
                <p className="text-muted mb-8 text-sm">Choose an automated response to neutralize the detected pest risk in Sector 4.</p>
                
                <div className="flex flex-col gap-4 mb-8">
                  <button onClick={handleConfirmAction} className="button-outline w-full justify-start py-4 px-5 border-border hover:border-primary hover:bg-primary/5 transition-all text-left flex gap-4 items-center group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Navigation size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1 text-white">Dispatch Spray Drone</h4>
                      <p className="text-xs text-muted m-0">Localized precision spraying</p>
                    </div>
                  </button>
                  
                  <button onClick={handleConfirmAction} className="button-outline w-full justify-start py-4 px-5 border-border hover:border-warning hover:bg-warning/5 transition-all text-left flex gap-4 items-center group">
                    <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center group-hover:bg-warning/20 transition-colors">
                      <Crosshair size={20} className="text-warning" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1 text-white">Variable Rate Prescription</h4>
                      <p className="text-xs text-muted m-0">Update tractor Rx map</p>
                    </div>
                  </button>
                </div>

                <div className="flex justify-end">
                  <button onClick={() => setIsModalOpen(false)} className="button-outline px-6 py-2 hover:bg-white/5 border-transparent">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Action Dispatched!</h2>
                <p className="text-muted text-sm max-w-[250px] mx-auto leading-relaxed">
                  The automated system is now executing your command in Sector 4.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
