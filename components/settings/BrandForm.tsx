
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BrandProfile } from '../../types/settings';
import { Smile, Zap, Sparkles, MessageCircle, Info } from 'lucide-react';

const BrandForm: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BrandProfile>({
    defaultValues: {
      name: 'Asado Grill',
      vibe: 'friendly',
      audience: 'Families, Office workers, Late-night diners',
      hook: 'We serve hot chocolate in glass Irish mugs and our steak is aged for 45 days.'
    }
  });

  const onSubmit = (data: BrandProfile) => {
    console.log('Brand Identity Updated:', data);
    alert('Brand Identity Saved Successfully!');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Brand Identity</h2>
        <p className="text-slate-500 text-sm mt-1">Define the "soul" and "voice" of your restaurant.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Restaurant Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            placeholder="e.g., The Cozy Corner"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />
          {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">The Vibe</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'friendly', label: 'Friendly & Family', icon: Smile, color: 'text-green-600 bg-green-50' },
              { id: 'energy', label: 'High-Energy', icon: Zap, color: 'text-orange-600 bg-orange-50' },
              { id: 'classy', label: 'Classy/Minimalist', icon: Sparkles, color: 'text-indigo-600 bg-indigo-50' },
              { id: 'witty', label: 'Witty', icon: MessageCircle, color: 'text-pink-600 bg-pink-50' },
            ].map((option) => (
              <label key={option.id} className="relative flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${option.color}`}>
                    <option.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{option.label}</span>
                </div>
                <input
                  type="radio"
                  value={option.id}
                  {...register('vibe')}
                  className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                />
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Target Audience</label>
          <input
            {...register('audience')}
            placeholder="e.g., Office workers, Couples, Foodies"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <label className="block text-sm font-semibold text-slate-700">The "Hook"</label>
            <div className="group relative">
              <Info className="w-4 h-4 text-slate-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                What makes you stand out? Any quirky details or legendary dishes?
              </div>
            </div>
          </div>
          <textarea
            {...register('hook')}
            rows={4}
            placeholder="e.g., We serve the spiciest wings in the county using a secret 100-year-old recipe."
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98]"
        >
          Save Identity
        </button>
      </form>
    </div>
  );
};

export default BrandForm;
