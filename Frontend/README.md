README -Celumundo WebApp

1. Descripción del Proyecto
Celumundo es una aplicación web para la gestión y visualización de productos promocionales. Funcionalidades principales:
- Listar productos por tipo y marca.
- Visualizar detalles de cada producto.
- Crear, actualizar y eliminar productos (CRUD).
- Gestionar comentarios de usuarios por producto.
- Gestionar marcas y tiendas.

2. TECNOLOGÍAS UTILIZADAS
--------------------------
Frontend:
- Angular 16 (Standalone Components)
- HTML, SCSS
- NG Model para formularios

Backend:
- Node.js 24
- Express
- MySQL2 (para conexión a base de datos)
- Multer (para carga de imágenes)
- dotenv (para configuración de variables de entorno)

Base de Datos:
- MySQL
- Archivo de respaldo: tienda_db.sql

3. ESTRUCTURA DE ARCHIVOS
-------------------------
/Backend
  /routes        --> Rutas de la API (productos, marcas, comentarios)
  /database      --> Archivo tienda_db.sql
  db.js          --> Conexión a la base de datos
  server.js      --> Servidor Node.js

/Frontend
  /src/app/pages
    /home
    /details
    /crud-products
  /src/app/services
    product.service.ts
    marcas.service.ts
    comment.service.ts
    store.service.ts

4. INSTALACIÓN
----------------
1. Clonar el repositorio:
   git clone (https://github.com/LauraMajey/AA2_jimenez_kelly_majey_Laura/)

2. Backend:
   cd Backend
   npm install
   Crear archivo `.env` con las siguientes variables:
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=123456
     DB_NAME=tienda_db
   Iniciar servidor:
     npm start

3. Base de Datos:
   - Importar el archivo `tienda_db.sql` ubicado en:
     Backend\database\tienda_db.sql

4. Frontend:
   cd Frontend
   npm install
   ng serve

5. CONFIGURACIÓN
-----------------
- Las imágenes de productos se almacenan en el Backend en:
  Backend/public/products/
- La API de marcas está disponible en: http://localhost:3000/api/marcas
- La API de productos está disponible en: http://localhost:3000/api/productos
- La API de comentarios está disponible en: http://localhost:3000/api/comments

6. CONSIDERACIONES
------------------
- Mantener el Backend y Frontend corriendo simultáneamente
- Las rutas de imágenes en la base de datos son relativas al Backend/public/
- Se utiliza Angular Signals para manejar estados reactivos en componentes

7. HERRAMIENTAS DE DESARROLLO
-----------------------------
- IDE recomendado: Visual Studio Code
- Navegador: Chrome / Edge
- Node.js y npm
- MySQL Workbench o phpMyAdmin

8. CONTACTO
-------------
Desarrollado por: Kelly Jimenez y Laura Majey 