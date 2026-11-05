import {
  Crop,
  FarmerProfile,
  IrrigationZone,
  ChatMessage,
  SchemeApplication,
  ApplicationStatus,
} from '../types';
import {
  INITIAL_CROPS,
  INITIAL_FARMER_PROFILE,
  INITIAL_IRRIGATION_ZONES,
  INITIAL_APPLICATIONS,
} from '../data/mockData';
import { INITIAL_CHAT_MESSAGES } from '../data/demoResponses';

const STORAGE_KEYS = {
  CROPS: 'krishipulse_crops',
  PROFILE: 'krishipulse_profile',
  ZONES: 'krishipulse_zones',
  CHAT: 'krishipulse_chat_history',
  SAVED_SCHEMES: 'krishipulse_saved_schemes',
  APPLICATIONS: 'krishipulse_applications',
  READ_UPDATES: 'krishipulse_read_updates',
  SIM_SENSOR_MODE: 'krishipulse_sim_sensor_mode',
  LANG: 'krishipulse_language',
};

export const storageService = {
  // Crops CRUD
  getCrops(): Crop[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CROPS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CROPS, JSON.stringify(INITIAL_CROPS));
        return INITIAL_CROPS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_CROPS;
    }
  },

  saveCrops(crops: Crop[]): void {
    localStorage.setItem(STORAGE_KEYS.CROPS, JSON.stringify(crops));
  },

  addCrop(crop: Omit<Crop, 'id'>): Crop {
    const crops = this.getCrops();
    const newCrop: Crop = {
      ...crop,
      id: `crop-${Date.now()}`,
    };
    const updated = [newCrop, ...crops];
    this.saveCrops(updated);
    return newCrop;
  },

  updateCrop(id: string, updatedFields: Partial<Crop>): Crop | null {
    const crops = this.getCrops();
    const index = crops.findIndex((c) => c.id === id);
    if (index === -1) return null;

    crops[index] = { ...crops[index], ...updatedFields };
    this.saveCrops(crops);
    return crops[index];
  },

  deleteCrop(id: string): boolean {
    const crops = this.getCrops();
    const filtered = crops.filter((c) => c.id !== id);
    if (filtered.length === crops.length) return false;
    this.saveCrops(filtered);
    return true;
  },

  // Farmer Profile
  getProfile(): FarmerProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_FARMER_PROFILE));
        return INITIAL_FARMER_PROFILE;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_FARMER_PROFILE;
    }
  },

  saveProfile(profile: FarmerProfile): void {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },

  // Irrigation Zones
  getIrrigationZones(): IrrigationZone[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ZONES);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(INITIAL_IRRIGATION_ZONES));
        return INITIAL_IRRIGATION_ZONES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_IRRIGATION_ZONES;
    }
  },

  saveIrrigationZones(zones: IrrigationZone[]): void {
    localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(zones));
  },

  toggleZoneValve(zoneId: string): IrrigationZone[] {
    const zones = this.getIrrigationZones();
    const updated = zones.map((z) => {
      if (z.id === zoneId) {
        const nextState = z.valveStatus === 'Open' ? 'Closed' : 'Open';
        return {
          ...z,
          valveStatus: nextState as 'Open' | 'Closed',
          lastWatered: nextState === 'Open' ? 'Flowing now' : 'Just closed',
        };
      }
      return z;
    });
    this.saveIrrigationZones(updated);
    return updated;
  },

  // Government Scheme Bookmarks
  getSavedSchemeIds(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_SCHEMES);
      if (!data) return ['scheme-1', 'scheme-3'];
      return JSON.parse(data);
    } catch {
      return ['scheme-1', 'scheme-3'];
    }
  },

  toggleSaveScheme(schemeId: string): string[] {
    const saved = this.getSavedSchemeIds();
    const exists = saved.includes(schemeId);
    const updated = exists ? saved.filter((id) => id !== schemeId) : [...saved, schemeId];
    localStorage.setItem(STORAGE_KEYS.SAVED_SCHEMES, JSON.stringify(updated));
    return updated;
  },

  // Scheme Application Tracker
  getApplications(): SchemeApplication[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
        return INITIAL_APPLICATIONS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_APPLICATIONS;
    }
  },

  saveApplications(apps: SchemeApplication[]): void {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
  },

  addApplication(app: Omit<SchemeApplication, 'id'>): SchemeApplication {
    const apps = this.getApplications();
    const newApp: SchemeApplication = {
      ...app,
      id: `app-${Date.now()}`,
    };
    const updated = [newApp, ...apps];
    this.saveApplications(updated);
    return newApp;
  },

  updateApplicationStatus(id: string, status: ApplicationStatus, note?: string): SchemeApplication | null {
    const apps = this.getApplications();
    const index = apps.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const current = apps[index];
    const newTimeline = [
      ...(current.timeline || []),
      {
        status,
        date: new Date().toISOString().split('T')[0],
        note: note || `Status updated to ${status}`,
      },
    ];

    apps[index] = {
      ...current,
      status,
      timeline: newTimeline,
    };
    this.saveApplications(apps);
    return apps[index];
  },

  // Read Updates
  getReadUpdateIds(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.READ_UPDATES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  markUpdateRead(updateId: string): string[] {
    const read = this.getReadUpdateIds();
    if (!read.includes(updateId)) {
      const updated = [...read, updateId];
      localStorage.setItem(STORAGE_KEYS.READ_UPDATES, JSON.stringify(updated));
      return updated;
    }
    return read;
  },

  // Simulated Sensor Mode Toggle
  getSimulatedSensorMode(): boolean {
    const val = localStorage.getItem(STORAGE_KEYS.SIM_SENSOR_MODE);
    return val === null ? true : val === 'true'; // default to true so telemetry animates out-of-the-box
  },

  setSimulatedSensorMode(enabled: boolean): void {
    localStorage.setItem(STORAGE_KEYS.SIM_SENSOR_MODE, String(enabled));
  },

  // Language
  getLanguage(): 'en' | 'kn' | 'hi' {
    const val = localStorage.getItem(STORAGE_KEYS.LANG);
    if (val === 'kn' || val === 'hi') return val;
    return 'en';
  },

  setLanguage(lang: 'en' | 'kn' | 'hi'): void {
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  },

  // Chat History
  getChatHistory(): ChatMessage[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHAT);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(INITIAL_CHAT_MESSAGES));
        return INITIAL_CHAT_MESSAGES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_CHAT_MESSAGES;
    }
  },

  saveChatHistory(messages: ChatMessage[]): void {
    localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(messages));
  },

  // Reset demo state
  resetAllToDemoData(): void {
    localStorage.setItem(STORAGE_KEYS.CROPS, JSON.stringify(INITIAL_CROPS));
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(INITIAL_FARMER_PROFILE));
    localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(INITIAL_IRRIGATION_ZONES));
    localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(INITIAL_CHAT_MESSAGES));
    localStorage.setItem(STORAGE_KEYS.SAVED_SCHEMES, JSON.stringify(['scheme-1', 'scheme-3']));
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
    localStorage.setItem(STORAGE_KEYS.READ_UPDATES, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.SIM_SENSOR_MODE, 'true');
  },
};
