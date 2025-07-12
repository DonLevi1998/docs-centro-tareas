# Backend

## Descripción
El backend expone una API RESTful para la gestión de usuarios, tableros, columnas, tareas, etiquetas, invitaciones y comentarios.

## Estructura principal
- **Controllers**: Gestionan las rutas y lógica de cada recurso (Tablero, Tarea, Usuario, etc.)
- **Entities**: Representan las tablas y objetos de dominio.
- **Services**: Lógica de negocio y utilidades (notificaciones, emails, archivos).
- **Middleware**: Validación de tokens y seguridad.

## Instalación y ejecución
1. Configura la cadena de conexión a la base de datos en [`appsettings.json`](/pages/despliegue.md#configuración-de-la-cadena-de-conexión-appsettingsjson).
2. Acceda a backend-tareas
 ```bash
    cd backend-tareas
   ```
3. Despues ejecute el comando para actualizar las migraciones a su base de datos seleccionada
 ```bash
   dotnet ef database update
   ```
3. En caso de no tener migraciones en el fichero backend-tareas/Migrations, cree una nueva migracion con el comando:
 ```bash
   dotnet ef migrations add NombreDeLaMigracion
   ```
Despues vuelva a ejecutar el comando del paso 2.

4. Inicia el backend:
```bash
   dotnet run
  ```


# Endpoints principales
- /api/Tablero
- /api/Tareas
- /api/Usuario
- /api/Columna
- /api/Etiquetas
- /api/Invitaciones

# Endpoints

Todos los endpoints del backend pueden ser probados fácilmente mediante la interfaz Swagger disponible en:

[http://localhost:5080/swagger/index.html](http://localhost:5080/swagger/index.html)

A continuación se listan los endpoints organizados por controlador, con ejemplos de requests y responses, y una breve explicación de cada uno.

---

## ColumnaController (`api/columnas`)

### **POST /api/columnas**
Crea una nueva columna en un tablero específico.

**Request body:**
```json
{
  "tableroId": 0,
  "nombre": "string",
  "orden": 0
}
```
**Request URL:**
```
http://localhost:5080/api/columnas
```
**Response body:**
```json
{
  "mensaje": "Columna creada",
  "id": 32
}
```
**Descripción:**
Crea una columna asociada a un tablero existente. El campo `tableroId` debe corresponder a un tablero válido. El campo `orden` determina la posición de la columna dentro del tablero.

---

### **GET /api/columnas/tablero/{tableroId}**
Obtiene todas las columnas de un tablero, incluyendo sus tareas ordenadas.

**Request URL:**
```
http://localhost:5080/api/columnas/tablero/5
```
**Response body:**
```json
[
  {
    "id": 1,
    "nombre": "Pendientes",
    "orden": 0,
    "tareas": [ ... ]
  },
  ...
]
```
**Descripción:**
Devuelve la lista de columnas de un tablero específico, ordenadas por el campo `orden`. Cada columna incluye sus tareas asociadas.

---

### **PUT /api/columnas/orden**
Actualiza el orden de varias columnas en un tablero.

**Request body:**
```json
[
  { "id": 1, "orden": 0 },
  { "id": 2, "orden": 1 }
]
```
**Request URL:**
```
http://localhost:5080/api/columnas/orden
```
**Response body:**
```json
{
  "mensaje": "Orden actualizado"
}
```
**Descripción:**
Permite actualizar el orden de múltiples columnas enviando una lista de objetos con el `id` de la columna y su nuevo `orden`.

---

### **PUT /api/columnas/{id}/renombrar**
Cambia el nombre de una columna existente.

**Request body:**
```json
{
  "nombre": "Nuevo nombre"
}
```
**Request URL:**
```
http://localhost:5080/api/columnas/5/renombrar
```
**Response body:**
```json
{
  "mensaje": "Nombre actualizado"
}
```
**Descripción:**
Permite cambiar el nombre de una columna existente identificada por su `id`.

---

### **DELETE /api/columnas/eliminar/{id}**
Elimina una columna por su ID.

**Request URL:**
```
http://localhost:5080/api/columnas/eliminar/5
```
**Response body:**
```json
{
  "mensaje": "Columna eliminada"
}
```
**Descripción:**
Elimina la columna especificada por su `id` y todas sus relaciones asociadas.

---

## ComentariosController (`api/comentarios`)

### **GET /api/comentarios/tarea/{tareaId}**
Obtiene los comentarios de una tarea específica.

**Request URL:**
```
http://localhost:5080/api/comentarios/tarea/10
```
**Response body:**
```json
[
  {
    "id": 1,
    "usuarioId": 2,
    "usuarioNombre": "Juan",
    "contenido": "Comentario de ejemplo"
  },
  ...
]
```
**Descripción:**
Devuelve la lista de comentarios asociados a una tarea, incluyendo el nombre del usuario que comentó.

---

### **POST /api/comentarios**
Crea un nuevo comentario en una tarea.

**Request body:**
```json
{
  "tareaId": 10,
  "usuarioId": 2,
  "contenido": "Nuevo comentario"
}
```
**Request URL:**
```
http://localhost:5080/api/comentarios
```
**Response body:**
```json
{
  "id": 5,
  "usuarioId": 2,
  "usuarioNombre": "Juan",
  "contenido": "Nuevo comentario"
}
```
**Descripción:**
Crea un comentario asociado a una tarea y usuario existentes.

---

### **PUT /api/comentarios/{id}**
Actualiza el contenido de un comentario existente.

**Request body:**
```json
{
  "contenido": "Comentario editado"
}
```
**Request URL:**
```
http://localhost:5080/api/comentarios/5
```
**Response body:**

Sin contenido (204 No Content)

**Descripción:**
Edita el contenido de un comentario identificado por su `id`.

---

### **DELETE /api/comentarios/{id}**
Elimina un comentario por su ID.

**Request URL:**
```
http://localhost:5080/api/comentarios/5
```
**Response body:**

Sin contenido (204 No Content)

**Descripción:**
Elimina el comentario especificado por su `id`.

---

## EmpresaController (`api/empresas`)

### **GET /api/empresas/empresas/{empresaId}/usuarios-disponibles?tableroId=**
Obtiene los usuarios disponibles de una empresa para invitar a un tablero (excluye al anfitrión y ya invitados).

**Request URL:**
```
http://localhost:5080/api/empresas/empresas/1/usuarios-disponibles?tableroId=2
```
**Response body:**
```json
[
  {
    "id": 3,
    "nombre": "Ana",
    "correo": "ana@email.com",
    "telefono": "123456789"
  },
  ...
]
```
**Descripción:**
Devuelve la lista de usuarios de una empresa que pueden ser invitados a un tablero, excluyendo al anfitrión y a los ya invitados.

---

## EtiquetasController (`api/etiquetas`)

### **GET /api/etiquetas/tablero/{tableroId}**
Obtiene las etiquetas asociadas a un tablero.

**Request URL:**
```
http://localhost:5080/api/etiquetas/tablero/5
```
**Response body:**
```json
[
  {
    "id": 1,
    "nombre": "Urgente",
    "color": "#FF0000"
  },
  ...
]
```
**Descripción:**
Devuelve la lista de etiquetas asociadas a un tablero específico.

---

### **POST /api/etiquetas**
Crea una nueva etiqueta en un tablero.

**Request body:**
```json
{
  "tableroId": 5,
  "nombre": "Nueva etiqueta",
  "color": "#00FF00"
}
```
**Request URL:**
```
http://localhost:5080/api/etiquetas
```
**Response body:**
```json
{
  "id": 10,
  "nombre": "Nueva etiqueta",
  "color": "#00FF00"
}
```
**Descripción:**
Crea una etiqueta asociada a un tablero existente.

---

### **PUT /api/etiquetas/{id}**
Edita una etiqueta existente.

**Request body:**
```json
{
  "nombre": "Etiqueta editada",
  "color": "#0000FF"
}
```
**Request URL:**
```
http://localhost:5080/api/etiquetas/10
```
**Response body:**
```json
{
  "id": 10,
  "nombre": "Etiqueta editada",
  "color": "#0000FF"
}
```
**Descripción:**
Edita el nombre y color de una etiqueta existente.

---

### **DELETE /api/etiquetas/{id}**
Elimina una etiqueta por su ID.

**Request URL:**
```
http://localhost:5080/api/etiquetas/10
```
**Response body:**
```json
{
  "mensaje": "Etiqueta eliminada"
}
```
**Descripción:**
Elimina la etiqueta especificada por su `id`.

---

### **POST /api/etiquetas/asignar**
Asigna una etiqueta a una tarea.

**Request body:**
```json
{
  "tareaId": 20,
  "etiquetaId": 10
}
```
**Request URL:**
```
http://localhost:5080/api/etiquetas/asignar
```
**Response body:**
```json
{
  "mensaje": "Etiqueta asignada a la tarea"
}
```
**Descripción:**
Asocia una etiqueta existente a una tarea específica.

---

### **DELETE /api/etiquetas/quitar/{tareaId}/{etiquetaId}**
Quita una etiqueta de una tarea.

**Request URL:**
```
http://localhost:5080/api/etiquetas/quitar/20/10
```
**Response body:**
```json
{
  "mensaje": "Etiqueta eliminada de la tarea"
}
```
**Descripción:**
Elimina la relación entre una tarea y una etiqueta específica.

---

## NotificacionesController (`api/notificaciones`)

### **POST /api/notificaciones/invitaciones**
Envía una invitación por correo a un usuario para unirse a un tablero.

**Request body:**
```json
{
  "usuarioId": 2,
  "tableroId": 5,
  "rol": "Colaborador"
}
```
**Request URL:**
```
http://localhost:5080/api/notificaciones/invitaciones
```
**Response body:**
```json
{
  "mensaje": "Correo de invitación enviado correctamente."
}
```
**Descripción:**
Envía una notificación por correo electrónico a un usuario invitándolo a un tablero con un rol específico.

---

## RolController (`api/roles`)

### **GET /api/roles/tableros/{tableroId}/usuarios/{usuarioId}/mi-rol**
Obtiene el rol de un usuario en un tablero.

**Request URL:**
```
http://localhost:5080/api/roles/tableros/1/usuarios/2/mi-rol
```
**Response body:**
```json
{
  "rol": 2,
  "esCreador": true
}
```
**Descripción:**
Devuelve el rol del usuario en el tablero (Creador, Colaborador, Veedor).

---

### **GET /api/roles/tableros/{tableroId}/colaboradores**
Obtiene los colaboradores de un tablero.

**Request URL:**
```
http://localhost:5080/api/roles/tableros/1/colaboradores
```
**Response body:**
```json
[
  {
    "usuarioId": 2,
    "nombre": "Juan"
  },
  ...
]
```
**Descripción:**
Devuelve la lista de usuarios con rol de colaborador en un tablero.

---

## TableroController (`api/tableros`)

### **GET /api/tableros/usuario/{usuarioId}**
Obtiene los tableros asociados a un usuario.

**Request URL:**
```
http://localhost:5080/api/tableros/usuario/2
```
**Response body:**
```json
[
  {
    "id": 1,
    "nombre": "Tablero 1",
    "fechaCreacion": "2024-05-01T12:00:00",
    "creadorId": 2
  },
  ...
]
```
**Descripción:**
Devuelve la lista de tableros donde el usuario es creador o participante.

---

### **POST /api/tableros**
Crea un nuevo tablero.

**Request body:**
```json
{
  "nombre": "Nuevo tablero",
  "creadorId": 2,
  "empresaId": 1
}
```
**Request URL:**
```
http://localhost:5080/api/tableros
```
**Response body:**
```json
{
  "mensaje": "Tablero creado",
  "id": 10
}
```
**Descripción:**
Crea un tablero y lo asocia a un usuario y empresa.

---

### **PUT /api/tableros/{id}/renombrar**
Renombra un tablero existente.

**Request body:**
```json
{
  "nuevoNombre": "Tablero actualizado"
}
```
**Request URL:**
```
http://localhost:5080/api/tableros/10/renombrar
```
**Response body:**
```json
{
  "mensaje": "Nombre del tablero actualizado correctamente"
}
```
**Descripción:**
Permite cambiar el nombre de un tablero existente.

---

### **GET /api/tableros/empresa/{empresaId}/usuario/{usuarioId}**
Obtiene los tableros de una empresa donde participa un usuario.

**Request URL:**
```
http://localhost:5080/api/tableros/empresa/1/usuario/2
```
**Response body:**
```json
[
  {
    "id": 1,
    "nombre": "Tablero Empresa",
    "fechaCreacion": "2024-05-01T12:00:00",
    "creadorId": 2
  },
  ...
]
```
**Descripción:**
Devuelve los tableros de una empresa donde el usuario es creador o participante.

---

### **GET /api/tableros/slug/{slug}**
Obtiene un tablero por su slug (nombre amigable).

**Request URL:**
```
http://localhost:5080/api/tableros/slug/mi-tablero
```
**Response body:**
```json
{
  "id": 1,
  "nombre": "Mi Tablero",
  "fechaCreacion": "2024-05-01T12:00:00",
  "creadorId": 2
}
```
**Descripción:**
Devuelve los datos de un tablero identificado por su slug.

---

### **GET /api/tableros/{id}**
Obtiene un tablero por su ID.

**Request URL:**
```
http://localhost:5080/api/tableros/10
```
**Response body:**
```json
{
  "id": 10,
  "nombre": "Tablero 10",
  "fechaCreacion": "2024-05-01T12:00:00",
  "creadorId": 2
}
```
**Descripción:**
Devuelve los datos de un tablero identificado por su ID.

---

### **POST /api/tableros/{tableroId}/invitaciones**
Invita a un usuario a un tablero.

**Request body:**
```json
{
  "usuarioId": 3,
  "rol": 1
}
```
**Request URL:**
```
http://localhost:5080/api/tableros/10/invitaciones
```
**Response body:**
```json
{
  "mensaje": "Usuario invitado correctamente."
}
```
**Descripción:**
Invita a un usuario a un tablero con un rol específico.

---

### **GET /api/tableros/{idTablero}/miembros**
Obtiene los miembros de un tablero (creador, colaboradores, veedores).

**Request URL:**
```
http://localhost:5080/api/tableros/10/miembros
```
**Response body:**
```json
{
  "creador": { "idUsuario": 2, "nombre": "Juan", "rol": "Creador" },
  "colaboradores": [ ... ],
  "veedores": [ ... ]
}
```
**Descripción:**
Devuelve la información de los miembros de un tablero, incluyendo el creador, colaboradores y veedores.

---

### **DELETE /api/tableros/{id}**
Elimina un tablero por su ID.

**Request URL:**
```
http://localhost:5080/api/tableros/10
```
**Response body:**

Sin contenido (204 No Content)

**Descripción:**
Elimina el tablero especificado por su `id`.

---

## TareasController (`api/tareas`)

### **GET /api/tareas/columna/{columnaId}**
Obtiene las tareas de una columna.

**Request URL:**
```
http://localhost:5080/api/tareas/columna/5
```
**Response body:**
```json
[
  {
    "id": 1,
    "nombre": "Tarea 1",
    "descripcion": "...",
    "estado": false,
    "fechaInicio": "2024-05-01T12:00:00",
    "fechaFin": "2024-05-10T12:00:00",
    "usuarioAsignadoId": 2,
    "usuarioAsignadoNombre": "Juan",
    "tableroId": 1,
    "orden": 0,
    "prioridad": 1,
    "etiquetas": [ ... ]
  },
  ...
]
```
**Descripción:**
Devuelve la lista de tareas asociadas a una columna específica.

---

### **GET /api/tareas/{id}**
Obtiene una tarea por su ID.

**Request URL:**
```
http://localhost:5080/api/tareas/10
```
**Response body:**
```json
{
  "id": 10,
  "nombre": "Tarea 10",
  "descripcion": "...",
  "estado": false,
  "fechaInicio": "2024-05-01T12:00:00",
  "fechaFin": "2024-05-10T12:00:00",
  "usuarioAsignadoId": 2,
  "usuarioAsignadoNombre": "Juan",
  "tableroId": 1,
  "orden": 0,
  "prioridad": 1,
  "etiquetas": [ ... ]
}
```
**Descripción:**
Devuelve los datos de una tarea identificada por su ID.

---

### **POST /api/tareas/tableros/{tableroId}/tareas**
Crea una nueva tarea en un tablero.

**Request body:**
```json
{
  "columnaId": 5,
  "nombre": "Nueva tarea",
  "descripcion": "...",
  "fechaInicio": "2024-05-01T12:00:00",
  "fechaFin": "2024-05-10T12:00:00",
  "usuarioAsignadoId": 2,
  "orden": 0,
  "prioridad": 1,
  "etiquetas": [1,2],
  "usuarioActualId": 3
}
```
**Request URL:**
```
http://localhost:5080/api/tareas/tableros/1/tareas
```
**Response body:**
```json
{
  "mensaje": "Tarea creada",
  "id": 20
}
```
**Descripción:**
Crea una tarea asociada a una columna y tablero, y puede asignar etiquetas y responsable.

---

### **PUT /api/tareas/{id}**
Edita una tarea existente.

**Request body:**
```json
{
  "nombre": "Tarea editada",
  "descripcion": "...",
  "estado": true,
  "fechaInicio": "2024-05-01T12:00:00",
  "fechaFin": "2024-05-10T12:00:00",
  "usuarioAsignadoId": 2,
  "orden": 0,
  "prioridad": 2,
  "usuarioActualId": 3
}
```
**Request URL:**
```
http://localhost:5080/api/tareas/10
```
**Response body:**
```json
{
  "mensaje": "Tarea actualizada"
}
```
**Descripción:**
Edita los datos de una tarea existente, incluyendo responsable y etiquetas.

---

### **DELETE /api/tareas/{id}**
Elimina una tarea por su ID.

**Request URL:**
```
http://localhost:5080/api/tareas/10
```
**Response body:**
```json
{
  "mensaje": "Tarea eliminada"
}
```
**Descripción:**
Elimina la tarea especificada por su `id`.

---

### **PUT /api/tareas/orden**
Actualiza el orden de las tareas en una columna.

**Request body:**
```json
[
  { "id": 10, "orden": 0 },
  { "id": 11, "orden": 1 }
]
```
**Request URL:**
```
http://localhost:5080/api/tareas/orden
```
**Response body:**
```json
{
  "mensaje": "Orden de tareas actualizado"
}
```
**Descripción:**
Permite actualizar el orden de múltiples tareas en una columna.

---

### **PUT /api/tareas/{id}/mover**
Mueve una tarea a otra columna y posición.

**Request body:**
```json
{
  "tareaId": 10,
  "nuevaColumnaId": 6,
  "nuevoOrden": 1,
  "usuarioId": 2
}
```
**Request URL:**
```
http://localhost:5080/api/tareas/10/mover
```
**Response body:**
```json
{
  "mensaje": "Tarea movida correctamente"
}
```
**Descripción:**
Permite mover una tarea a otra columna y actualizar su orden.

---

### **PATCH /api/tareas/{id}/estado**
Actualiza el estado de una tarea (completada o pendiente).

**Request body:**
```json
{
  "estado": true,
  "usuarioIdMarcarCompletado": 2
}
```
**Request URL:**
```
http://localhost:5080/api/tareas/10/estado
```
**Response body:**
true
```
**Descripción:**
Permite marcar una tarea como completada o pendiente.

---

## UsuarioController (`api/usuarios`)

### **GET /api/usuarios**
Obtiene la lista de usuarios.

**Request URL:**
```
http://localhost:5080/api/usuarios
```
**Response body:**
```json
[
  {
    "id": 1,
    "nombre": "Juan",
    "correo": "juan@email.com",
    "telefono": "123456789"
  },
  ...
]
```
**Descripción:**
Devuelve la lista de usuarios registrados en el sistema.

---

### **GET /api/usuarios/{id}**
Obtiene un usuario por su ID.

**Request URL:**
```
http://localhost:5080/api/usuarios/1
```
**Response body:**
```json
{
  "id": 1,
  "nombre": "Juan",
  "correo": "juan@email.com",
  "telefono": "123456789"
}
```
**Descripción:**
Devuelve los datos de un usuario identificado por su ID.

---

### **GET /api/usuarios/{usuarioId}/empresas**
Obtiene las empresas asociadas a un usuario.

**Request URL:**
```
http://localhost:5080/api/usuarios/1/empresas
```
**Response body:**
```json
[
  { "id": 1, "nombre": "Empresa 1" },
  ...
]
```
**Descripción:**
Devuelve la lista de empresas a las que pertenece un usuario.

---

### **POST /api/usuarios**
Crea un nuevo usuario.

**Request body:**
```json
{
  "nombre": "Nuevo usuario",
  "correo": "nuevo@email.com",
  "telefono": "987654321",
  "password": "password123"
}
```
**Request URL:**
```
http://localhost:5080/api/usuarios
```
**Response body:**
```json
{
  "id": 10,
  "nombre": "Nuevo usuario",
  "correo": "nuevo@email.com",
  "telefono": "987654321"
}
```
**Descripción:**
Crea un usuario y lo asocia a la empresa por defecto.

---

### **PUT /api/usuarios**
Edita los datos de un usuario existente.

**Request body:**
```json
{
  "id": 10,
  "nombre": "Usuario editado",
  "correo": "editado@email.com",
  "telefono": "111222333",
  "password": "nuevaPassword"
}
```
**Request URL:**
```
http://localhost:5080/api/usuarios
```
**Response body:**

Sin contenido (204 No Content)

**Descripción:**
Edita los datos de un usuario existente.

---

### **DELETE /api/usuarios/{id}**
Elimina un usuario por su ID.

**Request URL:**
```
http://localhost:5080/api/usuarios/10
```
**Response body:**

Sin contenido (204 No Content)

**Descripción:**
Elimina el usuario especificado por su `id`.

---

### **POST /api/usuarios/login**
Inicia sesión y obtiene un token JWT.

**Request body:**
```json
{
  "correo": "usuario@email.com",
  "password": "password123"
}
```
**Request URL:**
```
http://localhost:5080/api/usuarios/login
```
**Response body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nombre": "Juan",
    "correo": "juan@email.com",
    "telefono": "123456789"
  },
  "empresaActual": {
    "id": 1,
    "nombre": "Empresa 1"
  },
  "empresas": [ ... ]
}
```
**Descripción:**
Autentica al usuario y devuelve un token JWT junto con la información del usuario y sus empresas.

---

### **POST /api/usuarios/logout**
Cierra la sesión del usuario (invalida el token).

**Request URL:**
```
http://localhost:5080/api/usuarios/logout
```
**Response body:**
"Sesión cerrada."

**Descripción:**
Cierra la sesión del usuario y elimina el token de la base de datos.

---

##  DTOs

A continuación se describen los principales DTO (Data Transfer Object) utilizados en el sistema, con su estructura, campos y propósito:

---

### UsuarioLoginDTO

```csharp
public class UsuarioLoginDTO
{
    public required string Correo { get; set; } // Email del usuario
    public required string Password { get; set; } // Contraseña
}
```
**Descripción:**
Se utiliza para el login de usuarios. Requiere correo electrónico y contraseña.

---

### UsuarioCreateDTO

```csharp
public class UsuarioCreateDTO
{
    public required string Nombre { get; set; }
    public required string Correo { get; set; }
    public required string Telefono { get; set; }
    public required string Password { get; set; }
}
```
**Descripción:**
Se utiliza para crear un nuevo usuario. Incluye nombre, correo, teléfono y contraseña.

---

### UsuarioDTO

```csharp
public class UsuarioDTO
{
    public required int Id { get; set; }
    public required string Nombre { get; set; }
    public required string Correo { get; set; }
    public required string Telefono { get; set; }
}
```
**Descripción:**
Representa los datos básicos de un usuario en el sistema.

---

### TareaDTO

```csharp
public class TareaDTO
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Descripcion { get; set; }
    public bool Estado { get; set; }
    public DateTime? FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
    public DateTime? FechaNotificacion { get; set; }
    public int Orden { get; set; }
    public int? UsuarioAsignadoId { get; set; }
    public string? UsuarioAsignadoNombre { get; set; }
    public List<EtiquetaDTO> Etiquetas { get; set; }
    public int TableroId { get; set; }
    public PrioridadTarea Prioridad { get; set; }
}
```
**Descripción:**
Representa una tarea, con información de estado, fechas, responsable, etiquetas y prioridad.

---

### TareaCreateDTO

```csharp
public class TareaCreateDTO
{
    public int ColumnaId { get; set; }
    public string Nombre { get; set; }
    public string Descripcion { get; set; }
    public DateTime? FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
    public DateTime? FechaNotificacion { get; set; }
    public int Orden { get; set; }
    public PrioridadTarea Prioridad { get; set; }
    public int? UsuarioAsignadoId { get; set; }
    public int? UsuarioActualId { get; set; }
    public string? UsuarioActualNombre { get; set; }
    public List<int>? Etiquetas { get; set; }
    public List<int>? Archivos { get; set; }
    public List<string>? Comentarios { get; set; }
}
```
**Descripción:**
Se utiliza para crear una nueva tarea, permitiendo asociar responsable, etiquetas, archivos y comentarios.

---

### TableroDTO

```csharp
public class TableroDTO
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public DateTime FechaCreacion { get; set; }
    public int CreadorId { get; set; }
}
```
**Descripción:**
Representa los datos de un tablero (board) en el sistema.

---

### ColumnaDTO

```csharp
public class ColumnaDTO
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public int Orden { get; set; }
    public List<TareaDTO> Tareas { get; set; }
}
```
**Descripción:**
Representa una columna dentro de un tablero, incluyendo la lista de tareas asociadas.

---

### ColumnaCreateDTO

```csharp
public class ColumnaCreateDTO
{
    public int TableroId { get; set; }
    public string Nombre { get; set; }
    public int Orden { get; set; }
}
```
**Descripción:**
Se utiliza para crear una nueva columna en un tablero.

---

### EtiquetaDTO

```csharp
public class EtiquetaDTO
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Color { get; set; }
}
```
**Descripción:**
Representa una etiqueta (label) asociada a tareas o tableros.

---

### EtiquetaCreateDTO

```csharp
public class EtiquetaCreateDTO
{
    public int TableroId { get; set; }
    public string Nombre { get; set; }
    public string Color { get; set; }
}
```
**Descripción:**
Se utiliza para crear una nueva etiqueta en un tablero.

---

### TareaComentarioDTO

```csharp
public class TareaComentarioDTO
{
    public int Id { get; set; }
    public int UsuarioId { get; set; }
    public string UsuarioNombre { get; set; }
    public string Contenido { get; set; }
}
```
**Descripción:**
Representa un comentario realizado por un usuario en una tarea.

---

### EmpresaDTO

```csharp
public class EmpresaDTO
{
    public int Id { get; set; }
    public string Nombre { get; set; }
}
```
**Descripción:**
Representa una empresa dentro del sistema.

---
