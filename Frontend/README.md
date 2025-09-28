README -Celumundo WebApp

1. Descripción del Proyecto
Celumundo es una aplicación web para la gestión y visualización de productos promocionales. Funcionalidades principales:
- Listar productos por tipo y marca.
- Visualizar detalles de cada producto.
- Crear, actualizar y eliminar productos (CRUD).
- Gestionar comentarios de usuarios por producto.
- Gestionar marcas y tiendas.
La aplicación está compuesta por:
- Frontend: Angular 16, HTML, SCSS, TypeScript.
- Backend: Node.js con Express y MySQL.
- Base de datos: MySQL.

2. Requisitos de Instalación
Software necesario:
- Node.js >= 18
- Angular CLI >= 16
- MySQL >= 8
- npm o yarn
- Postman (para pruebas de API)
Pasos:
1. Clonar el repositorio: git clone https://github.com/LauraMajey/AA2_jimenez_kelly_majey_Laura
2. Entrar a la carpeta del Frontend: cd Frontend && npm install
3. Entrar a la carpeta del Backend: cd Backend && npm install

3. Configuración
Base de datos MySQL:
1. Crear la base de datos tienda_db.
2. Crear las tablas principales: productos, marcas, stores, comments.
Archivo .env en Backend:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=tienda_db
PORT=3000
Frontend:
- Angular CLI configurado para servir en http://localhost:4200.
- Las imágenes subidas se almacenan en Backend/public/products.

4. Uso
Iniciar Backend: cd Backend && npm run dev (Servidor en http://localhost:3000)
Iniciar Frontend: cd Frontend && ng serve (Aplicación en http://localhost:4200)

5. Rutas de la API
Productos (CRUD)
- GET /api/productos: Listar productos
- GET /api/productos/:id: Obtener producto por ID
- POST /api/productos: Crear producto (form-data con imagen)
- PUT /api/productos/:id: Actualizar producto
- DELETE /api/productos/:id: Eliminar producto

Marcas (CRUD)
- GET /api/marcas: Listar marcas
- GET /api/marcas/:id: Obtener marca por ID
- POST /api/marcas: Crear marca
- PUT /api/marcas/:id: Actualizar marca
- DELETE /api/marcas/:id: Eliminar marca

Comentarios
- GET /api/comments/product/:productId: Listar comentarios de un producto
- POST /api/comments: Crear comentario
- DELETE /api/comments/:id: Eliminar comentario

6. Tecnologías Utilizadas
- Frontend: Angular 16, HTML, SCSS, TypeScript
- Backend: Node.js, Express
- Base de datos: MySQL
- Librerías y herramientas: multer (subida de imágenes), mysql2/promise (conexión a MySQL), dotenv (variables de entorno)
- IDE recomendado: Visual Studio Code o Atom
- Postman para pruebas de API



7. Notas importantes
- Asegurarse de crear la carpeta public/products dentro del Backend antes de subir imágenes.
- Si se actualiza un producto sin cambiar la imagen, enviar el image_url existente para no perder la referencia.
- Para agregar nuevas marcas al crear un producto, se puede seleccionar "Otra marca" en el formulario CRUD y escribir el nombre.
- Seguir la arquitectura REST implementada para nuevos endpoints o tablas.
