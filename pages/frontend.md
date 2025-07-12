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

#### Detalle: ColumnaBoardComponent

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

| Método | Endpoint                                                                 | Propósito                                                  |
|--------|--------------------------------------------------------------------------|------------------------------------------------------------|
| `GET`  | `/tableros/usuario/{usuarioId}`                                          | Obtener los tableros a los que el usuario tiene acceso.   |
| `GET`  | `/roles/tableros/{tableroId}/usuarios/{usuarioId}/mi-rol`               | Obtener el rol del usuario dentro del tablero.            |
| `GET`  | `/columnas/tablero/{tableroId}`                                          | Listar columnas del tablero actual.                       |
| `GET`  | `/tareas/columna/{columnaId}`                                           | Obtener tareas asociadas a una columna específica.        |
| `POST` | `/columnas`                                                             | Crear una nueva columna.                                  |
| `PUT`  | `/columnas/{columnaId}/renombrar`                                       | Actualizar el nombre de una columna.                      |
| `PUT`  | `/columnas/orden`                                                       | Actualizar el orden de todas las columnas.                |
| `DELETE` | `/columnas/eliminar/{columnaId}`                                      | Eliminar una columna del tablero.                         |
| `PUT`  | `/tableros/{tableroId}/renombrar`                                       | Renombrar el tablero actual.                              |
| `GET`  | `/tableros/{tableroId}/miembros`                                        | Obtener todos los miembros (creador, colaboradores, veedores). |
| `PUT`  | `/tareas/{tareaId}/mover`                                               | Mover una tarea a otra columna y cambiar su orden.        |

##### Roles y permisos de usuario

El sistema contempla tres tipos de roles dentro de cada tablero:
- **Creador (`esCreador`)**: Tiene todos los permisos habilitados: puede editar el nombre del tablero, agregar/eliminar columnas, mover tareas y gestionar miembros.
- **Colaborador (`esColaborador`)**: Puede agregar columnas y tareas, mover tareas y cambiar nombres, pero no puede invitar a otros usuarios ni renombrar el tablero.
- **Veedor (`esVeedor`)**: Tiene acceso de solo lectura. No puede realizar acciones modificables.

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
- **obtenerColumnas()**: Consulta al backend las columnas del tablero. Si no existen, llama a `crearColumnaInicial()`.
- **crearColumnaInicial()**: Crea tres columnas base: `Por hacer`, `En proceso` y `Completado`.
- **agregarColumna()**: Agrega una nueva columna al final del tablero actual.
- **renombrarColumna(columna)** y **confirmarRenombre(columna)**: Permiten editar y guardar el nuevo nombre de una columna.
- **eliminarColumna(columnaId)**: Elimina la columna seleccionada tras confirmar vía un cuadro de diálogo (`ConfirmationService`).
- **onDrop(event)**: Permite cambiar el orden de las columnas usando `CdkDragDrop`. Envía los nuevos índices al backend para persistencia.
- **moverTarea(evento)**: Se ejecuta cuando una tarea cambia de columna. Actualiza localmente la UI y sincroniza el cambio con el backend.
- **abrirModalAgregarTarea(columnaId)** y **cerrarModalTarea()**: Controlan la apertura y cierre del modal de creación de tareas. Tras cerrarse, se refrescan las columnas.
- **abrirModalDetalleTarea(tareaId)** y **cerrarModalDetalleTarea()**: Gestionan la visualización del detalle de una tarea específica. Al cerrar, se refresca la columna correspondiente.

##### Integraciones
- **PrimeNG** para diálogos y mensajes.
- **Angular CDK** para drag-and-drop.
- **HttpClient** para conexión con backend.
- **Servicios propios** como `empresaActivaService`.

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
