import { useState, useEffect, useCallback } from 'react';
import { Sighting } from '../types';
import { getAllSightings, saveSighting } from '../storage/sightings';

export function useSightings() {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSightings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllSightings();
      setSightings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSightings();
  }, [loadSightings]);

  const add = async (sighting: Sighting): Promise<boolean> => {
    try {
      setSaving(true);
      setError(null);
      await saveSighting(sighting);
      setSightings(prev => [sighting, ...prev]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
      return false;
    } finally {
      setSaving(false);
    }
  };

  return { sightings, loading, saving, error, add, reload: loadSightings };
}
