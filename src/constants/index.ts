// Paleta de colores — contraste alto para uso en terreno
export const Colors = {
  primary: '#1A6B3A',       // verde bosque
  primaryLight: '#E8F5EE',
  accent: '#F0A500',        // amarillo cálido para botones de acción
  background: '#F7F9F7',
  surface: '#FFFFFF',
  textPrimary: '#111111',
  textSecondary: '#4A4A4A',
  textMuted: '#7A7A7A',
  border: '#D0D8D2',
  error: '#C0392B',
  errorLight: '#FDECEA',
  success: '#1A6B3A',
  warning: '#E67E22',
} as const;

// Espaciado uniforme (múltiplos de 4)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Tamaños de fuente
export const FontSize = {
  sm: 13,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

// Radios de borde
export const Radius = {
  sm: 6,
  md: 12,
  lg: 20,
  full: 9999,
} as const;

// Alturas mínimas para botones (accesibilidad con una mano)
export const TouchTarget = {
  min: 48,
  lg: 56,
} as const;

// Textos fijos de la interfaz
export const Strings = {
  appName: 'AvistAves',
  emptyList: 'Sin avistamientos registrados',
  emptyListSub: 'Toca el botón + para registrar uno',
  loadingLocation: 'Obteniendo ubicación…',
  loadingWeather: 'Consultando clima…',
  loadingSave: 'Guardando avistamiento…',
  loadingPhoto: 'Preparando cámara…',
  errorGeneric: 'Ocurrió un error inesperado',
  errorLocation: 'No fue posible obtener la ubicación',
  errorWeather: 'Clima no disponible',
  errorCamera: 'No fue posible acceder a la cámara',
  permissionCameraTitle: 'Permiso de cámara requerido',
  permissionCameraMsg: 'AvistAves necesita acceso a la cámara para fotografiar el ave.',
  permissionLocationTitle: 'Permiso de ubicación requerido',
  permissionLocationMsg: 'AvistAves necesita tu ubicación para registrar dónde ocurrió el avistamiento.',
} as const;
