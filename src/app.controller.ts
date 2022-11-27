import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

interface Carro {
  Marca: string,
  Color: string,
  Kilometraje: number
}

@Controller()
export class AppController {
  constructor(public readonly appService: AppService) { }

  public Carros : Carro[] = [{
    Marca: "Kia",
    Color: "Blanco",
    Kilometraje: 180000
  }]

  @Get()
  getHello(): Carro[] {
    return this.Carros;
  }

  @Post()
  crear(@Body() datos: Carro): Carro {
    this.Carros.push(datos);
    return datos;
  }

  @Put(":id")
  modificar(@Body() datos: Carro, @Param('id') id: number): Carro | string {
    try{
    this.Carros[id] = datos
    return this.Carros[id];
    }
    catch{
      return `No fue posible modificar el carro en la posición ${id}`
    }
  }

  @Delete(":id")
  eliminar(@Param('id') id: number){
    try{
      this.Carros = this.Carros.filter((val, index) => index != id);
      return true;
    }
    catch{
      return false;
    }
  }

  @Patch(":id/Color/:Color")
  cambiarColor(@Param('id') id: number, @Param('Color') Color: string): Carro | string{
    try{
      this.Carros[id].Color = Color;
      return this.Carros[id];
    }
    catch{
      return `No fue posible modificar el color del carro en la posición ${id}`
    }
  }
}
