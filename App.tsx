
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import SettingsPage from './app/settings/page';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Routes>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/settings" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
