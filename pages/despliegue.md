# Despliegue y Puesta en Marcha

Esta sección describe los pasos necesarios para preparar y ejecutar el entorno de desarrollo de sakai-tareas, incluyendo la base de datos, configuración y servicios auxiliares.

## 1. Creación y migración de la base de datos (Entity Framework 8)

El backend utiliza Entity Framework 8 con el enfoque Code First para la gestión de la base de datos. Si es la primera vez que instalas el sistema o no tienes la base de datos creada, sigue estos pasos:

1. Abre una terminal en el directorio del backend.
2. Ejecuta el siguiente comando para aplicar las migraciones y crear la base de datos en tu motor configurado:

   ```bash
   dotnet ef database update
   ```

   > Asegúrate de tener instalado el CLI de .NET y Entity Framework Tools.

## 2. Configuración de la cadena de conexión (appsettings.json)

El archivo `appsettings.json` contiene la cadena de conexión a la base de datos. Por defecto, está configurada para el entorno del desarrollador original. Debes modificarla para que apunte a tu propio servidor o instancia de base de datos.

Pasos:

1. Abre el archivo `appsettings.json` en el backend.
2. Busca la sección `ConnectionStrings` y localiza la clave correspondiente (por ejemplo, `DefaultConnection`).
3. Modifica los valores de servidor, usuario, contraseña y base de datos según tu entorno.

Ejemplo:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=TU_SERVIDOR;Database=TU_BASE;User Id=TU_USUARIO;Password=TU_PASSWORD;"
}
```

Guarda los cambios antes de ejecutar las migraciones.

## 3. Servicio de notificaciones por correo (Mailpit en Docker)

Para pruebas de notificaciones por correo, se utiliza Mailpit en un contenedor Docker. Es obligatorio tener este contenedor en ejecución para que el servicio de notificaciones funcione correctamente.

Para levantar el contenedor de Mailpit, ejecuta el siguiente comando:

```bash
docker run -p 1025:1025 -p 8025:8025 --restart=unless-stopped -d axllent/mailpit
```

Esto expondrá Mailpit en los puertos 1025 (SMTP) y 8025 (web UI). Accede a la interfaz web en http://localhost:8025 para ver los correos enviados desde la aplicación.

---

Sigue estos pasos para asegurar que tu entorno de desarrollo esté correctamente configurado y funcional.