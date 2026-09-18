import { WeatherData } from '../types';
import { getWeatherDetails } from '../utils/weatherCode';

// Caché en memoria para la sesión.
// Clave: "lat,lng" (redondeado a 2 decimales para agrupar consultas cercanas)
const weatherCache = new Map<string, WeatherData>();

export async function getWeather(latitude: number, longitude: number): Promise<WeatherData | null> {
  const latRound = latitude.toFixed(2);
  const lngRound = longitude.toFixed(2);
  const cacheKey = `${latRound},${lngRound}`;

  if (weatherCache.has(cacheKey)) {
    return weatherCache.get(cacheKey)!;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code`;
    
    const response = await fetch(url, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const current = data.current;

    if (!current) {
      throw new Error('Formato de respuesta inválido');
    }

    const { label, icon } = getWeatherDetails(current.weather_code);

    const weatherData: WeatherData = {
      temperature: current.temperature_2m,
      weatherCode: current.weather_code,
      condition: label,
      icon,
      humidity: current.relative_humidity_2m,
    };

    weatherCache.set(cacheKey, weatherData);
    return weatherData;

  } catch (error) {
    console.error('Error obteniendo clima:', error);
    // Si hay error de red o timeout, retornamos null silenciosamente
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
