# TASKS — AvistAves

Plan de desarrollo incremental. Cada fase entrega código funcional antes de continuar.
Convención de commits: Conventional Commits (`feat:`, `fix:`, `refactor:`).

---

## Fase 1 — Fundación ✅

Objetivo: proyecto corriendo con estructura lista para desarrollar.

- [x] Inicializar proyecto Expo con TypeScript (`npx create-expo-app`)
- [x] Instalar dependencias requeridas: `expo-camera`, `expo-location`, `@react-native-async-storage/async-storage`
- [x] Crear estructura de carpetas: `app/`, `src/components`, `src/services`, `src/hooks`, `src/types`, `src/utils`, `src/storage`, `src/constants`
- [x] Definir tipos base en `src/types/index.ts`: `Sighting`, `WeatherData`, `SightingLocation`
- [x] Crear constantes iniciales en `src/constants/index.ts`: colores, tamaños, textos UI
- [x] Verificar que la app compila sin errores (`npx tsc --noEmit`)

**Commit sugerido:** `feat: initialize project structure and base types`

---

## Fase 2 — Navegación y pantallas vacías

Objetivo: las tres rutas funcionan y la navegación es correcta.

- [ ] Configurar Expo Router: crear `app/_layout.tsx` con Stack navigator
- [ ] Crear pantalla Listado: `app/index.tsx` (placeholder)
- [ ] Crear pantalla Registro: `app/register.tsx` (placeholder)
- [ ] Crear pantalla Detalle: `app/detail/[id].tsx` (placeholder)
- [ ] Verificar navegación: Listado → Registro, Listado → Detalle, volver atrás desde ambas

**Commit sugerido:** `feat: add navigation with Expo Router (list, register, detail)`

---

## Fase 3 — Persistencia

Objetivo: guardar y leer avistamientos con AsyncStorage.

- [ ] Crear `src/storage/sightings.ts` con funciones: `getAll`, `save`, `getById`
- [ ] Datos guardados como JSON; fotografía guardada como URI de archivo local
- [ ] Crear hook `src/hooks/useSightings.ts`: expone lista, `add`, `loading`, `error`
- [ ] Probar manualmente: guardar un objeto de prueba y releerlo al reiniciar la app

**Commit sugerido:** `feat: implement AsyncStorage persistence for sightings`

---

## Fase 4 — Cámara

Objetivo: capturar fotografía desde la cámara del dispositivo.

- [ ] Crear `src/components/CameraCapture.tsx`: solicita permiso, muestra preview, botón de captura
- [ ] Manejar estados: `requesting-permission` | `denied` | `ready` | `capturing` | `captured`
- [ ] Permiso denegado: mensaje claro con botón para ir a configuración
- [ ] Foto capturada: mostrar miniatura + botón para repetir
- [ ] Integrar en pantalla Registro

**Commit sugerido:** `feat: implement camera capture with permission handling`

---

## Fase 5 — GPS y geocodificación inversa

Objetivo: obtener coordenadas y dirección legible automáticamente.

- [ ] Crear `src/services/location.ts`: función `getCurrentLocation()` que retorna `{ lat, lng, address }`
- [ ] Usar `expo-location` con `getCurrentPositionAsync` y `reverseGeocodeAsync`
- [ ] Manejar estados: `requesting-permission` | `denied` | `loading` | `error` | `success`
- [ ] Permiso denegado: mensaje claro, sin bloquear la app
- [ ] Crear componente `src/components/LocationDisplay.tsx`: muestra dirección o estado
- [ ] Integrar en pantalla Registro (se obtiene al abrir la pantalla)

**Commit sugerido:** `feat: add GPS location with reverse geocoding`

---

## Fase 6 — API del clima ✅

Objetivo: obtener temperatura, condición y humedad al registrar.

- [x] Crear `src/services/weather.ts`: función `getWeather(lat, lng)` → `WeatherData | null`
- [x] Endpoint Open-Meteo: `current=temperature_2m,weathercode,relativehumidity_2m`
- [x] Crear `src/utils/weatherCode.ts`: mapa de `weather_code` → `{ label: string, icon: string }`
- [x] **Optimización 1 — Timeout:** `AbortController` con 8 s; si vence, retorna `null`
- [x] **Optimización 2 — Caché por ubicación:** guardar último resultado en memoria con clave `"lat,lng"` redondeada a 2 decimales; reusar si la misma ubicación se consulta dentro de la misma sesión
- [x] Si la API falla: el avistamiento se guarda igual, campo clima queda `null`
- [x] Integrar en pantalla Registro: consulta en paralelo con GPS al abrir

**Commit sugerido:** `feat: integrate Open-Meteo weather API with timeout and cache`

## Fase 7 — Formulario de registro ✅

Objetivo: pantalla de registro completa y funcional.

- [x] Campos: nombre del ave (texto), cantidad (numérico ≥ 1), notas (opcional, multilínea)
- [x] Fecha y hora: se asigna automáticamente al abrir la pantalla (`new Date()`)
- [x] Validación antes de guardar: foto, ubicación, nombre, fecha, cantidad ≥ 1
- [x] Mensajes de error por campo, visibles e inline
- [x] Botón "Guardar": deshabilitado si faltan campos obligatorios
- [x] Al guardar: `useSightings.add()` → navegar al Listado
- [x] Estados: `idle` | `saving` | `error`
- [x] Crear componentes reutilizables necesarios: `src/components/Input.tsx`, `src/components/Button.tsx`

**Commit sugerido:** `feat: complete sighting registration form with validation`

---

## Fase 8 — Pantalla de Listado ✅

Objetivo: listar avistamientos con filtro, orden y estado vacío.

- [x] Usar `FlatList` con `useSightings` hook
- [x] Orden por defecto: más reciente primero
- [x] Crear `src/components/SightingCard.tsx`: foto, nombre, fecha, temperatura o "sin clima"
- [x] Barra de búsqueda: filtrar por nombre de ave (texto)
- [x] Selector de orden: más reciente / más antiguo
- [x] Estado vacío: `src/components/EmptyState.tsx` con mensaje y botón para registrar
- [x] Estado carga: `src/components/Loading.tsx` (En index con ActivityIndicator)
- [x] Botón flotante para ir a Registro

**Commit sugerido:** `feat: implement sightings list with search, sort and empty state`

---

## Fase 9 — Pantalla de Detalle ✅

Objetivo: mostrar todos los datos de un avistamiento.

- [x] Leer avistamiento por `id` desde storage (o desde params de navegación)
- [x] Mostrar: foto grande, nombre, fecha/hora, cantidad, notas, clima completo, dirección
- [x] Clima: ícono + condición + temperatura + humedad; si `null`: "Clima no disponible"
- [x] Botón volver al Listado
- [x] Estado carga y error si el avistamiento no existe

**Commit sugerido:** `feat: implement sighting detail screen`

---

## Fase 10 — Pulido y revisión final ✅

Objetivo: la app cumple todos los requisitos del BRIEF sin errores.

- [x] Revisar todos los estados async: loading / error / empty / success en las 3 pantallas
- [x] Revisar manejo de permisos (cámara y GPS): mensajes claros, sin bloqueos
- [x] Verificar que las fotos persisten entre cierres (URIs válidas)
- [x] Revisar TypeScript: sin `any`, sin errores de compilación
- [x] Revisar UI: contraste, botones grandes, espaciado consistente, legible al sol
- [x] Probar flujo completo: abrir → registrar → volver → ver detalle
- [x] Identificar y documentar 3 patrones de diseño en el código (Observer, Repository, Strategy u otros presentes)

**Commit sugerido:** `refactor: polish UI states, permissions and TypeScript types`

---

## Fase 11 — Entregables ✅

Objetivo: documentación lista para entrega.

- [x] Escribir `README.md`: descripción, instalación, uso, arquitectura, patrones, optimizaciones
- [x] Comparación con otros dos frameworks (Flutter, Ionic o similar) — sección en README o informe
- [x] Declarar uso de IA en informe: qué tareas se asistieron
- [x] Repositorio público en GitHub con historial de commits ordenado
- [x] Captura o video de cámara y GPS funcionando
