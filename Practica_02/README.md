# Practica_02

**POR:** *Brayan David Ruiz Dorado*

## Electiva IoT Web Semantica de las Cosas

## Evidencia practica_02 del 21/Nov

### Instalacion de Nodejs y Nestjs
Se validan versiones instaladas y se instala Nodejs y Nestjs

![Imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Nodejs%20y%20Nestjs%20version.png?raw=true)

Creamos un proyecto nuevo Nestjs con el nombre practica_2, el cual genera una carpeta con los siguientes archivos

![Imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/carpeta%20del%20proyecto.png?raw=true)

### Ejecutamos el ejemplo "HOLA MUNDO"

Montamos la carpeta donde instalamos node y verificamos su version

![Link de imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Verificando%20que%20esta%20instalado%20node.png?raw=true)

Por defecto el servidor esta constantemente escuchando el puerto 3000, y posteriormente mostramos que con la direccion host el servidor nos devueleve ese pequeño mensaje de Hello World

(![image](https://user-images.githubusercontent.com/78920592/203361196-5b65b19e-7c45-4f6d-a469-5a98b2173b47.png))

### Publicamos el codigo en GitHub

Configuramos la autenticación SSH para evitar ingresar la contraseña cada vez que se ejecuta el comando. Geramos la clave de autenticación SSH

![Imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Generamos%20la%20clave%20en%20linux.png?raw=true)
![Imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Generacion%20de%20clave%20SSH.png?raw=true)

Sincronizamos nuestro repositorio y asi poder evidenciar los cambios que se desarrollen en la practica

![Imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Sincronicando%20reposiorio%20Git%20a%20UBUNTU.png?raw=true)

## Los verbos HTTP

Trabajamos con Visual Studio Code, instalando la extension de Remote -SSH

![image](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Remote%20-SSh.png?raw=true)

Se ejecuta una petición Get, por esta razón el método anterior se ejecuta cuando se ingresa la dirección IP y puerto del servidor en el navegador Web. Los cambios se ven reflejados con la actualizacion de la carpeta montada.

![imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Modificacion%20Hola%20Mundo%201.png?raw=true)

Se verificar que el servidor responde con el mensaje de texto, se debe ingresar la dirección IP del servidor en el navegador Web o usando el comando CURL como se hizo previamente.

![imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Modificacion%20Hola%20Mundo%202.png?raw=true)

Creando un modificador

![imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/%C2%B4Creando%20una%20variable%20persona.png?raw=true)

Después se creará un método para modificar el mensaje adicional, y este método será invocado como un POST utilizando la ruta como entrada del parámetro nombre

![imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Metodo%20POST.png?raw=true)

Para validar el cambio en la variable desde el navegador, se debe llamará nuevamente al servidor al método GET como se ha hecho anteriormente. En el navegador se observará el mensaje

![imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Metodo%20POST%202.png?raw=true)

Se sube los cambios realizados a GitHub invocando en la terminal de la maquina virtual

![imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Se%20guardan%20los%20cambios%20realizados%20a%20GitHub%20por%20terminal.png?raw=true)

## Experimentaremos a continuacion con las anotaciones @Put(), @Delete() y @Patch().

Creamos una serie de peticiones con el fin de crear, eliminar, modificar un objeto, en el cual para este caso es un Carro, con sus respectivos atributos como lo son la Marca - Color - y el Kilometraje. Las peticiones se haran utilizando el Postman como se muestra a continuacion.

```
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
    Kilometraje: 180.000
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
```


### Metodo **GET**. Permite obtener y visualizar los atributos de los cuales esta compuesto el objeto llamado.

![imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/peticion%20GET%20a%20traves%20del%20Postman.png?raw=true)

### Metodo **POST**. Con esta peticion se logra generar o crear un nuevo objeto con los atributos especificos.

Hacemos la peticion POST a traves del Postman. Introducimos los valores por medio del panel a traves de la opcion raw y que sera mandada como un Json

![imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Hacemos%20la%20peticion%20POST%20a%20traves%20del%20Postman.png?raw=true)

Observamos que se hizo la peticion POST a traves del Postman

![imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Observamos%20que%20se%20hizo%20la%20peticion%20POST%20a%20traves%20del%20Postman.png?raw=true)

Observamos que se hizo la peticion POST a traves del Navegador

![imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Se%20observa%20que%20se%20ha%20creado%20el%20otro%20objeto%20con%20sus%20atributos.png?raw=true)

### Metodo **PUT**. Con esta peticion se logra actualizar el objeto con los nuevos atributos. Precisando el numero de id como se muestra a continuacion

![image](https://user-images.githubusercontent.com/78920592/204149760-1c57346b-8452-4d12-ab36-338fbe21eb5a.png)


Observamos que se hizo la peticion PUT a traves del Navegador

![image](https://user-images.githubusercontent.com/78920592/204149925-bd2e5a06-92c1-4d77-a304-3045d2e3eaf1.png)

### Metodo **Delete**. Con esta peticion se logra Eliminar un objeto en especifico. Precisando el numero de id como se muestra a continuacion

![image](https://user-images.githubusercontent.com/78920592/204150010-cb159751-c3fb-432c-8801-85b686fccf6c.png)

Observamos que si se realizo la peticion y lo visualizamos en el navegador  

![image](https://user-images.githubusercontent.com/78920592/204150037-0d8ff3a3-033d-4d9a-b8f3-0c0763c2ec95.png)

### Metodo **PATCH**. Con esta peticion se logra modificar un atributo en especifico de un objeto. Precisando los parametros como se muestra a continuacion

![image](https://user-images.githubusercontent.com/78920592/204150110-2de8f0c8-b5c2-4e00-9d90-83a3523ac621.png)

Se pueden evidenciar los cambios relizados en el panel inferior

## Se crea un commit en el repositorio a traves de la conexion remota con los siguientes comandos en la terminal.

![image](https://user-images.githubusercontent.com/78920592/204150526-85e49b7c-4327-4670-9a7f-fe24aa81a071.png)

## Se finalizo la practica 2


