# Practica 04 Desplegando en la nube
Desarrollar un servidor web en la nube es una tarea relativamente sencilla. En esta práctica vamos a desplegar una aplicación web en la nube utilizando un servicio de hosting gratuito.

**POR:** *David Ruiz*

## EVIDENCIAS CLASES 22/NOV/2022

## 1. Desplegamos una aplicación en la nube

Se utiliza el servicio de hosting gratuito de ```Deta```

1. Descargar deta ejecutando en la terminal:

![image](https://user-images.githubusercontent.com/78920592/204338869-2f4fdf7b-a8f9-49b0-ad09-8a91fb7e101e.png)

2. Agregando la variable de entorno:

![image](https://user-images.githubusercontent.com/78920592/204339430-6642dc16-98fa-474a-bf88-82e6c0e11032.png)

3. Iniciar sesión en Deta ejecutando en la terminal:

![image](https://user-images.githubusercontent.com/78920592/204340119-8db492c6-3485-4c5a-9519-104a0a50a9f2.png)

![image](https://user-images.githubusercontent.com/78920592/204340314-243a8d25-6419-4579-adfa-7361b4ff0450.png)

4. Crear un punto de entrada de la aplicación. El archivo ```src/index.ts``` debe quedar de la siguiente forma:

```
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const createNestServer = async (expressInstance) => {
const app = await NestFactory.create(
   AppModule,
   new ExpressAdapter(expressInstance),
);

return app.init();
};

export default createNestServer;

```
![image](https://user-images.githubusercontent.com/78920592/204340776-41086b60-3295-445a-93b4-9694fe6ea0c3.png)


5. En la raíz del proyecto crear un nuevo archivo index.js con el siguiente contenido:

```
const express = require('express');
const createServer = require('./dist/index').default;

const app = express();
let nest;

app.use(async (req, res) => {
if (!nest) {
   nest = express();
   await createServer(nest);
}
return nest(req, res);
});

module.exports = app;
```

![image](https://user-images.githubusercontent.com/78920592/204343545-0ea2ebbb-954d-47f1-ae42-4b5de37224c8.png)

6. Antes se debe compilar el proyecto. Para ello ejecutamos en la terminal:

![image](https://user-images.githubusercontent.com/78920592/204344021-e05eec9c-08f7-488b-a4c9-63a4abe1a24d.png)

7. Publicar la aplicación ejecutando en la terminal:

Si todo es correcto en la terminal tendrá la siguiente salida:

![image](https://user-images.githubusercontent.com/78920592/204532232-e3e91f13-b42e-4127-a8fb-9e00a9032a71.png)

8. Para actualizar la aplicación ejecutamos en la terminal:

9. Se desplega la aplicacion ejecutando lo siguiente en la terminal:

![image](https://user-images.githubusercontent.com/78920592/204534008-8945b65d-573e-4551-bf5d-f799c65a299e.png)

![image](https://user-images.githubusercontent.com/78920592/204533961-b561fda4-cfd4-4bbe-8bfb-5e8025fbc47c.png)

Copiamos el link y observamos que esta la informacion pertinente de nuestro objeto.

![image](https://user-images.githubusercontent.com/78920592/204534213-a5caeaa3-c79c-4799-9a70-5ecd586c70e3.png)

10. Se activa los logs de la aplicación ejecutamos en la terminal:

![image](https://user-images.githubusercontent.com/78920592/204535184-deda36c9-fcc3-437b-b518-df846c2ae4c3.png)

En deta ya se pueden observar las peticiones

![image](https://user-images.githubusercontent.com/78920592/204535400-287cb485-6058-4298-bd18-e6abfd9c5908.png)

11. Se Observa la peticion con el link generado en la seccion de micro del proyecto ````practica_2```

![image](https://user-images.githubusercontent.com/78920592/204537341-ae889520-b745-401f-9d0f-b32480ea9e61.png)

## Conectando a una base de datos

1. En este caso emplearemos una base de datos no relacional orientada a documentos llamada MongoDB, muy popular por su flexibilidad y alto rendimiento. Por lo tanto se crea una cuenta gratuita en MongoDB Atlas. Se crea el cluster, es necesario crear un usuario, para este ejemplo emplee Username and password. Y para facilitar la conexión la base de datos se recomienda crear una IP whitelist. COn todo esto ya se tendrá una base de datos MongoDB lista para ser utilizada.
 
 ![image](https://user-images.githubusercontent.com/78920592/204539891-66ce173d-ade2-437d-83dd-cbc3b4e16424.png)

2. Instalamos las dependencias de TypeORM y MongoDB ejecutando en la terminal:


 
