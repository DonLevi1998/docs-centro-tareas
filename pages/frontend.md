# Frontend

## Descripción
El frontend está desarrollado en Angular y usando PrimeNG. El sistema permite la gestión visual de tableros, columnas y tareas, así como la administración de invitaciones y asignación de roles al usuario.

## Estructura principal
- **app/**: Componentes principales (tableros, tareas, usuarios, invitaciones, login, etc.)
- **assets/**: Recursos estáticos
- **environments/**: Configuración de entornos

## Instalación y ejecución
1. Instala las dependencias, dentro del fichero sakai-tareas/frontend-tareas:
   ```bash
   cd frontend-tareas
   npm install
   ```
2. Inicia la aplicación:
   ```bash
   ng serve
   ```
3. Accede a `http://localhost:4200/` para visualizar la interfaz gráfica del sistema

## Funcionalidades clave
- Visualización y gestión de tableros y tareas
- Drag & drop entre columnas
- Autenticación de usuarios
- Invitaciones y roles

## Explicación de la estructura del frontend

Este proyecto fue realizado sobre la plantilla de SakaiNG de Angular, por lo que varias de las carpetas internas y funcionalidades no se muestran al usuario, ya que no se correlacionan como tal con el proyecto.
Las únicas carpetas que tienen que ver con la funcionalidad del proyecto son:

```text
frontend-tareas/       
├── src/
    ├── app/           
    │   ├── empresas/      (módulo empresas)   
    │   ├── invitaciones/  (módulo invitaciones) 
    │   ├── login/         (módulo login) 
    │   ├── tableros/      (módulo tableros) 
    │   ├── usuarios/      (módulo usuarios) 
    │   ├── etiquetas/     (módulo etiquetas) 
    │   ├── layout/ 
    │   │    └── config/   (sidebar derecho info usuario)
    │   │          ├── app.config.component.html
    │   │          ├── app.config.component.ts
    │   │          └── config.module.ts
    │   ├── app-routing.module.ts         
    │   ├── app.component.html
    │   ├── app.component.ts
    │   └── app.module.ts
    ├── assets/   
    │   └── layout/
    │       ├── images/ 
    │       │     └── Strateggie.png (logo)
    │       └── styles/
    │              └── theme/
    │                    └──ideasgroup
    │                          └──theme.css (tema)
    └── environments/ 
        ├── environment.prod.ts/
        └── environment.ts/ 
```

---

## Desglose de módulos y archivos principales

A continuación se describe cada módulo funcional y los archivos clave que lo conforman:

### empresas/
- **empresa.service.ts**: Lógica y métodos para gestión de empresas (peticiones a API, lógica de negocio).
- **empresa-activa.service.ts**: Servicio para manejar la empresa activa en la sesión.
- **empresa.interface.ts**: Interfaces TypeScript para tipado de datos de empresa.

### invitaciones/
- **invitaciones.module.ts**: Módulo Angular para invitaciones.
- **invitacion.service.ts**: Lógica para enviar y gestionar invitaciones.
- **invitar-usuario.dto.ts**: DTO para invitar usuarios.
- **rol-participante.enum.ts**: Enum para roles de participantes.
- **enumKeys.pipe.ts**: Pipe para manipulación de enums en plantillas.
- **invitacion-dialog/**: Componentes visuales para diálogos de invitación.

### login/
- **login.module.ts**: Módulo Angular para login.
- **login-routing.module.ts**: Rutas del módulo login.
- **login.component.ts**: Lógica y métodos del componente de login.
- **login.component.html**: Vista del formulario de login.
- **models/**: Modelos de datos para login.
- **services/**: Servicios auxiliares para autenticación.

### tableros/
- **tableros.module.ts**: Módulo principal de tableros.
- **tableros-routing.module.ts**: Rutas del módulo tableros.
- **tablero.service.ts**: Lógica de negocio y acceso a API para tableros.
- **tablero.interface.ts**: Interfaces de datos de tableros.
- **tablero-list/**: Componente de listado de tableros.
- **columnas/**: Submódulo de columnas, incluye:
  - **columnas.module.ts**: Módulo de columnas.
  - **columna-board/**: Componente visual de columna (TS, HTML, SCSS).
  - **comentarios/**: Componente de comentarios de tarea.
  - **crear-tarea-modal/**: Modal para crear tareas.
  - **detalle-tarea-modal/**: Modal de detalle de tarea.
  - **tarea-card/**: Componente visual de tarjeta de tarea, incluye carga de archivos.

#### Columnas/


##### Ubicación
`src/app/tableros/columnas/columna-board/columna-board.component.ts`

##### Funcionalidad Principal
Este componente es el núcleo de la visualización y gestión de **columnas** en un tablero Kanban. Incluye funcionalidades como:
- Cargar columnas y tareas por tablero.
- Crear, renombrar y eliminar columnas.
- Reordenar columnas mediante drag-and-drop.
- Invitar miembros al tablero.
- Visualizar, crear y mover tareas entre columnas.
- Mostrar modales de creación y detalle de tareas.

##### Propiedades importantes
| Propiedad | Tipo | Descripción |
|----------|------|-------------|
| `tableroId` | `number` | ID del tablero actual, obtenido desde la ruta. |
| `columnas` | `Columna[]` | Arreglo de columnas con sus respectivas tareas. |
| `rolUsuario` | `RolTableroDTO` | Rol del usuario autenticado en el tablero. |
| `miembros` | `MiembroSimpleDTO[]` | Miembros actuales del tablero. |
| `modalAbierto` | `boolean` | Controla la apertura del modal para crear tareas. |

##### Interfaces Locales
```ts
interface Columna {
  id: number;
  nombre: string;
  orden: number;
  tareas: Tarea[];
  editando?: boolean;
}

interface Tarea {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  fechaInicio?: string;
  fechaFin?: string;
  fechaNotificacion?: string;
  etiquetas?: Etiqueta[];
  orden: number;
}
```

##### Funciones Relevantes
- **ngOnInit()**: Inicializa el componente, verifica autenticación, obtiene ID del tablero y carga columnas, tareas y roles de usuario.
- **obtenerColumnas()**: Obtiene todas las columnas del backend y, si no existen, crea las tres columnas iniciales: “Por hacer”, “En proceso”, y “Completado”.
- **renombrarColumna(columna)**: Actualiza el nombre de una columna editada.
- **agregarColumna()**: Agrega una nueva columna con nombre predeterminado.
- **eliminarColumna(id)**: Elimina una columna seleccionada del tablero con confirmación.
- **onDrop()**: Reordena las columnas horizontalmente y actualiza el orden en backend (drag-and-drop).
- **obtenerMiembros()**: Unifica y obtiene todos los miembros del tablero: creador, colaboradores y veedores.
- **abrirModalDetalleTarea(id) / abrirModalAgregarTarea(id)**: Controla la apertura de los modales de detalle y creación de tareas respectivamente.

##### Interacción con el Backend

El componente `ColumnaBoardComponent` se comunica con múltiples endpoints del backend REST para realizar operaciones CRUD y consultar roles o permisos. A continuación, se resumen las rutas utilizadas y su funcionalidad:

| Método | Endpoint | Propósito |
|--------|--------------------------------------------------------------------------|------------------------------------------------------------|
| `GET` | `/tableros/usuario/{usuarioId}` | Obtener los tableros a los que el usuario tiene acceso. |
| `GET` | `/roles/tableros/{tableroId}/usuarios/{usuarioId}/mi-rol` | Obtener el rol del usuario dentro del tablero. |
| `GET` | `/columnas/tablero/{tableroId}` | Listar columnas del tablero actual. |
| `GET` | `/tareas/columna/{columnaId}` | Obtener tareas asociadas a una columna específica. |
| `POST` | `/columnas` | Crear una nueva columna. |
| `PUT` | `/columnas/{columnaId}/renombrar` | Actualizar el nombre de una columna. |
| `PUT` | `/columnas/orden` | Actualizar el orden de todas las columnas. |
| `DELETE` | `/columnas/eliminar/{columnaId}` | Eliminar una columna del tablero. |
| `PUT` | `/tableros/{tableroId}/renombrar` | Renombrar el tablero actual. |
| `GET` | `/tableros/{tableroId}/miembros` | Obtener todos los miembros (creador, colaboradores, veedores). |
| `PUT` | `/tareas/{tareaId}/mover` | Mover una tarea a otra columna y cambiar su orden. |

##### Roles y permisos de usuario

El sistema contempla tres tipos de roles dentro de cada tablero:
- **Creador (`esCreador`)**  
  Tiene todos los permisos habilitados: puede editar el nombre del tablero, agregar/eliminar columnas, mover tareas y gestionar miembros.
- **Colaborador (`esColaborador`)**  
  Puede agregar columnas y tareas, mover tareas y cambiar nombres, pero no puede invitar a otros usuarios ni renombrar el tablero.
- **Veedor (`esVeedor`)**  
  Tiene acceso de solo lectura. No puede realizar acciones modificables.

La determinación del rol se realiza al consultar el endpoint de roles por usuario y tablero:
```ts
this.http.get<RolTableroDTO>(`${api}/roles/tableros/${tableroId}/usuarios/${usuarioId}/mi-rol`)
```
Basado en el rol (0, 1 o 2), se setean las siguientes variables:
```ts
this.esCreador = rol.esCreador;
this.esColaborador = !rol.esCreador && rol.rol === 1;
this.esVeedor = rol.rol === 0;
```

##### Funciones clave del componente
A continuación se detallan las funciones centrales que gestionan las interacciones de columnas y tareas:
- **obtenerColumnas()**  
  Consulta al backend las columnas del tablero. Si no existen, llama a `crearColumnaInicial()`.
- **crearColumnaInicial()**  
  Crea tres columnas base: `Por hacer`, `En proceso` y `Completado`.
- **agregarColumna()**  
  Agrega una nueva columna al final del tablero actual.
- **renombrarColumna(columna)** y **confirmarRenombre(columna)**  
  Permiten editar y guardar el nuevo nombre de una columna.
- **eliminarColumna(columnaId)**  
  Elimina la columna seleccionada tras confirmar vía un cuadro de diálogo (`ConfirmationService`).
- **onDrop(event)**  
  Permite cambiar el orden de las columnas usando `CdkDragDrop`. Envía los nuevos índices al backend para persistencia.
- **moverTarea(evento)**  
  Se ejecuta cuando una tarea cambia de columna. Actualiza localmente la UI y sincroniza el cambio con el backend.
- **abrirModalAgregarTarea(columnaId)** y **cerrarModalTarea()**  
  Controlan la apertura y cierre del modal de creación de tareas. Tras cerrarse, se refrescan las columnas.
- **abrirModalDetalleTarea(tareaId)** y **cerrarModalDetalleTarea()**  
  Gestionan la visualización del detalle de una tarea específica. Al cerrar, se refresca la columna correspondiente.

##### Integraciones
- **PrimeNG** para diálogos y mensajes.
- **Angular CDK** para drag-and-drop.
- **HttpClient** para conexión con backend.
- **Servicios propios** como `empresaActivaService`.

---

### Módulo de Comentarios

Gestión de comentarios dentro de las tareas para mantener trazabilidad y comunicación.

#### Componentes
- `comentarios-tarea.component.ts`: Lista y gestiona los comentarios relacionados a una tarea.

#### Funcionalidades
- Añadir, editar o eliminar comentarios propios.
- Listado cronológico.
- Asociación con usuarios invitados (colaboradores y veedores).

---

### Módulo de Etiquetas

Permite etiquetar tareas con categorías personalizadas por tablero.

#### Componentes y servicios involucrados
- `SelectorEtiquetasComponent`: componente visual que permite seleccionar, crear, editar y eliminar etiquetas asociadas a un tablero.
- `EtiquetasService`: servicio que gestiona todas las operaciones HTTP con el backend.
- `Etiqueta`: interfaz que representa el modelo de datos de una etiqueta `{ id, nombre, color }`.


#### Funcionalidades
- Visualización de etiquetas como "hashtags".
- Asignación rápida desde el modal de tarea.
- Gestión de colores por etiqueta.

---

### Módulo de Invitaciones

Permite invitar nuevos usuarios a los tableros como colaboradores o veedores.

#### Componentes
- `invitacion-dialog.component.ts`: Modal de invitación.
- `invitar-usuario.dto.ts`: Define el DTO de invitación.

#### Funcionalidades principales

**Visualización y selección**

- Listado de todas las etiquetas disponibles en un tablero.
- Las etiquetas ya asignadas a la tarea aparecen marcadas.
- Soporte visual para ver el color y nombre de cada etiqueta.


**Crear etiqueta**

- Se puede crear una nueva etiqueta proporcionando nombre y color.
- Se usa `etiquetasService.crearEtiqueta()` para persistir la etiqueta.

**Editar etiqueta**

- Se puede modificar el nombre y color de una etiqueta existente.
- Cambios enviados al backend con `actualizarEtiqueta()`.

**Eliminar etiqueta**
- Se utiliza una confirmación de Primeng (`ConfirmationService`) antes de eliminar.
- Al eliminar una etiqueta también se remueve de la tarea si estaba seleccionada.

**Asignar/desasignar etiquetas**

- Las etiquetas se asignan o eliminan directamente desde la tarea en tiempo real.
- Se maneja con `asignarEtiqueta()` y `eliminarEtiquetaDeTarea()`.

**Modo standalone**

- El componente puede funcionar de forma autónoma al crear una tarea nueva, sin requerir que esta ya exista.
- En este modo, se habilita un botón **Guardar cambios** que emite los IDs de etiquetas seleccionadas.


 **Eventos emitidos**

El componente emite varios eventos hacia el componente padre:

| Evento | Descripción |
|--------|-------------|
| `etiquetasActualizadas` | Devuelve el array actualizado de IDs de etiquetas seleccionadas |
| `etiquetasGuardadas`    | Se emite cuando se guardan todos los cambios de etiquetas (modo standalone) |
| `etiquetaCreada`        | Devuelve el objeto de la nueva etiqueta creada |
| `actualizar`            | Emite una señal para que el componente padre refresque los datos (por ejemplo, tareas o etiquetas) |

---

**Servicios utilizados**

`EtiquetasService` incluye los siguientes métodos:

- `obtenerEtiquetas`(tableroId: number)
- `crearEtiqueta`(tableroId: number, nombre: string, color: string)
- `actualizarEtiqueta`(id: number, nombre: string, color: string)
- `eliminarEtiqueta`(id: number)
- `asignarEtiqueta`(tareaId: number, etiquetaId: number)
- `eliminarEtiquetaDeTarea`(tareaId: number, etiquetaId: number)
- `desasignarEtiqueta`(tareaId: number, etiquetaId: number)

---

**Consideraciones**

- Las etiquetas se cargan por `tableroId` al inicializar el componente (`ngOnInit`).
- El contraste del color de texto se calcula automáticamente con `getContrastColor()`.
- El componente es reutilizable tanto para tareas existentes como para nuevas (modo crear).

---

**Ejemplo de uso**

```html
<app-selector-etiquetas
  [tableroId]="idTablero"
  [tareaId]="idTarea"
  [etiquetasIniciales]="tarea.etiquetas"
  [modoStandalone]="false"
  (etiquetasActualizadas)="actualizarEtiquetas($event)"
  (etiquetasGuardadas)="cerrarModal()"
></app-selector-etiquetas>
```

---

### Módulo de Login

Sistema de autenticación de usuarios con formulario de acceso.

#### Archivos
- `login.component.ts/html`: Vista y lógica del formulario de inicio de sesión.
- `auth.service.ts`: Servicio encargado de comunicarse con el backend y almacenar sesión.

#### Funcionalidades
- Validación de usuario y contraseña.
- Llamada al endpoint `/api/usuarios/login`.
- Almacenamiento en `localStorage` o `sessionStorage`.

---

### Gestión de tareas

El sistema de tareas permite a los usuarios crear, visualizar y consultar detalles de actividades dentro de cada columna del tablero. Este módulo está dividido en tres componentes principales.

#### Estructura
Ubicación: `src/app/tableros/columnas/`
- `tarea-card/`: Vista general de tareas en la columna.
- `crear-tarea-modal/`: Modal emergente para registrar nuevas tareas.
- `detalle-tarea-modal/`: Modal de detalle que muestra información extendida.

#### tarea-card
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

#### crear-tarea-modal
Componente tipo modal que aparece tras presionar el botón **"Añadir Tarea"**.
- **Ubicación**: `tableros/columnas/crear-tarea-modal/`
- **Campos del formulario**:
  - `Título` (obligatorio)
  - `Descripción`
  - `Fecha inicio` y `Fecha fin`
  - `Responsable`: Solo los usuarios con rol de _colaborador_
  - `Etiquetas`: Selección múltiple (opcional)
  - `Prioridad`: Selector de tipo `p-dropdown` con tres niveles `Bajo`, `Medio`, `Alto`)
- **Validaciones**:
  - El título y el responsable son requeridos.
  - No se permite elegir un veedor como responsable.
- **Al guardar**:
  - Se realiza una solicitud al backend para crear la tarea.
  - Se actualiza dinámicamente la columna sin recargar toda la vista.
  - El modal se cierra automáticamente tras guardar exitosamente.

#### detalle-tarea-modal
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

#### Flujo de creación de tareas
1. El usuario hace clic en el botón **"Añadir Tarea"** al final de la columna.
2. Se despliega el componente `crear-tarea-modal`.
3. El usuario llena el formulario y presiona **Guardar**.
4. La tarea se crea en el backend.
5. Se actualiza la vista del componente `columna-board` para mostrar la nueva tarea.
6. El modal se cierra automáticamente.

#### Consideraciones
- Las tareas se agrupan y ordenan por columna.
- Se planea agregar funcionalidades de arrastrar y soltar (`drag & drop`) en futuras versiones.
- Los módulos de comentarios y archivos adjuntos están desacoplados y se documentan por separado.

---

### usuarios/
- **crear-usuario.component.ts**: Lógica y métodos para crear usuarios.
- **crear-usuario.component.html**: Vista del formulario de creación de usuario.

### etiquetas/
- **etiquetas.module.ts**: Módulo Angular para etiquetas.
- **etiquetas.service.ts**: Lógica para gestión de etiquetas.
- **etiqueta.interface.ts**: Interfaces de datos de etiquetas.
- **selector-etiquetas/**: Componente visual para seleccionar etiquetas.

### layout/
- **app.layout.module.ts**: Módulo de layout general.
- **app.layout.component.ts/html**: Lógica y vista del layout principal.
- **app.menu.component.ts/html**: Lógica y vista del menú lateral.
- **app.sidebar.component.ts/html**: Lógica y vista del sidebar.
- **app.topbar.component.ts/html/scss**: Lógica, vista y estilos del topbar.
- **config/**: Configuración visual y de usuario.

---

### ¿Cómo identificar y modificar funcionalidades?

- **Lógica y métodos**: Archivos `.ts` (componentes, servicios, interfaces) dentro del módulo correspondiente.
- **Visualización**: Archivos `.html` del componente que deseas cambiar.
- **Estilos**: Archivos `.css` o `.scss` asociados al componente.
- **Rutas**: Archivos `*-routing.module.ts` o `*.module.ts` del módulo correspondiente.

Esta estructura modular permite localizar y modificar fácilmente cualquier funcionalidad, vista o estilo del sistema.
