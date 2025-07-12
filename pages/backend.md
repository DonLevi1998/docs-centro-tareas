# Backend

## Descripción
El backend expone una API RESTful para la gestión de usuarios, tableros, columnas, tareas, etiquetas, invitaciones y comentarios.

## Estructura principal
- **Controllers**: Gestionan las rutas y lógica de cada recurso (Tablero, Tarea, Usuario, etc.)
- **Entities/Models**: Representan las tablas y objetos de dominio.
- **Services**: Lógica de negocio y utilidades (notificaciones, emails, archivos).
- **Middleware**: Validación de tokens y seguridad.

## Seguridad
- Autenticación JWT
- CORS configurado para frontend

## Instalación y ejecución
1. Configura la cadena de conexión a la base de datos en `appsettings.json`.
2. Ejecuta las migraciones si es necesario.
3. Inicia el backend:
   ```bash
   dotnet run
   ```

## Endpoints principales
- /api/Tablero
- /api/Tareas
- /api/Usuario
- /api/Columna
- /api/Etiquetas
- /api/Invitaciones
