import { Text, StyleSheet, ScrollView, View, Alert } from 'react-native';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Colors, FontSize, Spacing } from '../src/constants';
import { CameraCapture } from '../src/components/CameraCapture';
import { LocationDisplay } from '../src/components/LocationDisplay';
import { SightingLocation, WeatherData, Sighting } from '../src/types';
import { getWeather } from '../src/services/weather';
import { Input } from '../src/components/Input';
import { Button } from '../src/components/Button';
import { useSightings } from '../src/hooks/useSightings';

export default function RegisterScreen() {
  const { add, saving } = useSightings();
  const photoUriRef = useRef<string | null>(null);
  const locationRef = useRef<SightingLocation | null>(null);
  const weatherRef = useRef<WeatherData | null>(null);

  const [birdName, setBirdName] = useState('');
  const [count, setCount] = useState('1');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLocationObtained = async (loc: SightingLocation | null) => {
    locationRef.current = loc;
    if (loc) {
      weatherRef.current = await getWeather(loc.latitude, loc.longitude);
    } else {
      weatherRef.current = null;
    }
  };

  const handleSave = async () => {
    const newErrors: Record<string, string> = {};
    if (!photoUriRef.current) newErrors.photo = 'La fotografía es obligatoria';
    if (!locationRef.current) newErrors.location = 'La ubicación GPS es obligatoria';
    if (!birdName.trim()) newErrors.birdName = 'El nombre del ave es obligatorio';
    const parsedCount = parseInt(count, 10);
    if (isNaN(parsedCount) || parsedCount < 1) newErrors.count = 'Debe ser un número mayor a 0';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert('Datos incompletos', 'Completa todos los campos obligatorios (*).');
      return;
    }

    setErrors({});
    const newSighting: Sighting = {
      id: Date.now().toString(),
      birdName: birdName.trim(),
      count: parsedCount,
      photoUri: photoUriRef.current!,
      location: locationRef.current!,
      dateTime: new Date().toISOString(),
      notes: notes.trim() || undefined,
      weather: weatherRef.current,
    };

    const success = await add(newSighting);
    if (success) {
      router.back();
    } else {
      Alert.alert('Error', 'No se pudo guardar el avistamiento. Intenta nuevamente.');
    }
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>

      {/* Sección 1: Fotografía */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📷</Text>
          <Text style={styles.sectionLabel}>Fotografía <Text style={styles.required}>*</Text></Text>
        </View>
        <CameraCapture onPhotoCaptured={(uri) => { photoUriRef.current = uri; }} />
        {errors.photo && <Text style={styles.errorText}>⚠ {errors.photo}</Text>}
      </View>

      {/* Sección 2: Especie */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🦜</Text>
          <Text style={styles.sectionLabel}>Especie <Text style={styles.required}>*</Text></Text>
        </View>
        <Input
          label="Nombre del ave"
          value={birdName}
          onChangeText={setBirdName}
          error={errors.birdName}
          placeholder="Ej: Gorrión, o 'no identificada'"
          autoCorrect={false}
        />
        <Input
          label="Cantidad de ejemplares"
          value={count}
          onChangeText={setCount}
          keyboardType="numeric"
          error={errors.count}
        />
      </View>

      {/* Sección 3: Ubicación */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📍</Text>
          <Text style={styles.sectionLabel}>Ubicación y clima <Text style={styles.required}>*</Text></Text>
        </View>
        <LocationDisplay onLocationObtained={handleLocationObtained} />
        {errors.location && <Text style={styles.errorText}>⚠ {errors.location}</Text>}
      </View>

      {/* Sección 4: Notas */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📝</Text>
          <Text style={styles.sectionLabel}>Notas</Text>
        </View>
        <Input
          label=""
          value={notes}
          onChangeText={setNotes}
          multiline
          placeholder="Comportamiento, entorno, condiciones…"
        />
      </View>

      {/* Footer acciones */}
      <View style={styles.footer}>
        <Button
          title="Guardar avistamiento"
          icon="✓"
          onPress={handleSave}
          loading={saving}
        />
        <Button
          title="Cancelar"
          variant="secondary"
          onPress={() => router.back()}
          disabled={saving}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flexGrow: 1,
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.xl,
  },
  section: {
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.lg,
    // Sombra sutil
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  sectionIcon: {
    fontSize: 20,
  },
  sectionLabel: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  required: {
    color: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: FontSize.sm,
  },
  footer: {
    gap: Spacing.md,
  },
});
