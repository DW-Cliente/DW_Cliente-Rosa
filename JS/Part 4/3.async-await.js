/* async function saludar() {
  return "Hola, mundo!";
}

saludar().then(console.log); // "Hola, mundo!" */

/* function obtenerMensaje() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Mensaje recibido después de 2 segundos"), 2000);
  });
}

async function mostrarMensaje() {
  console.log("Esperando el mensaje...");
  const mensaje = await obtenerMensaje(); // Pausa aquí por 2 segundos
  console.log(mensaje); // Esta línea se ejecuta después de la pausa
}

mostrarMensaje(); */

/* function operacionFallida() {
  return new Promise((_, reject) => {
    setTimeout(() => reject("¡Error de conexión!"), 1500);
  });
}

async function intentarOperacion() {
  try {
    console.log("Iniciando operación...");
    const resultado = await operacionFallida();
    console.log(resultado); // Esta línea nunca se ejecuta
  } catch (error) {
    console.error("Error capturado:", error);
  }
}

intentarOperacion();  */


const obtenerID = () => new Promise(res => setTimeout(() => res(5), 1000));
const obtenerNombre = (id) => new Promise(res => setTimeout(() => res(`Usuario ${id}: Elena`), 1000));
const obtenerEmail = (nombre) => new Promise(res => setTimeout(() => res(`${nombre}@correo.com`), 1000));

async function obtenerDatosCompletos() {
    console.time("Tiempo total");
    console.log("1. Obteniendo ID...");
    const id = await obtenerID();
    console.log("2. Obteniendo nombre para el ID:", id);
    const nombre = await obtenerNombre(id);
    console.log("3. Obteniendo email para:", nombre);
    const email = await obtenerEmail(nombre);
    console.log("Resultado final:", email);
    console.timeEnd("Tiempo total"); // Tarda ~3 segundos
}

obtenerDatosCompletos();