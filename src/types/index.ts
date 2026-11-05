export type GrowthStage = 'Sowing' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvesting';
export type HealthStatus = 'Optimal' | 'Attention' | 'Critical';
export type IrrigationType = 'Drip & Borewell' | 'Drip Irrigation' | 'Sprinkler System' | 'Canal / Flood' | 'Rainfed';

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
  season?: 'Kharif' | 'Rabi' | 'Zaid';
  targetYieldQuintals?: number;
  notes?: string;
}

export interface FarmerProfile {
  name: string;
  phone: string;
  village: string;
  location: string;
  state: string;
  district: string;
  taluk: string;
  latitude: number;
  longitude: number;
  preferredLanguage: 'en' | 'kn' | 'hi';
  totalLandAcres: number;
  soilType: string;
  mainCrops: string[];
  irrigationType: IrrigationType;
  kisanId: string;
  avatarUrl?: string;
  email?: string;
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
  lastUpdated: string;
  isLive: boolean;
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
  soilTemp: number;
  ecValue?: number;
  batteryLevel?: number;
}

export interface WaterUsageRecord {
  date: string;
  litersUsed: number;
  targetLiters: number;
  soilMoistureAvg: number;
}

export interface SensorReading {
  deviceId: string;
  zoneId: string;
  zoneName: string;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  batteryLevel: number;
  isSimulated: boolean;
  timestamp: string;
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
  analyzedAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: 'pest' | 'irrigation' | 'soil' | 'scheme' | 'general' | 'weather';
  audioPlaying?: boolean;
  quickReplies?: string[];
}

export interface GovernmentScheme {
  id: string;
  code: string;
  name: string;
  nameKannada?: string;
  nameHindi?: string;
  category: 'Financial' | 'Insurance' | 'Irrigation' | 'Equipment' | 'Soil & Inputs' | 'Infrastructure' | 'Millets';
  level: 'Central' | 'Karnataka State' | 'Maharashtra State';
  targetAudience: string;
  financialBenefit: string;
  description: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  applicationProcess: string;
  officialPortalUrl: string;
  publishedDate: string;
  lastVerifiedDate: string;
  isPopular?: boolean;
}

export type ApplicationStatus =
  | 'Interested'
  | 'Eligibility Verification'
  | 'Documents Pending'
  | 'Ready to Apply'
  | 'Applied'
  | 'Under Review'
  | 'Approved'
  | 'Rejected'
  | 'Benefit Received';

export interface SchemeApplication {
  id: string;
  schemeId: string;
  schemeName: string;
  category: string;
  applicationNumber: string;
  status: ApplicationStatus;
  appliedDate: string;
  estimatedDisbursementDate?: string;
  benefitReceivedAmount?: number;
  notes: string;
  documentsChecklist: {
    name: string;
    submitted: boolean;
  }[];
  timeline: {
    status: ApplicationStatus;
    date: string;
    note: string;
  }[];
}

export interface SchemeUpdate {
  id: string;
  schemeCode: string;
  schemeName: string;
  title: string;
  summary: string;
  updateType: 'Deadline' | 'Budget' | 'Amendment' | 'New Release';
  sourceUrl: string;
  publishedDate: string;
  verifiedTimestamp: string;
}

export interface MandiRecord {
  id: string;
  commodity: string;
  variety: string;
  marketName: string;
  district: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  priceUnit: string;
  trend: 'up' | 'down' | 'steady';
  percentChange: number;
  reportedDate: string;
  arrivalQuantityTonnes: number;
  source: string;
  historical30Days?: { date: string; modalPrice: number }[];
}

export interface CropCalendarItem {
  id: string;
  cropName: string;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  bestSowingWindow: string;
  durationDays: number;
  waterRequirement: 'High' | 'Medium' | 'Low';
  stages: {
    stage: string;
    dayRange: string;
    keyActions: string[];
    criticalCare: string;
  }[];
  fertilizerSchedule: string;
  majorPestsAndControl: string;
  icarAdvisoryRef: string;
}
