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
