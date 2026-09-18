import { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Colors, Spacing, Radius, Strings, TouchTarget, FontSize } from '../constants';

interface CameraCaptureProps {
  onPhotoCaptured: (uri: string | null) => void;
}

export function CameraCapture({ onPhotoCaptured }: CameraCaptureProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const takePicture = useCallback(async () => {
    if (!cameraRef.current || capturing) return;
    try {
      setCapturing(true);
      setCameraError(null);
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      if (photo?.uri) {
        setPhotoUri(photo.uri);
        onPhotoCaptured(photo.uri);
      }
    } catch {
      setCameraError(Strings.errorCamera);
    } finally {
      setCapturing(false);
    }
  }, [capturing, onPhotoCaptured]);

  const retake = useCallback(() => {
    setPhotoUri(null);
    setCameraError(null);
    onPhotoCaptured(null); // notifica al padre que el URI fue descartado
  }, [onPhotoCaptured]);

  // Estado: cargando permisos
  if (!permission) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.text}>{Strings.loadingPhoto}</Text>
      </View>
    );
  }

  // Estado: permiso denegado permanentemente — abrir configuración
  if (!permission.granted && !permission.canAskAgain) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.title}>{Strings.permissionCameraTitle}</Text>
        <Text style={styles.text}>
          El permiso fue rechazado. Habilítalo desde Configuración.
        </Text>
        <TouchableOpacity style={styles.btn} onPress={() => Linking.openSettings()}>
          <Text style={styles.btnText}>Abrir Configuración</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Estado: permiso no otorgado — puede pedirse
  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.title}>{Strings.permissionCameraTitle}</Text>
        <Text style={styles.text}>{Strings.permissionCameraMsg}</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Otorgar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Estado: foto capturada — muestra preview
  if (photoUri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.preview} />
        <TouchableOpacity style={styles.retakeBtn} onPress={retake}>
          <Text style={styles.btnText}>Repetir fotografía</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Estado: cámara lista para capturar
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} facing="back" />
      <View style={styles.cameraOverlay}>
        {cameraError && (
          <Text style={styles.errorText}>{cameraError}</Text>
        )}
        <TouchableOpacity
          style={styles.captureBtn}
          onPress={takePicture}
          disabled={capturing}
          accessibilityLabel="Capturar fotografía"
        >
          {capturing ? (
            <ActivityIndicator color={Colors.primary} />
          ) : (
            <View style={styles.captureBtnInner} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: '100%',
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  text: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  btn: {
    minHeight: TouchTarget.min,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  btnText: {
    color: Colors.surface,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  captureBtnInner: {
    width: 56,
    height: 56,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  retakeBtn: {
    position: 'absolute',
    bottom: Spacing.md,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.full,
    minHeight: TouchTarget.min,
    justifyContent: 'center',
  },
  errorText: {
    color: Colors.error,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    fontSize: FontSize.sm,
  },
});
