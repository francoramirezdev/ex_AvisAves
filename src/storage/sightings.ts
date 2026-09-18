import AsyncStorage from '@react-native-async-storage/async-storage';
import { Sighting } from '../types';

const STORAGE_KEY = '@avistaves_sightings';

/**
 * Obtiene todos los avistamientos guardados.
 * Si no hay ninguno, retorna un arreglo vacío.
 */
export async function getAllSightings(): Promise<Sighting[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    return JSON.parse(data) as Sighting[];
  } catch (error) {
    console.error('Error al leer avistamientos:', error);
    throw new Error('No fue posible cargar los avistamientos guardados');
  }
}

/**
 * Guarda un nuevo avistamiento.
 * Lo agrega al principio de la lista existente (más reciente primero).
 */
export async function saveSighting(sighting: Sighting): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const current: Sighting[] = raw ? (JSON.parse(raw) as Sighting[]) : [];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([sighting, ...current]));
  } catch (error) {
    console.error('Error al guardar avistamiento:', error);
    throw new Error('No fue posible guardar el avistamiento');
  }
}

/**
 * Obtiene un avistamiento específico por su ID.
 */
export async function getSightingById(id: string): Promise<Sighting | null> {
  try {
    const current = await getAllSightings();
    const found = current.find(s => s.id === id);
    return found || null;
  } catch (error) {
    console.error('Error al buscar avistamiento:', error);
    return null;
  }
}
