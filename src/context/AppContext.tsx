import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Crop,
  FarmerProfile,
  IrrigationZone,
  WeatherCondition,
  SchemeApplication,
  ApplicationStatus,
} from '../types';
import { storageService } from '../services/storage';
import { MOCK_WEATHER } from '../data/mockData';
import { fetchLiveWeather } from '../services/weatherService';

interface AppContextType {
  crops: Crop[];
  profile: FarmerProfile;
  zones: IrrigationZone[];
  weather: WeatherCondition;
  language: 'en' | 'kn' | 'hi';
  savedSchemeIds: string[];
  applications: SchemeApplication[];
  readUpdateIds: string[];
  isSimulatedSensorMode: boolean;
  isLoadingWeather: boolean;

  // Actions
  addCrop: (crop: Omit<Crop, 'id'>) => Crop;
  updateCrop: (id: string, crop: Partial<Crop>) => void;
  deleteCrop: (id: string) => boolean;
  updateProfile: (profile: FarmerProfile) => void;
  toggleValve: (zoneId: string) => void;
  triggerIrrigation: (zoneId: string, durationMinutes: number) => void;
  setLanguage: (lang: 'en' | 'kn' | 'hi') => void;
  toggleSaveScheme: (schemeId: string) => void;
  addApplication: (app: Omit<SchemeApplication, 'id'>) => SchemeApplication;
  updateApplicationStatus: (id: string, status: ApplicationStatus, note?: string) => void;
  markUpdateRead: (updateId: string) => void;
  toggleSimulatedSensorMode: () => void;
  refreshWeather: () => Promise<void>;
  resetDemoData: () => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [profile, setProfile] = useState<FarmerProfile>(storageService.getProfile());
  const [zones, setZones] = useState<IrrigationZone[]>([]);
  const [weather, setWeather] = useState<WeatherCondition>(MOCK_WEATHER);
  const [language, setLangState] = useState<'en' | 'kn' | 'hi'>(storageService.getLanguage());
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(storageService.getSavedSchemeIds());
  const [applications, setApplications] = useState<SchemeApplication[]>(storageService.getApplications());
  const [readUpdateIds, setReadUpdateIds] = useState<string[]>(storageService.getReadUpdateIds());
  const [isSimulatedSensorMode, setSimMode] = useState<boolean>(storageService.getSimulatedSensorMode());
  const [isLoadingWeather, setIsLoadingWeather] = useState<boolean>(false);

  const refreshData = useCallback(() => {
    setCrops(storageService.getCrops());
    setProfile(storageService.getProfile());
    setZones(storageService.getIrrigationZones());
    setSavedSchemeIds(storageService.getSavedSchemeIds());
    setApplications(storageService.getApplications());
    setReadUpdateIds(storageService.getReadUpdateIds());
    setSimMode(storageService.getSimulatedSensorMode());
    setLangState(storageService.getLanguage());
  }, []);

  const refreshWeather = useCallback(async () => {
    setIsLoadingWeather(true);
    try {
      const currentProfile = storageService.getProfile();
      const lat = currentProfile.latitude || 12.5842;
      const lon = currentProfile.longitude || 77.0427;
      const live = await fetchLiveWeather(lat, lon);
      setWeather(live);
    } catch (err) {
      console.warn('Weather fetch fallback to mock', err);
    } finally {
      setIsLoadingWeather(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
    refreshWeather();
  }, [refreshData, refreshWeather]);

  // Live telemetry pulse when in simulated sensor mode
  useEffect(() => {
    if (!isSimulatedSensorMode) return;

    const interval = setInterval(() => {
      setZones((prevZones) =>
        prevZones.map((z) => {
          // slight realistic sensor jitter ± 0.4%
          const delta = (Math.random() - 0.5) * 0.8;
          const nextMoisture = Math.min(95, Math.max(15, Number((z.currentMoisture + delta).toFixed(1))));
          return {
            ...z,
            currentMoisture: nextMoisture,
            status:
              nextMoisture < z.targetMoisture - 15
                ? 'Critical Low'
                : nextMoisture < z.targetMoisture
                ? 'Irrigation Needed'
                : nextMoisture > z.targetMoisture + 20
                ? 'Over-watered'
                : 'Adequate',
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isSimulatedSensorMode]);

  const handleAddCrop = (newCropData: Omit<Crop, 'id'>): Crop => {
    const created = storageService.addCrop(newCropData);
    setCrops(storageService.getCrops());
    return created;
  };

  const handleUpdateCrop = (id: string, fields: Partial<Crop>) => {
    storageService.updateCrop(id, fields);
    setCrops(storageService.getCrops());
  };

  const handleDeleteCrop = (id: string): boolean => {
    const success = storageService.deleteCrop(id);
    if (success) {
      setCrops(storageService.getCrops());
    }
    return success;
  };

  const handleUpdateProfile = (newProfile: FarmerProfile) => {
    storageService.saveProfile(newProfile);
    setProfile(newProfile);
    if (newProfile.preferredLanguage !== language) {
      storageService.setLanguage(newProfile.preferredLanguage);
      setLangState(newProfile.preferredLanguage);
    }
    // Auto-update weather if lat/lon changed
    refreshWeather();
  };

  const handleSetLanguage = (lang: 'en' | 'kn' | 'hi') => {
    storageService.setLanguage(lang);
    setLangState(lang);
    const updatedProfile = { ...profile, preferredLanguage: lang };
    storageService.saveProfile(updatedProfile);
    setProfile(updatedProfile);
  };

  const handleToggleValve = (zoneId: string) => {
    const updated = storageService.toggleZoneValve(zoneId);
    setZones(updated);
  };

  const handleTriggerIrrigation = (zoneId: string, durationMinutes: number) => {
    setZones((prev) =>
      prev.map((z) => {
        if (z.id === zoneId) {
          return {
            ...z,
            valveStatus: 'Open',
            lastWatered: `Flowing (${durationMinutes} min timer set)`,
            currentMoisture: Math.min(88, z.currentMoisture + 12),
            status: 'Adequate',
          };
        }
        return z;
      })
    );
  };

  const handleToggleSaveScheme = (schemeId: string) => {
    const updated = storageService.toggleSaveScheme(schemeId);
    setSavedSchemeIds(updated);
  };

  const handleAddApplication = (app: Omit<SchemeApplication, 'id'>): SchemeApplication => {
    const created = storageService.addApplication(app);
    setApplications(storageService.getApplications());
    return created;
  };

  const handleUpdateApplicationStatus = (id: string, status: ApplicationStatus, note?: string) => {
    storageService.updateApplicationStatus(id, status, note);
    setApplications(storageService.getApplications());
  };

  const handleMarkUpdateRead = (updateId: string) => {
    const updated = storageService.markUpdateRead(updateId);
    setReadUpdateIds(updated);
  };

  const handleToggleSimulatedSensorMode = () => {
    const next = !isSimulatedSensorMode;
    storageService.setSimulatedSensorMode(next);
    setSimMode(next);
  };

  const handleResetDemoData = () => {
    storageService.resetAllToDemoData();
    refreshData();
    refreshWeather();
  };

  return (
    <AppContext.Provider
      value={{
        crops,
        profile,
        zones,
        weather,
        language,
        savedSchemeIds,
        applications,
        readUpdateIds,
        isSimulatedSensorMode,
        isLoadingWeather,
        addCrop: handleAddCrop,
        updateCrop: handleUpdateCrop,
        deleteCrop: handleDeleteCrop,
        updateProfile: handleUpdateProfile,
        toggleValve: handleToggleValve,
        triggerIrrigation: handleTriggerIrrigation,
        setLanguage: handleSetLanguage,
        toggleSaveScheme: handleToggleSaveScheme,
        addApplication: handleAddApplication,
        updateApplicationStatus: handleUpdateApplicationStatus,
        markUpdateRead: handleMarkUpdateRead,
        toggleSimulatedSensorMode: handleToggleSimulatedSensorMode,
        refreshWeather,
        resetDemoData: handleResetDemoData,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
