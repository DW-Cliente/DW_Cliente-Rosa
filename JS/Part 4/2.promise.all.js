const promesa1 = new Promise(resolve => setTimeout(() => resolve("Dato 1"), 500));
const promesa2 = new Promise(resolve => setTimeout(() => resolve("Dato 2"), 800));

console.log("Iniciando promesas en paralelo...");

/* Promise.all([promesa1, promesa2])
  .then((resultados) => {
    console.log("Todas las promesas iniciales se completaron:", resultados);
    // Una vez que ambas terminan, iniciamos una nueva operación
    return new Promise(resolve => setTimeout(() => resolve("Operación finalizada"), 1000));
  })
  .then((mensajeFinal) => {
    console.log(mensajeFinal);
  })
  .catch(error => console.error(error)); */

// Salida:
// Iniciando promesas en paralelo...
// (800ms) Todas las promesas iniciales se completaron: [ 'Dato 1', 'Dato 2' ]
// (1800ms) Operación finalizada

/* async function obtenerMultiplesDatos() {
  try {
    console.time("Paralelo");
    const [p1, p2] = await Promise.all([ promesa1, promesa2 ]);
    console.log("Todas las promesas iniciales se completaron:", p1 , " y ", p2);
  } catch (error) {
    console.error("Error al obtener datos en paralelo:", error);
  }
}

obtenerMultiplesDatos(); */

/* const archivos = ["doc1.pdf", "doc2.pdf", "img1.png"];
const subirArchivo = (archivo) => new Promise(res => setTimeout(() => res(`Subido: ${archivo}`), Math.random() * 2000));

async function subirTodosLosArchivos() {
    console.log("Subiendo archivos en paralelo...");
    const promesasDeSubida = archivos.map(subirArchivo); // Crea un array de promesas

    const resultados = await Promise.all(promesasDeSubida); // Espera a que todas terminen
    console.log("Resultados:", resultados);
    console.log("¡Todos los archivos subidos!");
}

subirTodosLosArchivos(); */