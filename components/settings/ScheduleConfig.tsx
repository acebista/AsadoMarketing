
import React, { useState, useMemo } from 'react';
import { DaySchedule, ScheduledContent, PostType } from '../../types/settings';
import { ChevronLeft, ChevronRight, Plus, X, Clock, Layout, Trash2, Calendar, MessageSquare, Image as ImageIcon } from 'lucide-react';

const ScheduleConfig: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedules, setSchedules] = useState<Record<string, DaySchedule>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay(); // 0 (Sun) to 6 (Sat)
    
    return { year, month, daysInMonth, startingDay };
  }, [currentDate]);

  const toggleMonth = (dir: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + dir, 1));
  };

  const getDayKey = (day: number) => {
    return `${monthData.year}-${String(monthData.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const handleAddContent = (dateKey: string, type: PostType) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newContent: ScheduledContent = {
      id: newId,
      type,
      time: '12:00',
      focus: 'Food Focus',
      aspectRatio: type === 'post' ? '4:5' : '9:16'
    };

    setSchedules(prev => {
      const daySchedule = prev[dateKey] || { date: dateKey, items: [] };
      return {
        ...prev,
        [dateKey]: {
          ...daySchedule,
          items: [...daySchedule.items, newContent]
        }
      };
    });
  };

  const updateContent = (dateKey: string, contentId: string, updates: Partial<ScheduledContent>) => {
    setSchedules(prev => {
      const day = prev[dateKey];
      if (!day) return prev;
      return {
        ...prev,
        [dateKey]: {
          ...day,
          items: day.items.map(item => item.id === contentId ? { ...item, ...updates } : item)
        }
      };
    });
  };

  const removeContent = (dateKey: string, contentId: string) => {
    setSchedules(prev => {
      const day = prev[dateKey];
      if (!day) return prev;
      return {
        ...prev,
        [dateKey]: {
          ...day,
          items: day.items.filter(item => item.id !== contentId)
        }
      };
    });
  };

  const daySchedule = selectedDate ? schedules[selectedDate] : null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Monthly Post Calendar</h2>
          <p className="text-slate-500 text-sm mt-1">Tap any day to customize its posting strategy.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <button onClick={() => toggleMonth(-1)} className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <span className="font-bold text-slate-700 min-w-[140px] text-center">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={() => toggleMonth(1)} className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-slate-50 p-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200">
            {day}
          </div>
        ))}
        {Array.from({ length: 42 }).map((_, i) => {
          const dayNumber = i - monthData.startingDay + 1;
          const isValidDay = dayNumber > 0 && dayNumber <= monthData.daysInMonth;
          const dateKey = isValidDay ? getDayKey(dayNumber) : null;
          const dayItems = dateKey ? schedules[dateKey]?.items || [] : [];
          const posts = dayItems.filter(item => item.type === 'post');
          const stories = dayItems.filter(item => item.type === 'story');

          return (
            <div 
              key={i} 
              onClick={() => dateKey && setSelectedDate(dateKey)}
              className={`min-h-[120px] bg-white p-2 transition-all hover:bg-indigo-50/30 cursor-pointer flex flex-col group ${!isValidDay ? 'bg-slate-50/50' : ''}`}
            >
              {isValidDay && (
                <>
                  <span className={`text-sm font-bold mb-2 ${selectedDate === dateKey ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {dayNumber}
                  </span>
                  <div className="flex flex-col gap-1 overflow-hidden">
                    {posts.length > 0 && (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 border border-indigo-100 rounded text-[10px] font-bold text-indigo-700">
                        <ImageIcon className="w-3 h-3" /> {posts.length} Posts
                      </div>
                    )}
                    {stories.length > 0 && (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-pink-50 border border-pink-100 rounded text-[10px] font-bold text-pink-700">
                        <MessageSquare className="w-3 h-3" /> {stories.length} Stories
                      </div>
                    )}
                  </div>
                  {isValidDay && dayItems.length === 0 && (
                    <div className="mt-auto flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-4 h-4 text-indigo-300" />
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Day Detail Overlay (Simple Panel) */}
      {selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-md h-full bg-white shadow-2xl animate-in slide-in-from-right flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl text-slate-800">{new Date(selectedDate).toLocaleDateString('default', { dateStyle: 'full' })}</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Daily Strategy</p>
              </div>
              <button onClick={() => setSelectedDate(null)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Controls */}
              <div className="flex gap-3">
                <button 
                  onClick={() => handleAddContent(selectedDate, 'post')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-indigo-100 shadow-lg hover:bg-indigo-700 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Post
                </button>
                <button 
                   onClick={() => handleAddContent(selectedDate, 'story')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:border-indigo-600 hover:text-indigo-600 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Story
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {(schedules[selectedDate]?.items || []).length === 0 && (
                  <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-2xl">
                    <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-medium text-sm">Nothing scheduled yet</p>
                  </div>
                )}
                
                {(schedules[selectedDate]?.items || []).map((item) => (
                  <div key={item.id} className={`p-4 rounded-2xl border-2 transition-all ${item.type === 'post' ? 'border-indigo-100 bg-indigo-50/30' : 'border-pink-100 bg-pink-50/30'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${item.type === 'post' ? 'bg-indigo-600 text-white' : 'bg-pink-600 text-white'}`}>
                          {item.type === 'post' ? <ImageIcon className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                        </div>
                        <span className="font-bold text-slate-800 uppercase text-xs tracking-widest">{item.type}</span>
                      </div>
                      <button onClick={() => removeContent(selectedDate, item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Time</label>
                        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-200">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <input 
                            type="time" 
                            value={item.time} 
                            onChange={(e) => updateContent(selectedDate, item.id, { time: e.target.value })}
                            className="bg-transparent focus:outline-none text-xs font-bold text-slate-700 w-full"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Ratio</label>
                        <select 
                          value={item.aspectRatio}
                          onChange={(e) => updateContent(selectedDate, item.id, { aspectRatio: e.target.value as any })}
                          className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="4:5">Feed (4:5)</option>
                          <option value="9:16">Story (9:16)</option>
                          <option value="1:1">Square (1:1)</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Content Focus</label>
                      <select 
                        value={item.focus}
                        onChange={(e) => updateContent(selectedDate, item.id, { focus: e.target.value as any })}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Food Focus">Food Focus</option>
                        <option value="Event/Vibe">Event/Vibe</option>
                        <option value="Promo">Promo/Offer</option>
                        <option value="Behind the scenes">Behind the scenes</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <button 
                onClick={() => setSelectedDate(null)}
                className="w-full py-4 bg-slate-800 text-white font-bold rounded-xl shadow-lg hover:bg-slate-900 transition-all"
              >
                Done Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleConfig;
