# AvistAves

Aplicación móvil desarrollada con React Native + Expo para registrar avistamientos de aves en terreno. Creada como proyecto de evaluación.

## Características

- **Registro rápido**: Captura fotografías directamente desde la app.
- **Geolocalización Automática**: Integración con GPS y geocodificación inversa (convierte lat/lng a dirección legible).
- **Clima en tiempo real**: Obtiene automáticamente temperatura y condiciones meteorológicas vía Open-Meteo API (tolerante a fallos).
- **Modo offline local**: Guarda datos persistenemente con `AsyncStorage` asegurando su disponibilidad incluso sin conexión a la red.
- **Listado y Filtros**: Búsqueda por especie y ordenamiento por fecha.
- **Interfaz optimizada para terreno**: Botones grandes, contrastes altos, y fácil lectura para uso a una mano.

## Tecnologías Utilizadas

- **Framework**: React Native, Expo
- **Navegación**: Expo Router
- **Lenguaje**: TypeScript
- **Cámara**: `expo-camera`
- **Ubicación**: `expo-location`
- **Almacenamiento**: `@react-native-async-storage/async-storage`
- **APIs Externas**: Open-Meteo

## Patrones de Diseño Identificados en el Código

1. **Repository Pattern (`src/storage/sightings.ts`)**
   Abstrae la lógica de persistencia. La aplicación no sabe que se usa `AsyncStorage` directamente para guardar avistamientos; solo llama a `saveSighting` y `getAllSightings`.
2. **Observer / Custom Hook (`src/hooks/useSightings.ts`)**
   Mantiene el estado global reactivo de los avistamientos para las pantallas. Actúa como el modelo de datos vinculado al ciclo de vida de React (se actualiza el listado al volver a hacer focus o insertar un nuevo dato).
3. **Strategy Pattern (Simplificado en `src/utils/weatherCode.ts`)**
   Encapsula el algoritmo de conversión o mapeo entre un código numérico (WMO) y los detalles visuales de la interfaz (`label` e `icon`). Permite intercambiar los códigos sin afectar la interfaz ni la lógica de servicio de red.

## Estrategias de Optimización

1. **Timeout Controlado (AbortController)**: En `src/services/weather.ts`, la petición a Open-Meteo es abortada si demora más de 8 segundos. Evita bloquear la finalización de los datos o crear falsas esperanzas de respuesta en zonas de mala conexión.
2. **Caché en Memoria por Ubicación**: En `src/services/weather.ts`, las coordenadas se redondean a dos decimales, sirviendo como clave en un `Map` (`weatherCache`). Si el usuario hace dos registros rápidos en la misma zona, se reutiliza el clima sin malgastar peticiones HTTP en la misma sesión.

## Comparación con otros frameworks

Frente a otras alternativas para desarrollo de apps multiplataforma como **Flutter** y **Ionic**:

- **React Native vs Flutter**: React Native (usado aquí) permite aprovechar el ecosistema web/JS, lo que facilita encontrar librerías y talento, y utiliza renderizado nativo de UI en ambas plataformas. Flutter, por otro lado, usa Dart y dibuja sus propios widgets con Skia/Impeller, logrando extrema consistencia visual pero a menudo sintiéndose menos "nativo" (sin el comportamiento de scroll exacto del OS, por ejemplo) y requiriendo aprender Dart.
- **React Native vs Ionic**: React Native compila e interactúa con componentes verdaderamente nativos (UIView en iOS, View en Android), brindando rendimiento cercano a nativo y acceso profundo a APIs del OS (como Cámara y Location usados aquí). Ionic, siendo un framework basado en Capacitor/Cordova, renderiza todo dentro de un WebView (navegador incrustado), lo cual es más sencillo para migrar una web, pero frecuentemente inferior en rendimiento y animaciones pesadas respecto a React Native.

## Uso de IA

Se utilizó inteligencia artificial durante el proceso de desarrollo para:
- Estructuración inicial y scaffolding modular.
- Escribir `TASKS.md` a partir del `BRIEF.md`.
- Plantillas para interfaces robustas y manejo de estados asíncronos (hooks y layouts de estilos).
- Refinamiento de componentes como `CameraCapture` (resolviendo la deprecación de `Camera` clásica en SDK 51/57 hacia `CameraView`).
- Detección y prevención de errores de linting en tiempo real (eliminación de "any" y revisión exhaustiva de TS).

## Instalación y Uso

1. Clonar este repositorio.
2. Ejecutar `npm install` para instalar dependencias.
3. Iniciar el servidor local de Expo con `npm start` (o `npx expo start`).
4. Utilizar la app Expo Go en un dispositivo físico iOS/Android, o en un simulador.
   *Nota: Dado que la aplicación requiere cámara funcional, es preferible utilizar un dispositivo real.*
