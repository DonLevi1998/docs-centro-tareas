
#  Componente `ColumnaBoardComponent`

##  Ubicación
`src/app/tableros/columnas/columna-board/columna-board.component.ts`

##  Funcionalidad Principal
Este componente es el núcleo de la visualización y gestión de **columnas** en un tablero Kanban. Incluye funcionalidades como:
- Cargar columnas y tareas por tablero.
- Crear, renombrar y eliminar columnas.
- Reordenar columnas mediante drag-and-drop.
- Invitar miembros al tablero.
- Visualizar, crear y mover tareas entre columnas.
- Mostrar modales de creación y detalle de tareas.

---

##  Propiedades importantes
| Propiedad | Tipo | Descripción |
|----------|------|-------------|
| `tableroId` | `number` | ID del tablero actual, obtenido desde la ruta. |
| `columnas` | `Columna[]` | Arreglo de columnas con sus respectivas tareas. |
| `rolUsuario` | `RolTableroDTO` | Rol del usuario autenticado en el tablero. |
| `miembros` | `MiembroSimpleDTO[]` | Miembros actuales del tablero. |
| `modalAbierto` | `boolean` | Controla la apertura del modal para crear tareas. |

---

##  Interfaces Locales

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

---

##  Funciones Relevantes

### 🔁 `ngOnInit()`
Inicializa el componente:
- Verifica autenticación.
- Obtiene ID del tablero.
- Carga columnas, tareas y roles de usuario.

###  `obtenerColumnas()`
Obtiene todas las columnas del backend y, si no existen, crea las tres columnas iniciales: “Por hacer”, “En proceso”, y “Completado”.

###  `renombrarColumna(columna)`
Actualiza el nombre de una columna editada.

###  `agregarColumna()`
Agrega una nueva columna con nombre predeterminado.

###  `eliminarColumna(id)`
Elimina una columna seleccionada del tablero con confirmación.

###  `onDrop()`
Reordena las columnas horizontalmente y actualiza el orden en backend (drag-and-drop).

###  `obtenerMiembros()`
Unifica y obtiene todos los miembros del tablero: creador, colaboradores y veedores.

###  `abrirModalDetalleTarea(id)` / `abrirModalAgregarTarea(id)`
Controla la apertura de los modales de detalle y creación de tareas respectivamente.

---


###  Interacción con el Backend

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

---

###  Roles y permisos de usuario

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

###  Funciones clave del componente

A continuación se detallan las funciones centrales que gestionan las interacciones de columnas y tareas:

- **`obtenerColumnas()`**  
  Consulta al backend las columnas del tablero. Si no existen, llama a `crearColumnaInicial()`.

- **`crearColumnaInicial()`**  
  Crea tres columnas base: `Por hacer`, `En proceso` y `Completado`.

- **`agregarColumna()`**  
  Agrega una nueva columna al final del tablero actual.

- **`renombrarColumna(columna)` y `confirmarRenombre(columna)`**  
  Permiten editar y guardar el nuevo nombre de una columna.

- **`eliminarColumna(columnaId)`**  
  Elimina la columna seleccionada tras confirmar vía un cuadro de diálogo (`ConfirmationService`).

- **`onDrop(event)`**  
  Permite cambiar el orden de las columnas usando `CdkDragDrop`. Envía los nuevos índices al backend para persistencia.

- **`moverTarea(evento)`**  
  Se ejecuta cuando una tarea cambia de columna. Actualiza localmente la UI y sincroniza el cambio con el backend.

- **`abrirModalAgregarTarea(columnaId)` y `cerrarModalTarea()`**  
  Controlan la apertura y cierre del modal de creación de tareas. Tras cerrarse, se refrescan las columnas.

- **`abrirModalDetalleTarea(tareaId)` y `cerrarModalDetalleTarea()`**  
  Gestionan la visualización del detalle de una tarea específica. Al cerrar, se refresca la columna correspondiente.


##  Integraciones
- **PrimeNG** para diálogos y mensajes.
- **Angular CDK** para drag-and-drop.
- **HttpClient** para conexión con backend.
- **Servicios propios** como `empresaActivaService`.
