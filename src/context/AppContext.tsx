import React, { createContext, useContext, useState, useEffect } from 'react';
import { Crop, FarmerProfile, IrrigationZone, WeatherCondition } from '../types';
import { storageService } from '../services/storage';
import { MOCK_WEATHER } from '../data/mockData';

interface AppContextType {
  crops: Crop[];
  profile: FarmerProfile;
  zones: IrrigationZone[];
  weather: WeatherCondition;
  addCrop: (crop: Omit<Crop, 'id'>) => Crop;
  updateCrop: (id: string, crop: Partial<Crop>) => void;
  deleteCrop: (id: string) => boolean;
  updateProfile: (profile: FarmerProfile) => void;
  toggleValve: (zoneId: string) => void;
  resetDemoData: () => void;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [profile, setProfile] = useState<FarmerProfile>(storageService.getProfile());
  const [zones, setZones] = useState<IrrigationZone[]>([]);
  const [weather] = useState<WeatherCondition>(MOCK_WEATHER);

  const refreshData = () => {
    setCrops(storageService.getCrops());
    setProfile(storageService.getProfile());
    setZones(storageService.getIrrigationZones());
  };

  useEffect(() => {
    refreshData();
  }, []);

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
  };

  const handleToggleValve = (zoneId: string) => {
    const updated = storageService.toggleZoneValve(zoneId);
    setZones(updated);
  };

  const handleResetDemoData = () => {
    storageService.resetAllToDemoData();
    refreshData();
  };

  return (
    <AppContext.Provider
      value={{
        crops,
        profile,
        zones,
        weather,
        addCrop: handleAddCrop,
        updateCrop: handleUpdateCrop,
        deleteCrop: handleDeleteCrop,
        updateProfile: handleUpdateProfile,
        toggleValve: handleToggleValve,
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
