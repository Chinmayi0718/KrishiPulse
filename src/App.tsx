import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CropVisionPage } from './pages/CropVisionPage';
import { PulseWaterPage } from './pages/PulseWaterPage';
import { AssistantPage } from './pages/AssistantPage';
import { WeatherPage } from './pages/WeatherPage';
import { MyCropsPage } from './pages/MyCropsPage';
import { ProfilePage } from './pages/ProfilePage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Farmer Portal Application Routes with Layout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/cropvision" element={<CropVisionPage />} />
            <Route path="/pulsewater" element={<PulseWaterPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/crops" element={<MyCropsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
