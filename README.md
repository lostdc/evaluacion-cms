# Nombre del Proyecto CMS Personalizado

## Descripción

Este proyecto de CMS Personalizado ha sido diseñado para permitir a los usuarios crear, editar y publicar contenido dinámico de manera flexible, segura y eficiente. Utilizando Laravel en el backend y React en el frontend, ofrece una experiencia de usuario moderna y reactiva.

## Tecnologías y Herramientas Utilizadas

### Backend

- **Framework**: Laravel, utilizando Laravel Sail para proporcionar un entorno de desarrollo Dockerizado, que incluye servicios preconfigurados y una interfaz de línea de comandos (CLI) eficiente.
- **Librerías**:
  - **Purify**: Para limpiar los campos de entrada y evitar inyecciones HTTP.
  - **Sanctum**: Para la autenticación y protección de las rutas API.
- **Base de Datos**: MySQL, con migraciones de Laravel para gestionar el versionado y desarrollo de la base de datos.
- **ORM**: Uso de modelos de Laravel para mantener las relaciones entre tablas (como `belongsTo`, `hasMany`, etc.), facilitando la interacción con la base de datos a través del ORM.

### Frontend

- **Tecnologías**: React, implementado con TypeScript y utilizando ViteJS para un desarrollo y compilación rápidos.
- **Librerías**:
  - **Bootstrap**: Para el diseño y la maquetación de la interfaz de usuario.
  - **React Router DOM**: Para la gestión de rutas en aplicaciones de página única (SPA).

## Características Principales

- **Autenticación y Autorización**: Implementada con Laravel Sanctum, proporcionando diferentes niveles de acceso (administrador, editor, invitado).
- **Gestión de Contenido**: Creación, edición y eliminación de publicaciones, categorías y etiquetas. Soporte para carga de imágenes y uso de un editor de texto enriquecido.
- **Comentarios y Moderación**: Funcionalidades para que los usuarios registrados puedan comentar en el contenido y para la moderación de estos por parte de los administradores.
- **API RESTful**: Desarrollo de una API RESTful que permite operaciones CRUD en publicaciones, categorías y comentarios, con autenticación a través de tokens.
- **Búsqueda y Filtrado**: Implementación de funciones de búsqueda y filtrado de contenido.
- **Internacionalización**: Preparación del sistema para admitir múltiples idiomas.


## Instrucciones de Instalación y Configuración

Sigue las siguientes instrucciones para configurar el entorno de desarrollo:

1. Clona el repositorio:

"git clone https://github.com/lostdc/evaluacion-cms.git"

2. Configura los archivos `.env` con la configuracion predeterminada no es necesario cambios:

mv .env.example .env
mv .env.testing .env.testing


3. Instala Laravel Sail. Esto es necesario para poder ejecutar `composer install` ya que Sail necesita la carpeta `vendor`. Asegúrate de tener PHP 8.2 y Composer instalados antes de continuar:


mv composer.json composer.json-aux
mv composer.lock composer.lock-aux

instalamos solo la dependencia principal sail para luego utilizarla
composer require laravel/sail --dev
rm composer.json composer.lock

mv composer.json-aux composer.json
mv composer.lock-aux composer.lock

4. Levanta los contenedores de Docker con Sail:

./vendor/bin/sail up

5. Instala las dependencias de Composer:

./vendor/bin/sail composer install

6. Ejecuta las migraciones y seeders para la base de datos principal:

./vendor/bin/sail artisan migrate --seed

7. Instala las dependencias de Node.js:

npm install

8. Accede al sistema desde tu navegador:
 Abre la URL "http://localhost/register" para registrar un nuevo usuario.



 si no abre y localhost muestra ubuntu, la maquina host puede tener tomado el puerto 80 puedes apagarlo con 

sudo systemctl stop apache2
sudo systemctl disable apache2

## Pruebas

[Detalles sobre la implementación de pruebas unitarias y de integración, incluyendo cómo ejecutarlas y la base de datos de prueba `testing`.]