# Despliegue

## Requisitos
- .NET SDK para backend
- Node.js y Angular CLI para frontend
- PostgreSQL (u otra base de datos compatible)

## Pasos generales

### Backend
1. Configura la base de datos en `appsettings.json`.
2. Ejecuta migraciones si es necesario.
3. Inicia el backend:
   ```bash
   dotnet run
   ```

### Frontend
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Inicia la aplicación:
   ```bash
   ng serve
   ```

## Variables de entorno
- JWT Key, Issuer, Audience (backend)
- URL del backend (frontend)
