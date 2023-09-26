
# Documentación

Este documento proporciona una documentación detallada del código, incluyendo información sobre la estructura del proyecto, las rutas de la API, los controladores, los modelos de datos, las dependencias y cómo configurar el archivo .env para gestionar variables de entorno, incluyendo la generación de una clave secreta. Además, se incluye una descripción de los objetivos del proyecto y la referencia a las imágenes utilizadas en el diseño.



## Objetivos del Proyecto

El objetivo del proyecto es desarrollar una solución web para un juego infantil que permita a los niños realizar las siguientes acciones:

- Al iniciar el juego, ingresar su nombre y un PIN numérico a modo de login.
- Seleccionar entre 4 personajes disponibles, visualizando los nombres y rostros de los personajes.
- Construir el atuendo del día, seleccionando partes superiores, inferiores y zapatos.
- Visualizar el atuendo completo.
Guardar en el sistema el resultado.
- Al volver a ingresar, ver los personajes que hayan generado previamente.
- De forma pública, visualizar los últimos 5 personajes creados.

## Estructura del Proyecto

El proyecto se organiza en varios archivos y carpetas de la siguiente manera:

- **index.js**: Este archivo contiene la configuración principal del servidor Express y define las rutas de la API.
- **auth-middleware.js**: Este archivo contiene un middleware para la autenticación de usuarios.
- **controller.auth.js**: Proporciona controladores relacionados con la autenticación de usuarios.
- **controller.character.js**: Contiene controladores para la creación, obtención, modificación y eliminación de personajes.
- **controller.user.js**: Contiene controladores para la creación, obtención, modificación y eliminación de usuarios.
- **models**: Esta carpeta contiene los esquemas de datos de Mongoose para los usuarios y personajes.

### Controladores
Los controladores se encuentran en los archivos **controller.auth.js**, **controller.character.js** y **controller.user.js**, y se utilizan para manejar las operaciones relacionadas con usuarios, personajes y autenticación.

### Middlewares
El middleware de autenticación se encuentra en el archivo **auth-middleware.js** y se utiliza para verificar la autenticidad de las solicitudes de los usuarios.

### Modelos de Datos
Los modelos de datos se definen en los archivos **model.character.js** y **model.user.js** en la carpeta "models". Estos modelos se utilizan para crear las estructuras de datos de los personajes y los usuarios en la base de datos MongoDB.

## Dependencias
El proyecto utiliza las siguientes dependencias externas, que deben estar instaladas para su correcto funcionamiento:

- **express**: Para la creación del servidor web.
- **mongoose**: Para la interacción con la base de datos MongoDB.
- **cors**: Para habilitar el intercambio de recursos entre dominios (CORS).
- **jsonwebtoken**: Para la generación y verificación de tokens JWT.
- **dotenv**: Para cargar variables de entorno desde un archivo `.env`.

## Rutas de la API
Las siguientes rutas y puntos finales están disponibles en la API:

### Crear Usuario

- **URL**: `/register`
- **Método HTTP**: `POST`
- **Descripción**: Crea un nuevo usuario en el sistema.
- **Parámetros de entrada**:
  - `name` (string): Nombre del usuario.
  - `email` (string): Correo electrónico del usuario.
  - `password` (string): Contraseña del usuario.
  - `isActive` (boolean): Estado de activación del usuario.
- **Respuestas**:
  - Código de estado 201: Usuario creado correctamente.
  - Código de estado 409: El usuario ya existe.
  - Código de estado 500: Error al crear el usuario.

### Obtener Usuario

- **URL**: `/account/:id`
- **Método HTTP**: `GET`
- **Descripción**: Obtiene la información de un usuario por su ID.
- **Parámetros de entrada**:
  - `id` (string): ID del usuario.
- **Respuestas**:
  - Código de estado 200: Respuesta exitosa con la información del usuario.
  - Código de estado 500: Error al obtener al usuario.

### Modificar Usuario

- **URL**: `/account/:id`
- **Método HTTP**: `PUT`
- **Descripción**: Modifica la información de un usuario.
- **Parámetros de entrada**:
  - `id` (string): ID del usuario a modificar.
  - `name` (string): Nuevo nombre del usuario.
  - `email` (string): Nuevo correo electrónico del usuario.
  - `password` (string): Nueva contraseña del usuario.
  - `isActive` (boolean): Nuevo estado de activación del usuario.
- **Respuestas**:
  - Código de estado 200: Usuario modificado correctamente.
  - Código de estado 404: El usuario no existe.
  - Código de estado 500: Error al modificar el usuario.

### Eliminar Usuario

- **URL**: `/account/:id`
- **Método HTTP**: `DELETE`
- **Descripción**: Elimina un usuario del sistema.
- **Parámetros de entrada**:
  - `id` (string): ID del usuario a eliminar.
- **Respuestas**:
  - Código de estado 200: Usuario eliminado correctamente.
  - Código de estado 404: No se ha podido eliminar el usuario.
  - Código de estado 500: Error al eliminar al usuario.

### Autenticación del Login

- **URL**: `/auth/login`
- **Método HTTP**: `POST`
- **Descripción**: Autenticación de inicio de sesión.
- **Parámetros de entrada**:
  - `email` (string): Correo electrónico del usuario.
  - `password` (string): Contraseña del usuario.
- **Respuestas**:
  - Código de estado 200: Respuesta exitosa con el token JWT.
  - Código de estado 401: No autorizado.
  - Código de estado 500: Error en la autenticación.

### Crear Personaje

- **URL**: `/dashboard`
- **Método HTTP**: `POST`
- **Descripción**: Crea un nuevo personaje para un usuario autenticado.
- **Parámetros de entrada**:
  - `user_id` (string): ID del usuario autenticado.
  - `upper` (string): Parte superior del atuendo del personaje.
  - `lower` (string): Parte inferior del atuendo del personaje.
  - `shoes` (string): Zapatos del personaje.
- **Respuestas**:
  - Código de estado 201: Personaje creado correctamente.
  - Código de estado 500: Error al crear el personaje.

### Obtener Personajes de Usuario

- **URL**: `/dashboard/:user_id`
- **Método HTTP**: `GET`
- **Descripción**: Obtiene todos los personajes creados por un usuario específico.
- **Parámetros de entrada**:
  - `user_id` (string): ID del usuario.
- **Respuestas**:
  - Código de estado 200: Respuesta exitosa con la lista de personajes del usuario.
  - Código de estado 500: Error al obtener los personajes del usuario.

### Obtener Todos los Personajes

- **URL**: `/:limit/:offset`
- **Método HTTP**: `GET`
- **Descripción**: Obtiene todos los personajes, mostrando los últimos creados al principio.
- **Parámetros de entrada**:
  - `limit` (number): Límite de resultados por página.
  - `offset` (number): Desplazamiento de resultados.
- **Respuestas**:
  - Código de estado 200: Respuesta exitosa con la lista de personajes.
  - Código de estado 500: Error al obtener los personajes.

## Instalación del Proyecto
Para utilizar este proyecto en tu entorno local, sigue estos pasos:

1. **Descargar el Proyecto**:
   - Clona este repositorio en tu computadora o descárgalo como un archivo ZIP desde la página del repositorio en GitHub.

2. **Instalar Dependencias**:
   - Abre una terminal o línea de comandos en la carpeta del proyecto.
   - Ejecuta el siguiente comando para instalar todas las dependencias listadas en el archivo `package.json`:
     ```
     npm install
     ```
   - Espera a que se complete el proceso de instalación.

3. **Modificar el Archivo `.env.test`**:
   - En la raíz del proyecto, se encuentra el archivo `.env.test`, el cual devera ser renombrada a `.env`.
   - Define el puerto donde deseas que se ejecute la aplicación. Por ejemplo:
     ```
     PORT = 5000.
     ```
   - Añade la URI de tu base de datos de MongoDB Atlas. Debería verse así:
     ```shell
     MONGODB_URI = "mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre_de_la_base_de_datos"
   
   - La variable `SECRET_KEY` puede generarse utilizando el siguiente comando en la terminal:
     ```
     node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
     ```

4. **Iniciar el Proyecto**:
   - Una vez configurado el archivo `.env` e instalado las dependencias, puedes iniciar el proyecto ejecutando el siguiente comando:
     ```
     npm start
     ```
   - Esto iniciará el servidor Express y la aplicación estará disponible en el puerto especificado en el archivo `index.js` (por defecto, el puerto 5000).

Asegúrate de que MongoDB esté en ejecución y configurado correctamente para que la aplicación pueda interactuar con la base de datos.

Ahora deberías tener el proyecto descargado desde GitHub, las dependencias instaladas y la aplicación en funcionamiento en tu entorno local.
