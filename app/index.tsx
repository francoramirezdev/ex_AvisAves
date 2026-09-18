import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Text, TextInput } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Strings, Radius, FontSize } from '../src/constants';
import { useSightings } from '../src/hooks/useSightings';
import { SightingCard } from '../src/components/SightingCard';
import { EmptyState } from '../src/components/EmptyState';

export default function ListScreen() {
  const insets = useSafeAreaInsets();
  const { sightings, loading, reload, add } = useSightings();
  const [search, setSearch] = useState('');
  const [oldestFirst, setOldestFirst] = useState(false);

  useFocusEffect(
    useCallback(() => { reload(); }, [reload])
  );

  const filtered = sightings
    .filter(s => s.birdName.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const diff = new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
      return oldestFirst ? diff : -diff;
    });
  const addTestSighting = async () => {
    const birds = ['Cóndor andino', 'Picaflor'];
    const locations = [
      { address: 'Parque Nacional Torres del Paine', lat: -51.0, lng: -73.0 },
      { address: 'Desierto de Atacama', lat: -23.8, lng: -69.1 }
    ];

    const randomBird = birds[Math.floor(Math.random() * birds.length)];
    const randomLoc = locations[Math.floor(Math.random() * locations.length)];

    await add({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      birdName: `${randomBird} (prueba)`,
      count: Math.floor(Math.random() * 5) + 1,
      photoUri: 'file:///dummy/path.jpg',
      location: { latitude: randomLoc.lat, longitude: randomLoc.lng, address: randomLoc.address },
      dateTime: new Date().toISOString(),
      weather: null,
    });
  };

  if (loading && sightings.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Cargando avistamientos…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda y orden */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por ave…"
          placeholderTextColor={Colors.textMuted}
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.sortBtn}
          onPress={() => setOldestFirst(v => !v)}
        >
          <Text style={styles.sortBtnText}>{oldestFirst ? '↑' : '↓'}</Text>
        </TouchableOpacity>
      </View>

      {/* Conteo de resultados */}
      {sightings.length > 0 && (
        <Text style={styles.resultCount}>
          {filtered.length} {filtered.length === 1 ? 'avistamiento' : 'avistamientos'}
          {search ? ` para "${search}"` : ''}
        </Text>
      )}

      <FlatList
        data={filtered}
        contentContainerStyle={[styles.list, { paddingBottom: Math.max(insets.bottom + 80, 100) }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SightingCard
            sighting={item}
            onPress={(id) => router.push(`/detail/${id}`)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            message={search ? 'Sin resultados' : Strings.emptyList}
            subMessage={search ? `No hay aves que coincidan con "${search}"` : Strings.emptyListSub}
            actionTitle={!search ? 'Registrar primer avistamiento' : undefined}
            onAction={!search ? () => router.push('/register') : undefined}
          />
        }
      />
      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { bottom: Math.max(insets.bottom + Spacing.lg, Spacing.xl) }]}
        onPress={() => router.push('/register')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
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
    gap: Spacing.md,
  },
  loadingText: {
    color: Colors.textMuted,
    fontSize: FontSize.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    margin: Spacing.lg,
    marginBottom: Spacing.sm,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 48,
    gap: Spacing.sm,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    height: '100%',
  },
  clearBtn: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    paddingHorizontal: Spacing.xs,
  },
  sortBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortBtnText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: FontSize.md,
  },
  resultCount: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  list: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100,
    gap: Spacing.md,
  },
  fab: {
    position: 'absolute',
    bottom: Spacing.xl,
    right: Spacing.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: {
    color: Colors.surface,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '300',
  },
});
