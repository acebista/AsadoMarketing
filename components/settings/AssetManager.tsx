
import React, { useState, useRef } from 'react';
import { Upload, Trash2, FileText, Camera, Utensils, TreePine, Plus, Store, X, Maximize2, Zap, CheckCircle2 } from 'lucide-react';
import { AssetLibrary, MenuItemMapping } from '../../types/settings';

const AssetManager: React.FC = () => {
  const [assets, setAssets] = useState<AssetLibrary>({
    logoUrl: 'https://picsum.photos/200/200?random=1',
    menuUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop',
    menuItems: [
      { id: '1', name: 'Signature Ribeye Steak', photoUrl: 'https://picsum.photos/400/400?random=10' },
      { id: '2', name: 'Classic Caesar Salad', photoUrl: null },
      { id: '3', name: 'Truffle Mac & Cheese', photoUrl: null },
      { id: '4', name: 'Grilled Asparagus', photoUrl: null },
    ],
    photos: {
      garden: ['https://picsum.photos/400/300?random=2'],
      hall: [],
      kitchen: [],
      exterior: []
    }
  });

  const [uploading, setUploading] = useState<string | null>(null);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeMatchingId, setActiveMatchingId] = useState<string | null>(null);

  const mockUpload = (zone: string, extraData?: any) => {
    setUploading(zone + (extraData?.itemId || ''));
    setTimeout(() => {
      const mockUrl = `https://picsum.photos/600/600?random=${Math.floor(Math.random() * 1000)}`;
      
      setAssets(prev => {
        if (zone === 'logo') return { ...prev, logoUrl: mockUrl };
        if (zone === 'menu') return { ...prev, menuUrl: mockUrl };
        if (zone === 'menuItemPhoto') {
          return {
            ...prev,
            menuItems: prev.menuItems.map(item => 
              item.id === extraData.itemId ? { ...item, photoUrl: mockUrl } : item
            )
          };
        }
        
        const photoKey = zone as keyof AssetLibrary['photos'];
        if (prev.photos[photoKey]) {
          return {
            ...prev,
            photos: {
              ...prev.photos,
              [photoKey]: [...prev.photos[photoKey], mockUrl]
            }
          };
        }
        return prev;
      });
      setUploading(null);
    }, 800);
  };

  const addMenuItem = () => {
    const newItem: MenuItemMapping = {
      id: Date.now().toString(),
      name: '',
      photoUrl: null
    };
    setAssets(prev => ({ ...prev, menuItems: [...prev.menuItems, newItem] }));
  };

  const updateMenuItemName = (id: string, name: string) => {
    setAssets(prev => ({
      ...prev,
      menuItems: prev.menuItems.map(item => item.id === id ? { ...item, name } : item)
    }));
  };

  const removeMenuItem = (id: string) => {
    setAssets(prev => ({
      ...prev,
      menuItems: prev.menuItems.filter(item => item.id !== id)
    }));
  };

  const ZoneHeader = ({ title, icon: Icon, action }: { title: string, icon: any, action?: React.ReactNode }) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Icon className="w-4 h-4 text-indigo-600" />
        </div>
        <h3 className="font-semibold text-slate-800">{title}</h3>
      </div>
      {action}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Asset Vault</h2>
          <p className="text-slate-500 text-sm mt-1">Manage brand identity assets and menu associations.</p>
        </div>
        <button 
          onClick={() => setIsBulkMode(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-indigo-100 shadow-xl hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95"
        >
          <Zap className="w-4 h-4" /> Bulk Match Items
        </button>
      </div>

      {/* Top Assets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <ZoneHeader title="Brand Logo" icon={Camera} />
          <div className="relative group w-40 h-40 mx-auto">
            {assets.logoUrl ? (
              <>
                <img src={assets.logoUrl} className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-white" alt="Logo" />
                <button 
                  onClick={() => setAssets(p => ({ ...p, logoUrl: null }))}
                  className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-8 h-8 text-white" />
                </button>
              </>
            ) : (
              <button onClick={() => mockUpload('logo')} className="w-40 h-40 rounded-full border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-all">
                <Upload className={`w-8 h-8 mb-2 ${uploading === 'logo' ? 'animate-bounce' : ''}`} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Logo</span>
              </button>
            )}
          </div>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <ZoneHeader title="Digital Menu" icon={FileText} />
          <div className="h-40 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden relative group">
            {assets.menuUrl ? (
              <>
                <img src={assets.menuUrl} className="w-full h-full object-cover" alt="Menu" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                   <button onClick={() => setIsBulkMode(true)} className="p-2 bg-white rounded-lg text-slate-800 shadow-lg hover:scale-110 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                   </button>
                   <button onClick={() => setAssets(p => ({ ...p, menuUrl: null }))} className="p-2 bg-white rounded-lg text-red-500 shadow-lg hover:scale-110 transition-transform">
                      <Trash2 className="w-5 h-5" />
                   </button>
                </div>
              </>
            ) : (
              <button onClick={() => mockUpload('menu')} className="w-full h-full flex flex-col items-center justify-center text-slate-400 hover:text-indigo-500 transition-all">
                <Upload className="w-8 h-8 mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Upload Digital Menu</span>
              </button>
            )}
          </div>
        </section>
      </div>

      {/* Basic Menu List (Visible when not in bulk mode) */}
      <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <ZoneHeader 
          title="Menu Item Photos" 
          icon={Utensils} 
          action={
            <button onClick={addMenuItem} className="flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-800">
              <Plus className="w-4 h-4" /> Add Item
            </button>
          } 
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.menuItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl group">
              <div className="w-16 h-16 rounded-lg bg-white shadow-sm border border-slate-200 overflow-hidden relative flex-shrink-0">
                {item.photoUrl ? (
                  <>
                    <img src={item.photoUrl} className="w-full h-full object-cover" alt={item.name} />
                    <button 
                      onClick={() => updateMenuItemName(item.id, '') /* Quick delete simulation */}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </>
                ) : (
                  <button onClick={() => mockUpload('menuItemPhoto', { itemId: item.id })} className="w-full h-full flex items-center justify-center text-slate-300 hover:text-indigo-500">
                    <Camera className="w-6 h-6" />
                  </button>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <input 
                  type="text" 
                  value={item.name}
                  onChange={(e) => updateMenuItemName(item.id, e.target.value)}
                  className="w-full bg-transparent border-none text-sm font-bold text-slate-800 focus:ring-0 p-0"
                  placeholder="Item name..."
                />
                <p className="text-[10px] text-slate-400 font-bold uppercase">{item.photoUrl ? 'Matched' : 'Missing Photo'}</p>
              </div>
              <button onClick={() => removeMenuItem(item.id)} className="text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Bulk Matcher Overlay */}
      {isBulkMode && (
        <div className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-md flex flex-col animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:px-8 border-b border-white/10 text-white">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Bulk Menu Item Matcher</h2>
                <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Refer to menu on left • Snap photos on right</p>
              </div>
            </div>
            <button 
              onClick={() => setIsBulkMode(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left: Digital Menu Display */}
            <div className="flex-[1.2] border-r border-white/10 bg-black/20 flex flex-col p-4 overflow-hidden">
               <div className="flex items-center justify-between mb-4 px-2">
                 <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Digital Menu Reference</span>
                 <div className="flex gap-2">
                    <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Zoom +</button>
                    <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Zoom -</button>
                 </div>
               </div>
               <div className="flex-1 rounded-2xl overflow-hidden border border-white/5 bg-slate-900 shadow-2xl relative">
                  {assets.menuUrl ? (
                    <div className="w-full h-full overflow-auto custom-scrollbar">
                      <img src={assets.menuUrl} className="w-full h-auto min-h-full object-contain" alt="Menu Reference" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-white/20">
                      <FileText className="w-16 h-16 mb-4" />
                      <p className="text-sm font-bold">No Menu Uploaded</p>
                      <button onClick={() => mockUpload('menu')} className="mt-4 px-4 py-2 bg-white/10 rounded-lg text-white text-xs font-bold hover:bg-white/20 transition-colors">Upload Now</button>
                    </div>
                  )}
               </div>
            </div>

            {/* Right: Item Matching List */}
            <div className="flex-1 bg-slate-900/50 flex flex-col p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-indigo-400" />
                  Your Dishes ({assets.menuItems.length})
                </h3>
                <button 
                  onClick={addMenuItem}
                  className="px-3 py-1.5 bg-white/10 rounded-lg text-white text-xs font-bold hover:bg-white/20 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {assets.menuItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`flex items-center gap-4 p-3 rounded-2xl border transition-all ${
                      activeMatchingId === item.id 
                        ? 'bg-indigo-600/20 border-indigo-500 shadow-indigo-500/10' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0 group">
                      {item.photoUrl ? (
                        <>
                          <img src={item.photoUrl} className="w-full h-full object-cover" alt={item.name} />
                          <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                             <CheckCircle2 className="w-6 h-6 text-white" />
                          </div>
                          <button 
                            onClick={() => updateMenuItemName(item.id, '') /* Reset photo in bulk view */}
                            className="absolute top-1 right-1 p-1 bg-black/60 rounded-md text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full gap-1">
                          {uploading === `menuItemPhoto${item.id}` ? (
                            <Zap className="w-5 h-5 text-indigo-400 animate-pulse" />
                          ) : (
                            <>
                              <button 
                                onClick={() => {
                                  setActiveMatchingId(item.id);
                                  mockUpload('menuItemPhoto', { itemId: item.id });
                                }}
                                className="w-full h-1/2 flex items-center justify-center hover:bg-indigo-500 transition-colors text-white/40 hover:text-white"
                                title="Snap Photo"
                              >
                                <Camera className="w-5 h-5" />
                              </button>
                              <div className="w-full h-[1px] bg-white/10" />
                              <button 
                                onClick={() => {
                                  setActiveMatchingId(item.id);
                                  mockUpload('menuItemPhoto', { itemId: item.id });
                                }}
                                className="w-full h-1/2 flex items-center justify-center hover:bg-indigo-500 transition-colors text-white/40 hover:text-white"
                                title="Upload File"
                              >
                                <Upload className="w-5 h-5" />
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <input 
                        type="text" 
                        value={item.name}
                        onChange={(e) => updateMenuItemName(item.id, e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-white font-bold text-sm focus:ring-0 placeholder:text-white/20"
                        placeholder="Item name from menu..."
                        onFocus={() => setActiveMatchingId(item.id)}
                      />
                      <div className="flex items-center gap-2 mt-1">
                         <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${item.photoUrl ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                           {item.photoUrl ? 'Ready' : 'Incomplete'}
                         </span>
                         <span className="text-[9px] text-white/30 font-medium">Auto-generated prompt focus</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => removeMenuItem(item.id)}
                      className="p-2 text-white/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button 
                  onClick={addMenuItem}
                  className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-white/20 hover:text-indigo-400 hover:border-indigo-400/50 hover:bg-indigo-500/5 transition-all"
                >
                  <Plus className="w-6 h-6 mb-1" />
                  <span className="text-xs font-bold uppercase tracking-widest">New Menu Item</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                 <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                   Progress: {assets.menuItems.filter(i => i.photoUrl).length}/{assets.menuItems.length} Matched
                 </div>
                 <button 
                  onClick={() => setIsBulkMode(false)}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-xl hover:bg-indigo-700 transition-all active:scale-95"
                 >
                   Save All Matches
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exterior & Others */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { key: 'garden', label: 'Garden/Patio', icon: TreePine },
          { key: 'hall', label: 'Inside/Hall', icon: Store },
          { key: 'kitchen', icon: Utensils, label: 'Kitchen' },
          { key: 'exterior', label: 'Exterior', icon: Camera }
        ].map((loc) => (
          <section key={loc.key}>
            <ZoneHeader title={loc.label} icon={loc.icon} />
            <div className="grid grid-cols-2 gap-2 min-h-[160px]">
              {assets.photos[loc.key as keyof AssetLibrary['photos']].map((url, i) => (
                <div key={i} className="relative aspect-square group rounded-lg overflow-hidden border border-slate-200">
                  <img src={url} className="w-full h-full object-cover" alt={loc.label} />
                  <button 
                    onClick={() => setAssets(prev => ({
                      ...prev,
                      photos: { ...prev.photos, [loc.key]: prev.photos[loc.key as keyof AssetLibrary['photos']].filter((_, idx) => idx !== i) }
                    }))}
                    className="absolute top-1 right-1 bg-white/90 p-1.5 rounded-full shadow-sm text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button onClick={() => mockUpload(loc.key)} className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-slate-200 rounded-lg hover:border-indigo-300 text-slate-400">
                <Upload className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-bold uppercase">{uploading === loc.key ? '...' : 'Add'}</span>
              </button>
            </div>
          </section>
        ))}
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default AssetManager;
