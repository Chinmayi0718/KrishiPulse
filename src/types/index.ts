export type GrowthStage = 'Sowing' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvesting';
export type HealthStatus = 'Optimal' | 'Attention' | 'Critical';
export type IrrigationType = 'Drip Irrigation' | 'Sprinkler System' | 'Canal / Flood' | 'Rainfed';

export interface Crop {
  id: string;
  name: string;
  variety: string;
  plantingDate: string;
  growthStage: GrowthStage;
  areaAcres: number;
  health: HealthStatus;
  expectedHarvest: string;
  fieldLocation: string;
  notes?: string;
}

export interface FarmerProfile {
  name: string;
  phone: string;
  location: string;
  state: string;
  district: string;
  taluk: string;
  preferredLanguage: string;
  totalLandAcres: number;
  soilType: string;
  mainCrops: string[];
  irrigationType: IrrigationType;
  kisanId: string;
  avatarUrl?: string;
}

export interface WeatherCondition {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  rainfallMm: number;
  rainfallChance: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Light Rain' | 'Heavy Rain' | 'Thunderstorm';
  uvIndex: number;
  soilTemp: number;
  airQuality: string;
  sunrise: string;
  sunset: string;
  forecast7Days: DayForecast[];
  sprayAdvisory: {
    recommended: boolean;
    reason: string;
  };
}

export interface DayForecast {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  rainChance: number;
  iconName: string;
}

export interface IrrigationZone {
  id: string;
  name: string;
  crop: string;
  areaAcres: number;
  currentMoisture: number; // percentage
  targetMoisture: number; // percentage
  status: 'Adequate' | 'Irrigation Needed' | 'Critical Low' | 'Over-watered';
  valveStatus: 'Open' | 'Closed';
  lastWatered: string;
  recommendedDurationMin: number;
  estimatedWaterLiters: number;
}

export interface WaterUsageRecord {
  date: string;
  litersUsed: number;
  targetLiters: number;
  soilMoistureAvg: number;
}

export interface DiseaseDiagnosis {
  id: string;
  cropName: string;
  diseaseName: string;
  scientificName: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Severe';
  symptoms: string[];
  organicRemedies: string[];
  chemicalTreatments: string[];
  preventiveMeasures: string[];
  isHealthy: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: 'pest' | 'irrigation' | 'soil' | 'scheme' | 'general';
  quickReplies?: string[];
}
