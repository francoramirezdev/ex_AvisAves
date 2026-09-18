# AvistAves

## Descripción

AvistAves es una aplicación móvil desarrollada con React Native + Expo para registrar avistamientos de aves en terreno.

La aplicación permite registrar qué ave fue observada, dónde ocurrió el avistamiento, obtener una fotografía mediante la cámara del dispositivo y guardar las condiciones climáticas del momento.

## Objetivo

Crear una aplicación móvil simple, intuitiva y funcional que permita a un voluntario registrar un avistamiento de forma rápida mientras se encuentra en terreno.

## Tecnologías

- React Native
- Expo
- TypeScript
- Expo Router
- expo-camera
- expo-location
- AsyncStorage
- Open-Meteo API
- Git / GitHub

## Pantallas

La aplicación tendrá tres pantallas principales:

1. **Listado de avistamientos**
2. **Registro de avistamiento**
3. **Detalle de avistamiento**

## Funcionalidades

### Registro

El usuario podrá registrar:

- Fotografía tomada directamente con la cámara.
- Latitud y longitud obtenidas mediante GPS.
- Nombre del ave.
- Fecha y hora.
- Cantidad de ejemplares.
- Notas.
- Condiciones climáticas.

Campos obligatorios:

- Fotografía.
- Ubicación.
- Nombre del ave.
- Fecha y hora.
- Cantidad de ejemplares.

El nombre puede ser `"no identificada"`.

### Cámara

Utilizar `expo-camera`.

La fotografía debe ser tomada mediante la cámara del dispositivo y no seleccionada desde la galería.

### GPS

Utilizar `expo-location`.

La ubicación debe obtenerse automáticamente.

Utilizar `reverseGeocodeAsync` para mostrar la ubicación de forma comprensible para el usuario.

### Clima

Utilizar Open-Meteo.

Obtener:

- Temperatura.
- Condición climática.
- Humedad relativa o velocidad del viento.

El `weather_code` debe convertirse a texto e ícono.

Si la API falla o no existe conexión, el avistamiento debe guardarse igualmente sin información climática.

### Listado

Mostrar los avistamientos desde el más reciente al más antiguo.

Cada elemento debe mostrar:

- Fotografía.
- Nombre del ave.
- Fecha.
- Temperatura o indicador de clima no disponible.

Incluir:

- Búsqueda o filtro.
- Ordenamiento.
- Estado vacío.
- Acceso al formulario de registro.

### Detalle

Mostrar:

- Fotografía grande.
- Nombre.
- Fecha y hora.
- Cantidad.
- Notas.
- Clima.
- Ubicación.
- Todos los datos registrados.

## Persistencia

Utilizar AsyncStorage.

Los datos deben mantenerse después de cerrar y volver a abrir la aplicación.

Las fotografías también deben permanecer disponibles.

## Navegación

Utilizar Expo Router.

El usuario debe poder navegar entre:

```text
Listado
   ↓
Detalle

Listado
   ↓
Registro
   ↓
Listado
```

El usuario siempre debe poder volver atrás.

## Estados

La aplicación debe manejar correctamente:

- Loading
- Error
- Empty
- Success

Especialmente para:

- Cámara.
- GPS.
- API del clima.
- Lectura de datos.
- Guardado.

## Permisos

Solicitar permisos para:

- Cámara.
- Ubicación.

Si el usuario rechaza un permiso:

- No debe romperse la aplicación.
- Mostrar un mensaje claro.
- Explicar por qué se necesita.
- Permitir volver a intentarlo.

## Optimización

Implementar al menos dos medidas de optimización relacionadas con la API.

Considerar:

- Timeout.
- Caché por ubicación.
- Evitar peticiones innecesarias.
- Renderizado eficiente del listado.

## Diseño UI

La aplicación está pensada para utilizarse en terreno.

El diseño debe:

- Ser simple.
- Tener buen contraste.
- Utilizar botones grandes.
- Tener espaciados consistentes.
- Ser fácil de utilizar con una mano.
- Ser legible bajo luz exterior.
- Mostrar claramente los estados de carga y error.

## Arquitectura

Mantener separadas las responsabilidades del proyecto.

Estructura sugerida:

```text
src/
├── app/
│   ├── index.tsx
│   ├── register.tsx
│   └── detail/
│       └── [id].tsx
│
├── components/
├── services/
├── hooks/
├── types/
├── utils/
├── storage/
└── constants/
```

La estructura puede modificarse si existe una razón técnica justificada.

## Reglas de desarrollo

- Utilizar TypeScript.
- Evitar `any`.
- Utilizar componentes reutilizables.
- Evitar código duplicado.
- Mantener las responsabilidades separadas.
- No instalar dependencias innecesarias.
- No modificar funcionalidades no relacionadas con la tarea actual.
- Mantener el código simple y fácil de comprender.
- Priorizar soluciones que puedan ser explicadas y defendidas académicamente.

## Entregables

El proyecto debe incluir:

- Aplicación móvil funcional.
- Repositorio público en GitHub.
- `README.md`.
- Informe o demostración.
- Evidencia de funcionamiento de cámara y GPS.
- Explicación de la arquitectura.
- Tres patrones de diseño identificados en el código.
- Comparación con otros dos frameworks.
- Explicación de las estrategias de optimización utilizadas.

## Uso de IA

Se permite utilizar herramientas de inteligencia artificial durante el desarrollo.

El uso de IA debe declararse en el informe, indicando para qué tareas fue utilizada.

La implementación final debe ser comprendida por el desarrollador y poder ser explicada durante la evaluación.
