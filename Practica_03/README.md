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
