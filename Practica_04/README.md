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

![image](https://user-images.githubusercontent.com/78920592/204542176-c261883f-c4fb-41a7-86c1-414f0e87ad5a.png)

 3. En el panel de mongo atlas, en la sección Connect seleccione la opción Connect your application. Copie la url de conexión y reemplace el valor de la variable MONGO_URL en el archivo ~/Documents/Servidores/practica_02/src/app.module.ts por la url de conexión.

![image](https://user-images.githubusercontent.com/78920592/204542419-b2094128-6bb5-4136-bb3d-f90b2bab6704.png)

![image](https://user-images.githubusercontent.com/78920592/204544012-1e03ad63-1b6a-40c5-80c0-b4175e3f3313.png)

4. Modificamos el archivo app.module.ts que esta en la carpeta src de nuestro proyecto
```
import { TypeOrmModule } from '@nestjs/typeorm';
...

@Module({
imports: [
   AuthModule,
   UsersModule,
   TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://<usuario>:<password>...',
   }),
],
controllers: [PlayerControllerImpl],
providers: [
   {
      provide: 'PlayerService',
      useClass: PlayerServiceImpl,
   },
],
})
export class AppModule {}
   ```

![image](https://user-images.githubusercontent.com/78920592/204598958-995c3fef-843a-441e-b47d-735b29bdf82d.png)

el codigo contiene el usuario y la urls de mongodb con el fin de realizar la conexcion a la base de datos

5. se crea un archivo para modelar la entidad, eso queda en la carpeta `src/<nombre_entidad>/domain/entities` y debe llamarse `Carros.entity.ts`, para este caso. El archivo debe quedar de la siguiente manera:

```
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class PlayerEntity {
   @ObjectIdColumn()
   id: string;

   @Column()
   name: string;

   @Column()
   lastName: string;

   @Column()
   age: number;

   @Column()
   team: string;
}
```

![image](https://user-images.githubusercontent.com/78920592/204600570-0fff8aed-3c7b-4510-9867-24f1aa89df35.png)

6. se agrega la entidad en la configuración del módulo, para habilitar el repositorio:

```
@Module({
imports: [
   ...
   TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://<usuario>:<password>...',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      synchronize: true, // Solo para desarrollo
      logging: true,
      autoLoadEntities: true,
   }),
   TypeOrmModule.forFeature([PlayerEntity])
],
...
export class AppModule {}
```

![image](https://user-images.githubusercontent.com/78920592/204601536-7c9f990f-24a3-41de-bfa5-27c5ce9f317b.png)

7. Luego adicione en el constructor del servicio, para el ejemplo `src/Carros/domain/services/Carros.service.ts`:

```
...
@Injectable()
export class PlayerServiceImpl implements PlayerService {
constructor(
   @InjectRepository(PlayerEntity)
   private repository: MongoRepository<PlayerEntity>,
) {}
...
```

![image](https://user-images.githubusercontent.com/78920592/204602627-16ddb445-948b-4b29-8c60-36fbb785d0f4.png)

8.Ahora es necesario modificar los métodos para que utilicen el repositorio, para el ejemplo `src/Carros/domain/services/Carros.service.ts`:

```
...
public async list(): Promise<PlayerEntity[]> {
   return await this.repository.find();
}

public async create(playerData: PlayerEntity): Promise<InsertResult> {
   const newPlayer = await this.repository.insert(playerData);
   return newPlayer;
}

public async update(
   id: number,
   playerData: PlayerEntity,
): Promise<UpdateResult> {
   const updatedPlayer = await this.repository.update(id, playerData);
   return updatedPlayer;
}

public async delete(id: number): Promise<boolean> {
   const deleteResult = await this.repository.delete(id);
   return deleteResult.affected > 0;
}

public async updateAge(id: number, edad: number): Promise<UpdateResult> {
   const updatedPlayer = await this.repository.update(id, { age: edad });
   return updatedPlayer;
}
...
```

![image](https://user-images.githubusercontent.com/78920592/204617835-be4674c5-bdec-49fe-a233-ff1688207d21.png)


9. Finalmente, si se ejecuta el proyecto localmente con npm run start:dev, ejecute un POST para crear un nuevo elemento. Si la respuesta es satisfactoria y si al ejecutar el GET se recupera el elemento creado, entonces la conexión con la base de datos fue exitosa.

![image](https://user-images.githubusercontent.com/78920592/204689475-e9a2dd1e-e1c5-465f-955c-274c8655a2a6.png)

![image](https://user-images.githubusercontent.com/78920592/204689520-c227d436-7d3d-4b33-8de2-3663627008d2.png)

Conexion con base de datos Exitosa!!!!!

