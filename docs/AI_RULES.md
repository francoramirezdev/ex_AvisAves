# AI RULES — AvistAves

Este archivo contiene las reglas que deben seguir las herramientas de inteligencia artificial durante el desarrollo de AvistAves.

El objetivo es mantener un proyecto ordenado, comprensible, mantenible y coherente con los requisitos del examen.

---

# 1. Contexto del proyecto

Antes de realizar cualquier cambio:

1. Leer `BRIEF.md`.
2. Revisar la estructura actual del proyecto.
3. Revisar los archivos relacionados con la tarea.
4. Entender cómo funciona actualmente la aplicación.
5. No asumir que una funcionalidad inexistente debe implementarse sin revisar primero la arquitectura.

El proyecto utiliza:

- React Native
- Expo
- TypeScript
- Expo Router
- expo-camera
- expo-location
- AsyncStorage
- Open-Meteo API

---

# 2. Regla principal

NO implementar toda la aplicación de una sola vez.

Trabajar siempre de forma incremental.

Cada tarea debe resolver una funcionalidad específica y mantener funcionando las funcionalidades existentes.

Antes de realizar cambios importantes:

1. Explicar qué se va a modificar.
2. Indicar qué archivos serán afectados.
3. Explicar brevemente la solución.
4. Implementar los cambios.
5. Revisar posibles errores.

---

# 3. No asumir requisitos

No inventar funcionalidades que no estén definidas en `BRIEF.md` o solicitadas explícitamente por el usuario.

Si existe una decisión técnica importante que no está definida:

- Explicar las alternativas.
- Recomendar una opción.
- Esperar confirmación cuando la decisión pueda afectar la arquitectura.

No agregar funcionalidades innecesarias solamente porque sean técnicamente posibles.

---

# 4. Código

Todo el código debe utilizar TypeScript.

Reglas:

- Evitar `any`.
- Utilizar tipos e interfaces apropiados.
- Utilizar nombres descriptivos.
- Mantener funciones pequeñas.
- Evitar código duplicado.
- Evitar componentes excesivamente grandes.
- Mantener responsabilidades separadas.
- Preferir código simple y fácil de entender.

No utilizar soluciones excesivamente complejas para problemas simples.

El código debe poder ser explicado por un estudiante durante una evaluación.

---

# 5. Componentes

Utilizar componentes reutilizables cuando corresponda.

No duplicar componentes visuales que puedan reutilizarse.

Por ejemplo:

```text
components/
├── Button.tsx
├── Input.tsx
├── Loading.tsx
├── EmptyState.tsx
├── ErrorMessage.tsx
└── SightingCard.tsx
```

Las pantallas deben encargarse principalmente de coordinar la interfaz y la lógica necesaria para esa pantalla.

La lógica reutilizable debe trasladarse a componentes, hooks, servicios o utilidades cuando corresponda.

---

# 6. Arquitectura

Mantener separadas las responsabilidades:

```text
app/          → pantallas y navegación
components/   → componentes reutilizables
services/     → APIs y servicios externos
storage/      → persistencia local
hooks/        → lógica reutilizable de React
types/        → tipos e interfaces
utils/        → funciones auxiliares
constants/    → constantes de la aplicación
```

No colocar toda la lógica de la aplicación dentro de una sola pantalla.

---

# 7. Navegación

Utilizar Expo Router.

Mantener una navegación simple y coherente.

El usuario siempre debe poder:

- Volver atrás.
- Ir al listado.
- Crear un avistamiento.
- Abrir el detalle de un avistamiento.

No crear rutas innecesarias.

---

# 8. Cámara

Utilizar `expo-camera`.

La fotografía debe ser tomada directamente mediante la cámara del dispositivo.

No reemplazar la cámara por un selector de imágenes de la galería.

Manejar correctamente:

- Solicitud de permisos.
- Permiso rechazado.
- Estado de carga.
- Error.
- Captura exitosa.

Nunca dejar la aplicación bloqueada mientras se espera una operación de cámara.

---

# 9. GPS

Utilizar `expo-location`.

La ubicación debe obtenerse automáticamente.

El usuario no debe introducir manualmente las coordenadas.

Obtener:

- Latitud.
- Longitud.

Utilizar `reverseGeocodeAsync` para obtener una representación comprensible de la ubicación.

Manejar correctamente:

- Solicitud de permisos.
- Permiso rechazado.
- GPS no disponible.
- Error.
- Estado de carga.

---

# 10. API del clima

Utilizar Open-Meteo.

La consulta debe utilizar las coordenadas obtenidas mediante GPS.

Guardar junto al avistamiento:

- Temperatura.
- Condición climática.
- Tercer dato climático.

El `weather_code` debe convertirse a información comprensible para el usuario.

No mostrar el código numérico directamente en la interfaz.

---

# 11. Fallos de red

El clima es información complementaria.

Si Open-Meteo falla:

- No bloquear el registro.
- Guardar igualmente el avistamiento.
- Indicar que el clima no está disponible.

Las peticiones deben tener timeout.

No realizar peticiones repetidas innecesariamente.

---

# 12. Persistencia

Utilizar AsyncStorage.

Los avistamientos deben sobrevivir al cierre de la aplicación.

Mantener asociados los datos de:

- Fotografía.
- Ubicación.
- Fecha.
- Ave.
- Cantidad.
- Notas.
- Clima.

Antes de crear una nueva solución de almacenamiento, revisar si AsyncStorage es suficiente.

---

# 13. Estados de la interfaz

Toda operación asíncrona debe comunicar al usuario qué está sucediendo.

Utilizar estados apropiados:

```text
loading
success
error
empty
```

Ejemplos:

- "Obteniendo ubicación..."
- "Tomando fotografía..."
- "Consultando clima..."
- "Guardando avistamiento..."
- "No fue posible obtener el clima."

Nunca mostrar una pantalla aparentemente congelada.

---

# 14. Validaciones

Validar los datos antes de guardar.

No permitir guardar si falta:

- Fotografía.
- Ubicación.
- Nombre del ave.
- Fecha y hora.
- Cantidad de ejemplares.

La cantidad debe ser como mínimo 1.

El nombre puede ser:

```text
no identificada
```

Los mensajes de error deben ser claros y estar relacionados con el campo correspondiente.

---

# 15. Diseño UI/UX

La aplicación está diseñada para utilizarse en terreno.

Priorizar:

- Botones grandes.
- Buen contraste.
- Espaciados consistentes.
- Jerarquía visual clara.
- Texto legible.
- Interacciones simples.
- Uso con una mano.

No utilizar interfaces excesivamente complejas.

Mantener un lenguaje visual consistente entre las tres pantallas.

---

# 16. Listado

Utilizar un componente apropiado para listas grandes, como `FlatList`.

Evitar renderizar manualmente grandes cantidades de elementos con estructuras innecesarias.

El listado debe:

- Mostrar los avistamientos más recientes primero.
- Mostrar fotografía.
- Mostrar nombre.
- Mostrar fecha.
- Mostrar temperatura.
- Permitir ordenar o filtrar.
- Tener un estado vacío.

---

# 17. Manejo de errores

Los errores deben ser útiles para el usuario.

No mostrar únicamente errores técnicos como:

```text
TypeError: undefined is not a function
```

En la interfaz utilizar mensajes comprensibles.

Durante el desarrollo, mantener suficiente información técnica para poder diagnosticar el problema.

---

# 18. Dependencias

No instalar una dependencia nueva sin necesidad.

Antes de agregar un paquete:

1. Revisar si Expo o React Native ya proporcionan una solución.
2. Revisar las dependencias existentes.
3. Evaluar si realmente es necesaria.
4. Explicar por qué se necesita.

No introducir librerías innecesarias.

---

# 19. Modificación de archivos

Antes de modificar un archivo existente:

1. Leerlo.
2. Comprender su propósito.
3. Revisar sus dependencias.
4. Realizar solamente los cambios necesarios.

No sobrescribir archivos completos si solamente es necesario modificar una parte.

No eliminar código existente sin justificarlo.

---

# 20. Seguridad y configuración

No colocar claves API, contraseñas o información sensible directamente en el código.

Open-Meteo no requiere API Key para este proyecto.

No crear secretos innecesarios.

---

# 21. Git

No realizar commits automáticamente.

Después de completar una funcionalidad, sugerir un mensaje de commit utilizando Conventional Commits.

Ejemplos:

```text
feat: add bird sighting form

feat: implement camera capture

feat: add GPS location

feat: integrate weather API

fix: handle location permission error

refactor: improve sighting storage
```

No ejecutar `git push` automáticamente.

---

# 22. Debugging

Cuando exista un error:

NO realizar cambios aleatorios.

Seguir este proceso:

1. Leer el mensaje de error.
2. Identificar el archivo involucrado.
3. Identificar la causa.
4. Explicar el problema.
5. Proponer la solución.
6. Implementar la corrección.
7. Revisar si la corrección afecta otras funcionalidades.

Si no existe suficiente información para identificar la causa, solicitarla.

---

# 23. Antes de finalizar una tarea

Comprobar:

- TypeScript sin errores.
- Imports correctos.
- Rutas funcionando.
- Componentes correctamente utilizados.
- Estados de loading/error/empty.
- Manejo de permisos.
- Persistencia.
- No existen dependencias innecesarias.
- No se rompieron funcionalidades existentes.

Indicar al usuario cómo probar la funcionalidad implementada.

---

# 24. Enfoque académico

El proyecto debe ser técnicamente correcto, pero también fácil de comprender y defender.

Cuando se utilice una solución importante, explicar brevemente:

- Qué hace.
- Por qué se utiliza.
- Dónde está implementada.

Evitar abstraer innecesariamente el código.

La solución final debe permitir explicar claramente la arquitectura y los patrones utilizados en el informe.

---

# 25. Regla final

La prioridad es:

1. Cumplir los requisitos del proyecto.
2. Mantener la aplicación funcional.
3. Mantener el código simple.
4. Mantener una arquitectura ordenada.
5. Evitar complejidad innecesaria.
6. Permitir que el desarrollador comprenda y pueda defender todo el código generado.

No implementar cambios fuera del alcance de la tarea solicitada.
