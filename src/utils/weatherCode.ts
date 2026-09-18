/**
 * Mapeo de códigos WMO (Organización Meteorológica Mundial) a texto e ícono.
 * Utilizado por Open-Meteo.
 */
export function getWeatherDetails(code: number): { label: string; icon: string } {
  // 0: Clear sky
  if (code === 0) return { label: 'Despejado', icon: '☀️' };
  
  // 1, 2, 3: Mainly clear, partly cloudy, and overcast
  if (code === 1) return { label: 'Mayormente despejado', icon: '🌤️' };
  if (code === 2) return { label: 'Parcialmente nublado', icon: '⛅' };
  if (code === 3) return { label: 'Nublado', icon: '☁️' };
  
  // 45, 48: Fog and depositing rime fog
  if (code === 45 || code === 48) return { label: 'Niebla', icon: '🌫️' };
  
  // 51, 53, 55: Drizzle
  if (code >= 51 && code <= 55) return { label: 'Llovizna', icon: '🌧️' };
  
  // 56, 57: Freezing Drizzle
  if (code === 56 || code === 57) return { label: 'Llovizna helada', icon: '🌨️' };
  
  // 61, 63, 65: Rain
  if (code >= 61 && code <= 65) return { label: 'Lluvia', icon: '🌧️' };
  
  // 66, 67: Freezing Rain
  if (code === 66 || code === 67) return { label: 'Lluvia helada', icon: '🌨️' };
  
  // 71, 73, 75, 77: Snow fall and Snow grains
  if (code >= 71 && code <= 77) return { label: 'Nieve', icon: '❄️' };
  
  // 80, 81, 82: Rain showers
  if (code >= 80 && code <= 82) return { label: 'Chubascos', icon: '🌦️' };
  
  // 85, 86: Snow showers
  if (code === 85 || code === 86) return { label: 'Chubascos de nieve', icon: '🌨️' };
  
  // 95: Thunderstorm
  if (code === 95) return { label: 'Tormenta', icon: '⛈️' };
  
  // 96, 99: Thunderstorm with slight and heavy hail
  if (code === 96 || code === 99) return { label: 'Tormenta con granizo', icon: '⛈️' };

  return { label: 'Desconocido', icon: '🌡️' };
}
