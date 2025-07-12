# Estructura del Proyecto

A continuación se muestra el árbol principal del proyecto sakai-tareas y una breve descripción de cada carpeta relevante:

```text
sakai-tareas/
├── backend-tareas/         # Backend en .NET, API REST, lógica de negocio y acceso a datos
│   ├── Controllers/       # Controladores de la API, definen los endpoints
│   ├── Data/              # Contexto de base de datos (Entity Framework)
│   ├── DTO/               # Objetos de transferencia de datos
│   ├── Entities/          # Entidades del modelo de datos
│   ├── Enums/             # Enumeraciones usadas en el dominio
│   ├── Middleware/        # Middlewares personalizados
│   ├── Migrations/        # Migraciones de base de datos (Entity Framework)
│   ├── Models/            # Modelos adicionales
│   ├── Services/          # Servicios auxiliares (correo, archivos, notificaciones)
│   ├── wwwroot/           # Archivos estáticos
│   └── appsettings.json   # Configuración de la aplicación
├── frontend-tareas/       # Frontend en Angular, interfaz de usuario
│   ├── src/
│   │   ├── app/           # Componentes, módulos y lógica de la app Angular
│   │   │   ├── empresas/      # Gestión de empresas
│   │   │   ├── invitaciones/  # Gestión de invitaciones y notificaciones
│   │   │   ├── login/         # Módulo de autenticación de usuarios
│   │   │   ├── tableros/      # Gestión de tableros y sus vistas
│   │   │   ├── usuarios/      # Gestión de usuarios
│   │   │   ├── etiquetas/     # Gestión de etiquetas
│   │   │   ├── layout/        # Componentes de layout y navegación
│   │   │   ├── demo/          # Ejemplos o pruebas de componentes
│   │   │   └── ...            # Otros módulos/componentes
│   │   ├── assets/        # Recursos estáticos (imágenes, etc.)
│   │   └── environments/  # Configuraciones de entorno Angular
│   └── angular.json       # Configuración del proyecto Angular
└── sakai-tareas.sln       # Solución principal de Visual Studio
```

## Descripción de carpetas principales

- **backend-tareas/**: Contiene todo el backend de la aplicación, desarrollado en .NET. Aquí se define la API REST, la lógica de negocio, el acceso a la base de datos y los servicios auxiliares.
  - **Controllers/**: Define los endpoints de la API.
  - **Data/**: Contexto de Entity Framework para la conexión y operaciones con la base de datos.
  - **DTO/**: Objetos de transferencia de datos entre capas.
  - **Entities/**: Entidades que representan las tablas de la base de datos.
  - **Enums/**: Enumeraciones usadas en el dominio.
  - **Middleware/**: Middlewares personalizados para la API.
  - **Migrations/**: Migraciones de base de datos generadas por Entity Framework.
  - **Models/**: Modelos adicionales usados en la lógica de negocio.
  - **Services/**: Servicios auxiliares como envío de correos, manejo de archivos y notificaciones.
  - **Views/**: Vistas (si aplica).
  - **wwwroot/**: Archivos estáticos del backend.
  - **appsettings.json**: Archivo de configuración principal del backend.
- **frontend-tareas/**: Contiene el frontend de la aplicación, desarrollado en Angular. Aquí se encuentra la interfaz de usuario y la lógica de presentación.
  - **src/app/**: Componentes y módulos principales de la aplicación Angular:
    - **empresas/**: Gestión de empresas y sus vistas.
    - **invitaciones/**: Gestión de invitaciones y notificaciones.
    - **login/**: Módulo de autenticación de usuarios.
    - **tableros/**: Gestión de tableros, columnas y tareas.
    - **usuarios/**: Gestión de usuarios y perfiles.
    - **etiquetas/**: Gestión de etiquetas para tareas/tableros.
    - **layout/**: Componentes de layout, navegación y estructura visual.
    - **demo/**: Ejemplos o pruebas de componentes.
    - **...**: Otros módulos/componentes adicionales.
  - **src/assets/**: Recursos estáticos como imágenes y estilos.
  - **src/environments/**: Configuraciones de entorno para Angular.
  - **angular.json**: Configuración del proyecto Angular.
- **sakai-tareas.sln**: Archivo de solución de Visual Studio que agrupa los proyectos del backend y frontend.

---

Esta estructura permite una separación clara entre el backend y el frontend, facilitando el desarrollo, mantenimiento y escalabilidad del sistema.
