
import React, { useState } from 'react';
import BrandForm from '../../components/settings/BrandForm';
import AssetManager from '../../components/settings/AssetManager';
import ScheduleConfig from '../../components/settings/ScheduleConfig';
import { User, Image, Calendar, Settings as SettingsIcon, ChevronRight } from 'lucide-react';

type Tab = 'brand' | 'assets' | 'schedule';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('brand');

  const tabs = [
    { id: 'brand', label: 'Brand Identity', icon: User, description: 'The soul & voice' },
    { id: 'assets', label: 'Asset Vault', icon: Image, description: 'Media & visuals' },
    { id: 'schedule', label: 'Post Schedule', icon: Calendar, description: 'Timing & rhythm' }
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Nav (Desktop) */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-indigo-200 shadow-lg">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Asado OS</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Marketing Hub</p>
          </div>
        </div>

        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`w-full flex items-center justify-between group p-3 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <div className="text-left">
                  <p className="text-sm font-semibold">{tab.label}</p>
                  <p className="text-[10px] opacity-70 font-medium">{tab.description}</p>
                </div>
              </div>
              {activeTab === tab.id && <ChevronRight className="w-4 h-4 text-indigo-300" />}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
           <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
             <div className="flex items-center gap-3 mb-2">
               <div className="w-8 h-8 rounded-full bg-slate-200" />
               <div className="text-xs">
                 <p className="font-bold text-slate-700">The Steakhouse</p>
                 <p className="text-slate-400">Owner Account</p>
               </div>
             </div>
             <button className="w-full text-[11px] font-bold text-slate-500 hover:text-indigo-600 text-left transition-colors">Sign Out</button>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-slate-50 overflow-y-auto">
        {/* Mobile Header / Tab Bar */}
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-slate-200 p-4">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                 <span className="text-white font-bold">A</span>
               </div>
               <span className="font-bold text-sm">Asado OS</span>
             </div>
             <SettingsIcon className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
             {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-xs font-bold border transition-all ${
                    activeTab === tab.id 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                      : 'bg-white text-slate-500 border-slate-200'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
             ))}
          </div>
        </header>

        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
          {/* Section Breadcrumbs (Desktop only) */}
          <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">
            <span>Settings</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-800">
              {tabs.find(t => t.id === activeTab)?.label}
            </span>
          </div>

          {/* Render Tab Content */}
          <div className="animate-in fade-in duration-500">
            {activeTab === 'brand' && <BrandForm />}
            {activeTab === 'assets' && <AssetManager />}
            {activeTab === 'schedule' && <ScheduleConfig />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
