// Datos climáticos obtenidos de Open-Meteo
export interface WeatherData {
  temperature: number;       // °C
  weatherCode: number;       // código numérico Open-Meteo
  condition: string;         // texto legible (derivado del weatherCode)
  icon: string;              // emoji representativo
  humidity: number;          // % humedad relativa
}

// Ubicación GPS + dirección legible
export interface SightingLocation {
  latitude: number;
  longitude: number;
  address: string;           // resultado de reverseGeocodeAsync
}

// Avistamiento completo almacenado en AsyncStorage
export interface Sighting {
  id: string;
  birdName: string;
  count: number;             // cantidad de ejemplares (mínimo 1)
  photoUri: string;          // URI local de la fotografía
  location: SightingLocation;
  dateTime: string;          // ISO 8601
  notes?: string;
  weather: WeatherData | null; // null si la API falló o no había conexión
}
