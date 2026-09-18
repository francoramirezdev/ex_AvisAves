import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colors, FontSize, Spacing, Radius } from '../../src/constants';
import { Button } from '../../src/components/Button';
import { EmptyState } from '../../src/components/EmptyState';
import { Sighting } from '../../src/types';
import { getSightingById } from '../../src/storage/sightings';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [sighting, setSighting] = useState<Sighting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getSightingById(id).then(data => {
      setSighting(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!sighting) {
    return (
      <View style={styles.container}>
        <EmptyState
          message="Avistamiento no encontrado"
          actionTitle="Volver al listado"
          onAction={() => router.back()}
        />
      </View>
    );
  }

  const date = new Date(sighting.dateTime).toLocaleString('es-ES', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Título dinámico en el header */}
      <Stack.Screen options={{ title: sighting.birdName }} />

      {/* Hero: foto + overlay nombre */}
      <View style={styles.heroContainer}>
        <Image source={{ uri: sighting.photoUri }} style={styles.heroImage} />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>{sighting.birdName}</Text>
          <Text style={styles.heroDate}>{date}</Text>
        </View>
      </View>

      {/* Chips rápidos */}
      <View style={styles.chips}>
        <View style={styles.chip}>
          <Text style={styles.chipIcon}>🐦</Text>
          <Text style={styles.chipText}>
            {sighting.count} {sighting.count === 1 ? 'ejemplar' : 'ejemplares'}
          </Text>
        </View>
        {sighting.weather && (
          <View style={styles.chip}>
            <Text style={styles.chipIcon}>{sighting.weather.icon}</Text>
            <Text style={styles.chipText}>{sighting.weather.temperature}°C</Text>
          </View>
        )}
        {sighting.weather && (
          <View style={styles.chip}>
            <Text style={styles.chipIcon}>💧</Text>
            <Text style={styles.chipText}>{sighting.weather.humidity}%</Text>
          </View>
        )}
      </View>

      {/* Bloques de información */}
      <InfoBox icon="📍" label="Ubicación">
        <Text style={styles.infoValue}>{sighting.location.address}</Text>
        <Text style={styles.infoSub}>
          {sighting.location.latitude.toFixed(5)}, {sighting.location.longitude.toFixed(5)}
        </Text>
      </InfoBox>

      <InfoBox icon="🌤️" label="Condiciones Climáticas">
        {sighting.weather ? (
          <View style={styles.weatherGrid}>
            <WeatherItem label="Condición" value={`${sighting.weather.icon} ${sighting.weather.condition}`} />
            <WeatherItem label="Temperatura" value={`${sighting.weather.temperature}°C`} />
            <WeatherItem label="Humedad" value={`${sighting.weather.humidity}%`} />
          </View>
        ) : (
          <Text style={styles.infoMuted}>Clima no disponible durante el registro</Text>
        )}
      </InfoBox>

      {sighting.notes && (
        <InfoBox icon="📝" label="Notas">
          <Text style={styles.infoValue}>{sighting.notes}</Text>
        </InfoBox>
      )}

      <Button
        title="Volver al listado"
        variant="secondary"
        onPress={() => router.back()}
        style={styles.backBtn}
      />
    </ScrollView>
  );
}

// Subcomponente local — solo se usa aquí, no justifica archivo propio
function InfoBox({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <View style={infoBoxStyles.container}>
      <View style={infoBoxStyles.header}>
        <Text style={infoBoxStyles.icon}>{icon}</Text>
        <Text style={infoBoxStyles.label}>{label}</Text>
      </View>
      {children}
    </View>
  );
}

function WeatherItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={infoBoxStyles.weatherItem}>
      <Text style={infoBoxStyles.weatherLabel}>{label}</Text>
      <Text style={infoBoxStyles.weatherValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingBottom: Spacing.xxl,
  },
  heroContainer: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.border,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
    padding: Spacing.lg,
    gap: Spacing.xs,
  },
  heroTitle: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: '#fff',
  },
  heroDate: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    padding: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  chipIcon: {
    fontSize: 16,
  },
  chipText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
  infoValue: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  infoSub: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  infoMuted: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  weatherGrid: {
    gap: Spacing.sm,
  },
  backBtn: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
});

const infoBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  weatherItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
    paddingBottom: Spacing.sm,
  },
  weatherLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  weatherValue: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
