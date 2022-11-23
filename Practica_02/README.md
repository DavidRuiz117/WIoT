# Practica_02

** POR ** *Brayan David Ruiz Dorado*

## Electiva IoT Web Semantica de las Cosas

## Evidencia practica_02 del 21/Nov

### Instalacion de Nodejs y Nestjs
Se validan versiones instaladas y se instala Nodejs y Nestjs

![Imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Nodejs%20y%20Nestjs%20version.png?raw=true)

### Ejecutamos el ejemplo "HOLA MUNDO"

Montamos la carpeta donde instalamos node y verificamos su version

![Link de imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Verificando%20que%20esta%20instalado%20node.png?raw=true)

Por defecto el servidor esta constantemente escuchando el puerto 3000

(![image](https://user-images.githubusercontent.com/78920592/203361196-5b65b19e-7c45-4f6d-a469-5a98b2173b47.png))

### Publicamos el codigo en GitHub

Configuramos la autenticación SSH para evitar ingresar la contraseña cada vez que se ejecuta el comando. Geramos la clave de autenticación SSH

![Imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Generamos%20la%20clave%20en%20linux.png?raw=true)
![Imagen](https://github.com/DavidRuiz117/WIoT/blob/main/Practica_02/Generacion%20de%20clave%20SSH.png?raw=true)

Sincronizamos nuestro repositorio y asi poder evidenciar los cambios que se desarrollen en la pracica

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
