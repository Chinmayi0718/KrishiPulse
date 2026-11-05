import { WeatherCondition, DayForecast } from '../types';
import { MOCK_WEATHER } from '../data/mockData';

// Open-Meteo weather codes to human labels and icon names
const WMO_MAP: Record<number, { label: string; icon: string }> = {
  0: { label: 'Clear Sky', icon: 'sun' },
  1: { label: 'Mainly Clear', icon: 'sun' },
  2: { label: 'Partly Cloudy', icon: 'cloud-sun' },
  3: { label: 'Overcast', icon: 'cloud' },
  45: { label: 'Foggy', icon: 'cloud-fog' },
  48: { label: 'Depositing Rime Fog', icon: 'cloud-fog' },
  51: { label: 'Light Drizzle', icon: 'cloud-drizzle' },
  53: { label: 'Moderate Drizzle', icon: 'cloud-drizzle' },
  55: { label: 'Dense Drizzle', icon: 'cloud-drizzle' },
  61: { label: 'Slight Rain', icon: 'cloud-rain' },
  63: { label: 'Moderate Rain', icon: 'cloud-rain' },
  65: { label: 'Heavy Rain', icon: 'cloud-rain' },
  71: { label: 'Slight Snow', icon: 'snowflake' },
  73: { label: 'Moderate Snow', icon: 'snowflake' },
  75: { label: 'Heavy Snow', icon: 'snowflake' },
  80: { label: 'Rain Showers', icon: 'cloud-rain' },
  81: { label: 'Moderate Showers', icon: 'cloud-rain' },
  82: { label: 'Violent Showers', icon: 'cloud-lightning' },
  95: { label: 'Thunderstorm', icon: 'cloud-lightning' },
  96: { label: 'Thunderstorm with Hail', icon: 'cloud-lightning' },
};

function degreesToDirection(deg: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((deg % 360) / 45) % 8;
  return directions[index];
}

export async function fetchLiveWeather(lat: number, lon: number): Promise<WeatherCondition> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Open-Meteo HTTP ${res.status}`);
    }
    const data = await res.json();
    const current = data.current;
    const daily = data.daily;

    const weatherCode = current.weather_code || 0;
    const conditionInfo = WMO_MAP[weatherCode] || { label: 'Partly Cloudy', icon: 'cloud-sun' };

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const forecast7Days: DayForecast[] = (daily.time || []).slice(0, 7).map((t: string, i: number) => {
      const dateObj = new Date(t);
      const isToday = i === 0;
      const dayName = isToday ? 'Today' : days[dateObj.getDay()];
      const code = daily.weather_code[i] || 0;
      const info = WMO_MAP[code] || { label: 'Scattered Showers', icon: 'cloud-rain' };

      return {
        day: dayName,
        date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        tempMax: Math.round(daily.temperature_2m_max[i] ?? 30),
        tempMin: Math.round(daily.temperature_2m_min[i] ?? 21),
        condition: info.label,
        rainChance: Math.round(daily.precipitation_probability_max?.[i] ?? 20),
        iconName: info.icon,
      };
    });

    const rainChance = Math.round(daily.precipitation_probability_max?.[0] ?? 25);
    const windSpd = Math.round(current.wind_speed_10m || 10);
    const isSpraySafe = rainChance < 40 && windSpd < 15;

    return {
      temp: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature ?? current.temperature_2m),
      humidity: Math.round(current.relative_humidity_2m),
      windSpeed: windSpd,
      windDirection: degreesToDirection(current.wind_direction_10m || 0),
      rainfallMm: Number(current.precipitation ?? 0),
      rainfallChance: rainChance,
      condition: conditionInfo.label as any,
      uvIndex: 6,
      soilTemp: Math.round(current.temperature_2m - 3),
      airQuality: 'Good (AQI 38)',
      sunrise: '06:12 AM',
      sunset: '06:04 PM',
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isLive: true,
      forecast7Days,
      sprayAdvisory: {
        recommended: isSpraySafe,
        reason: isSpraySafe
          ? `Optimal spray window: Wind speed ${windSpd} km/h is below 15 km/h limit with low rain risk (${rainChance}%).`
          : `Unfavorable spray window: Rain chance (${rainChance}%) or wind (${windSpd} km/h) risk drift or wash-off. Postpone foliar application.`,
      },
    };
  } catch (error) {
    console.warn('Falling back to local weather intelligence:', error);
    return {
      ...MOCK_WEATHER,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isLive: false,
    };
  }
}
