import * as Location from 'expo-location';
import { SightingLocation } from '../types';

/**
 * Solicita permiso, obtiene coordenadas GPS y dirección legible.
 * Lanza un Error con mensaje en español si algo falla.
 */
export async function getCurrentLocation(): Promise<SightingLocation> {
  // Solicitar permiso de ubicación
  const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    throw new PermissionDeniedError(canAskAgain);
  }

  // Obtener coordenadas con alta precisión
  const { coords } = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  const { latitude, longitude } = coords;

  // Convertir coordenadas a dirección legible
  const address = await buildAddress(latitude, longitude);

  return { latitude, longitude, address };
}

// Error diferenciado para que el componente pueda ofrecer "Abrir Configuración"
export class PermissionDeniedError extends Error {
  constructor(public readonly canAskAgain: boolean) {
    super('Permiso de ubicación denegado');
    this.name = 'PermissionDeniedError';
  }
}

async function buildAddress(latitude: number, longitude: number): Promise<string> {
  try {
    const results = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (!results.length) return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

    const place = results[0];
    const parts = [
      place.street,
      place.streetNumber,
      place.district ?? place.subregion,
      place.city,
      place.region,
    ].filter(Boolean);

    return parts.length > 0
      ? parts.join(', ')
      : `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
  } catch {
    // Si la geocodificación falla, mostrar coordenadas como fallback
    return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
  }
}
