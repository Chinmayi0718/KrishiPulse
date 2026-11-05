import { Crop, FarmerProfile, IrrigationZone, ChatMessage } from '../types';
import { INITIAL_CROPS, INITIAL_FARMER_PROFILE, INITIAL_IRRIGATION_ZONES } from '../data/mockData';
import { INITIAL_CHAT_MESSAGES } from '../data/demoResponses';

const STORAGE_KEYS = {
  CROPS: 'krishipulse_crops',
  PROFILE: 'krishipulse_profile',
  ZONES: 'krishipulse_zones',
  CHAT: 'krishipulse_chat_history',
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
  },
};
