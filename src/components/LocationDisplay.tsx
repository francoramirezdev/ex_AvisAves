import { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { SightingLocation } from '../types';
import { getCurrentLocation, PermissionDeniedError } from '../services/location';
import { Colors, FontSize, Spacing, Radius, TouchTarget, Strings } from '../constants';

type LocationState =
  | { status: 'loading' }
  | { status: 'success'; data: SightingLocation }
  | { status: 'denied'; canAskAgain: boolean }
  | { status: 'error'; message: string };

interface LocationDisplayProps {
  onLocationObtained: (location: SightingLocation | null) => void;
}

export function LocationDisplay({ onLocationObtained }: LocationDisplayProps) {
  const [state, setState] = useState<LocationState>({ status: 'loading' });

  const fetchLocation = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const location = await getCurrentLocation();
      setState({ status: 'success', data: location });
      onLocationObtained(location);
    } catch (err) {
      if (err instanceof PermissionDeniedError) {
        setState({ status: 'denied', canAskAgain: err.canAskAgain });
        onLocationObtained(null);
      } else {
        setState({ status: 'error', message: Strings.errorLocation });
        onLocationObtained(null);
      }
    }
  }, [onLocationObtained]);

  // Obtener ubicación al montar
  useEffect(() => { fetchLocation(); }, [fetchLocation]);

  if (state.status === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={Colors.primary} />
        <Text style={styles.text}>{Strings.loadingLocation}</Text>
      </View>
    );
  }

  if (state.status === 'denied') {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.title}>{Strings.permissionLocationTitle}</Text>
        <Text style={styles.errorText}>{Strings.permissionLocationMsg}</Text>
        {state.canAskAgain ? (
          <TouchableOpacity style={styles.btn} onPress={fetchLocation}>
            <Text style={styles.btnText}>Otorgar permiso</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btn} onPress={() => Linking.openSettings()}>
            <Text style={styles.btnText}>Abrir Configuración</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (state.status === 'error') {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>{state.message}</Text>
        <TouchableOpacity style={styles.btn} onPress={fetchLocation}>
          <Text style={styles.btnText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // success
  return (
    <View style={[styles.container, styles.successContainer]}>
      <Text style={styles.label}>📍 Ubicación</Text>
      <Text style={styles.address}>{state.data.address}</Text>
      <Text style={styles.coords}>
        {state.data.latitude.toFixed(5)}, {state.data.longitude.toFixed(5)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    gap: Spacing.sm,
    flexDirection: 'column',
  },
  errorContainer: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorLight,
  },
  successContainer: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  text: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  errorText: {
    fontSize: FontSize.sm,
    color: Colors.error,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
  address: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  coords: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  btn: {
    alignSelf: 'flex-start',
    minHeight: TouchTarget.min,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  btnText: {
    color: Colors.surface,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
});
