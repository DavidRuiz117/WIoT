# Practica 3
**POR:** *David Ruiz*

## EVIDENCIAS CLASES 22/NOV/2022

## Arquitectura exagonal

  1. Para esta parte de la práctica se continua en base al objeto que se decidió modelar antes en el proyecto de la práctica 2. 
Que en este caso, vamos a usar el objeto Carro que representa los atributos en un carro en general.

![image](https://user-images.githubusercontent.com/78920592/204150878-59524f55-333e-433b-8745-b65ae00f3275.png)

  2. Se modifica el codigo para que se aplique la arquitectura hexagonal. La estructura sera:

![image](https://user-images.githubusercontent.com/78920592/204151758-37f7a4bf-fedf-433d-9724-0e039aa64980.png)

  3. Se modela los datos dentro de la carpeta models dentro de domain, modelando un objeto en este caso de tipo carro de manera 
abstracta y luego especificar los atributos. De esta manera se podrán agregar nuevos roles con sus especificaciones.

![image](https://user-images.githubusercontent.com/78920592/204153731-30797378-9f56-41c9-9892-d554222dbaa4.png)
![image](https://user-images.githubusercontent.com/78920592/204154404-f6e75d5e-ba13-4e60-bf6b-96d56120f04e.png)


  4. Se migra la funcionalidad implementada en el controlador a un servicio. Este proceso se hace en Carros.service.ts que esta dentro de services
 
 ```
  import { Injectable } from '@nestjs/common';
//Se importa el modelo de Categoria
import { Automovil } from '../models/Categoria.model';

@Injectable()
export class CarroService {
  
  private Automovil : Automovil[] = [{
    Marca: "Kia",
    Color: "Blanco",
    Kilometraje: 180000,
    Tipo: "Particular"
  }]

  public listar() : Automovil[]{
    return  this.Automovil
  }
  public crear (Tipo: Automovil): Automovil {
    this.Automovil.push(Tipo);
    return Tipo;
  }

  public modificar (id: number, Tipo: Automovil): Automovil{
    this.Automovil[id]=Tipo
    return this.Automovil[id]
  }

  public eliminar(id: number): boolean {
    const totalTiposAntes = this.Automovil.length;
    this.Automovil = this.Automovil.filter((val, index) => index != id);
    if(totalTiposAntes == this.Automovil.length){
    return false;
    }
    else{
    return true;
    }
}

  public cambiarColor(id: number, Color: string): Automovil {
      this.Automovil[id].Color = Color;
      return this.Automovil[id];
  }
}
```

  5. Posteriormente se Modificar el controlador Carros.controller.ts para que se emplee el la implementación del servicio. 
  Adicionalmente se adicionan bloques try/catch para manejar los errores y han sido suprimidos los tipos de retorno de 
  los métodos. El controlador quedará de la siguiente manera:
  
  ```
  import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CarroService } from '../../domain/services/Carros.service';
import { Automovil } from 'src/Carros/domain/models/Categoria.model';

const errReturn = (e: Error, message: string) => {
return {
  message: message,
  error: e
}
}

@Controller()
export class CarroController {
  constructor(public readonly CarroService: CarroService) { }

  @Get()
  getHello() {
    try{
      return this.CarroService.listar();
    }
    catch(e){
    return errReturn(e, "Error al listar Automoviles");
    }
    
  }

  @Post()
  crear(@Body() datos: Automovil) {
    try{
    return this.CarroService.crear(datos);
    }
    catch(e){
    return errReturn(e, "Error al crear Automovil");
    }
  }

  @Put(":id")
  modificar(@Body() datos: Automovil, @Param('id') id: number) {
    try{
    return this.CarroService.modificar(id, datos);
    }
    catch(e){
    return errReturn(e, "Error al modificar Automovil");
    }
  }

  @Delete(":id")
  eliminar(@Param('id') id: number){
    try{
      return this.CarroService.eliminar(id);
    }
    catch(e){
      return errReturn(e, "Error al eliminar Automovil");
    }
  }

  @Patch(":id/Color/:Color")
  cambiarColor(@Param('id') id: number, @Param('Color') Color: string){
    try{
      return this.CarroService.cambiarColor(id, Color);
    }
    catch(e){
      return errReturn(e, "Error al modificar Color del Automovil");
    }
  }
}
  ```
## Implementando seguridad

Usualmente los servicios web requieren de seguridad para proteger la información que se envía y recibe. En este caso vamos a implementar un sistema de autenticación y autorización para que los usuarios puedan acceder a los recursos del servidor.

  1. Instalar el paquete ```@nestjs/passport``` y ```passport```, que permitirá implementar la autenticación y autorización.
  
  ![image](https://user-images.githubusercontent.com/78920592/204179184-1842e31e-f3ec-432a-81dc-e224c030365e.png)
  
  2. NestJS integra un método para generar módulos rápidamente, primero se creará un módulo para autenticación con los siguientes comandos:
  
  ![image](https://user-images.githubusercontent.com/78920592/204179244-f693e9fc-7773-4f55-b10c-9f3c6d7b6870.png)

Ahora aparecerá una carpeta de nombre auth en la carpeta src con los archivos auth.module.ts y auth.service.ts y un archivo auth.service.spec.ts que contiene las pruebas unitarias del servicio
  
  ![image](https://user-images.githubusercontent.com/78920592/204179369-4dae8348-60f7-42b3-8f14-b94e2de6cb1a.png)

  3. Asi mismo se creará un módulo para gestionar usuarios
  
  ![image](https://user-images.githubusercontent.com/78920592/204179497-38f592a1-073b-40c2-a3b4-d01219d9e764.png)
  
  4. Luego, se implementa el servicio de usuarios, para este ejemplo se utilizarán un par de usuarios predefinidos
  
```
import { Injectable } from '@nestjs/common';

export type User = {
   userId: number,
   username: string,
   password: string
};

@Injectable()
export class UsersService {
   private readonly users: User[] = [
      {
         userId: 1,
         username: 'john',
         password: 'changeme',
      },
      {
         userId: 2,
         username: 'maria',
         password: 'guess',
      },
   ];

   /**
      * Recupera los datos del usuario
      * @param username Nombre de usuario
      * @returns 
      */
   async findOne(username: string): Promise<User | undefined> {
      return this.users.find(user => user.username === username);
   }
}
```
  5. Ahora es necesario configurar el servicio para que esté disponible para otros servicios instanciados, en Nest se configuran como módulos, entonces se modifica el archivo ```users.module.ts``` así:
  
  ![image](https://user-images.githubusercontent.com/78920592/204179733-caa92476-f130-4683-bea9-783b1ab21a68.png)
  
   6. Para obtener la funcionalidad esperada se modificará el archivo ```auth.service.ts```
    
    ![image](https://user-images.githubusercontent.com/78920592/204179900-6a537d57-a7d0-4bc9-88ba-f8dceaf9f30c.png)
    
    Ese servicio se encarga de validar que el usuario y la contraseña sean correctos, para eso se utiliza el servicio de usuarios.

  7. Posteriormente hay que habilitar el servicio de gestión de usuarios en el módulo de autenticación, para eso se modifica el archivo ```auth.module.ts```:
  ```
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
   imports: [UsersModule], // Importa el módulo de usuarios
   providers: [AuthService]
})
export class AuthModule {}
```

  8. implementar una estrategia para validar al usuario, esto se consigue con el paquete ```passport``` que se instaló previamente. Esto se consigue creando un archivo con el nombre ```local.strategy.ts``` dentro de la carpeta ```src/auth```.

![image](https://user-images.githubusercontent.com/78920592/204180111-165830ad-d91a-4266-aabb-b3dc6a0deb77.png)

  9. Ahora se debe configurar el módulo de autenticación para que utilice la estrategia de autenticación, para eso se modifica el archivo ```auth.module.ts```:
  
  ![image](https://user-images.githubusercontent.com/78920592/204180294-0f15fc7b-d0ca-4b7e-860c-90fcd376a62b.png)

  10. Por último, es momento de proteger a los enpoints desarrollados previamente con el nuevo servicio, primero se modifica el controlador de la siguiente manera:
```
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
...
import { AuthGuard } from '@nestjs/passport';

...

@Controller()
export class PlayerControllerImpl implements PlayerController {
...

@UseGuards(AuthGuard('local')) // Se adiciona esta anotación
@Post()
create(@Body() datos: Player) ...
```

  11. Si todo está bien, en este punto al llamar al enpoint POST del servidor la respuesta debería ser esta:

![image](https://user-images.githubusercontent.com/78920592/204180919-ae5833af-ff5b-499c-909d-41d44c39d2af.png)

Esto indica que está prohibido el acceso al recurso, ya que no se ha autenticado al usuario.

Para conseguirlo puede emplearse el comando `curl` de la siguiente manera:
```
curl -X POST http://localhost:3000 -d '{"username": "john", "password": "changeme", "name":"jugador"}' -H "Content-Type: application/json"
```
Para el ejemplo del jugador. En este punto debería crear un jugador, aunque tendrá un error, pues la contraseña estará contenida en el objeto que se guardará como un nuevo jugador:
```
{
   "name": "Cristiano Ronaldo",
   "lastname": "dos Santos Aveiro",
   "age": 37,
   "username": "john",
   "password": "changeme"
}
```
