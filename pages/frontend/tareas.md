# Gestión de tareas

El sistema de tareas permite a los usuarios crear, visualizar y consultar detalles de actividades dentro de cada columna del tablero. Este módulo está dividido en tres componentes principales.

## Estructura

Ubicación: `src/app/tableros/columnas/`

- `tarea-card/`: Vista general de tareas en la columna.
- `crear-tarea-modal/`: Modal emergente para registrar nuevas tareas.
- `detalle-tarea-modal/`: Modal de detalle que muestra información extendida.

---

## tarea-card

Componente que representa visualmente una tarea dentro de la columna.

- **Ubicación**: `tableros/columnas/tarea-card/`
- **Contenido visible**:
  - Título de la tarea
  - Icono o color que representa prioridad
  - Estado (completado o no), editable si no es veedor
- **Interacciones**:
  - Al hacer clic, se abre el `detalle-tarea-modal`.
  - Se permite marcar como completada o eliminar si no se es veedor.
- **Responsabilidad**: Presentar de forma concisa las tareas existentes en cada columna.

---

## crear-tarea-modal

Componente tipo modal que aparece tras presionar el botón **"Añadir Tarea"**.

- **Ubicación**: `tableros/columnas/crear-tarea-modal/`
- **Campos del formulario**:
  - `Título` (obligatorio)
  - `Descripción`
  - `Fecha inicio` y `Fecha fin`
  - `Responsable`: Solo los usuarios con rol de *colaborador*
  - `Etiquetas`: Selección múltiple (opcional)
  - `Prioridad`: Selector de tipo `p-dropdown` con tres niveles (`Bajo`, `Medio`, `Alto`)
- **Validaciones**:
  - El título y el responsable son requeridos.
  - No se permite elegir un veedor como responsable.
- **Al guardar**:
  - Se realiza una solicitud al backend para crear la tarea.
  - Se actualiza dinámicamente la columna sin recargar toda la vista.
  - El modal se cierra automáticamente tras guardar exitosamente.

---

## detalle-tarea-modal

Muestra la información completa de una tarea en un modal expandido.

- **Ubicación**: `tableros/columnas/detalle-tarea-modal/`
- **Contenido**:
  - Título y descripción (modo solo lectura o editable)
  - Responsable asignado
  - Etiquetas con estilo de hashtags (rellenados con su color)
  - Fechas
  - Comentarios (módulo aparte)
  - Adjuntos (módulo de archivos)
- **Restricciones**:
  - Solo los colaboradores pueden editar tareas.
  - Veedores solo pueden comentar y visualizar.

---

## Flujo de creación de tareas

1. El usuario hace clic en el botón **"Añadir Tarea"** al final de la columna.
2. Se despliega el componente `crear-tarea-modal`.
3. El usuario llena el formulario y presiona **Guardar**.
4. La tarea se crea en el backend.
5. Se actualiza la vista del componente `columna-board` para mostrar la nueva tarea.
6. El modal se cierra automáticamente.

---

## Consideraciones

- Las tareas se agrupan y ordenan por columna.
- Se planea agregar funcionalidades de arrastrar y soltar (`drag & drop`) en futuras versiones.
- Los módulos de comentarios y archivos adjuntos están desacoplados y se documentan por separado.

---

