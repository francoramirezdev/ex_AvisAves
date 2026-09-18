import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Sighting } from '../types';
import { Colors, Radius, Spacing, FontSize } from '../constants';

interface SightingCardProps {
  sighting: Sighting;
  onPress: (id: string) => void;
}

export function SightingCard({ sighting, onPress }: SightingCardProps) {
  const date = new Date(sighting.dateTime).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const weatherText = sighting.weather
    ? `${sighting.weather.icon} ${sighting.weather.temperature}°C`
    : '— Sin clima';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(sighting.id)}
      activeOpacity={0.75}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: sighting.photoUri }} style={styles.image} />
        {/* Badge de cantidad sobre la imagen */}
        <View style={styles.countBadge}>
          <Text style={styles.countText}>×{sighting.count}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{sighting.birdName}</Text>
        <Text style={styles.date}>📅 {date}</Text>
        <Text style={styles.location} numberOfLines={1}>
          📍 {sighting.location.address}
        </Text>
        <View style={styles.weatherChip}>
          <Text style={styles.weatherText}>{weatherText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    // Sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    // Elevación Android
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 110,
    height: 120,
    backgroundColor: Colors.border,
  },
  countBadge: {
    position: 'absolute',
    bottom: Spacing.xs,
    left: Spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
  },
  countText: {
    color: '#fff',
    fontSize: FontSize.sm,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: Spacing.md,
    gap: Spacing.xs,
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  date: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  location: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  weatherChip: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    marginTop: Spacing.xs,
  },
  weatherText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
});
