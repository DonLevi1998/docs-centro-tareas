# Módulo de Login

Sistema de autenticación de usuarios con formulario de acceso.

## Archivos

- `login.component.ts/html`: Vista y lógica del formulario de inicio de sesión.
- `auth.service.ts`: Servicio encargado de comunicarse con el backend y almacenar sesión.

## Funcionalidades

- Validación de usuario y contraseña.
- Llamada al endpoint `/api/usuarios/login`.
- Almacenamiento en `localStorage` o `sessionStorage`.
