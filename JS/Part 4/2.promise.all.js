const promesa1 = new Promise(resolve => setTimeout(() => resolve("Dato 1"), 5000));
const promesa2 = new Promise(resolve => setTimeout(() => resolve("Dato 2"), 8000));

console.log("Iniciando promesas en paralelo...");
function sumPromise(n1, n2, time = 2000) {
    if (n1 < 0 || n2 < 0) {
        return Promise.reject("Can't add negative numbers");
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(n1 + n2), time);
    });
}
/* Promise.all([
    sumPromise(4, 7, 3000),
    sumPromise(9, 12, 1500),
    sumPromise(8, 36, 5000),
])
.then(res => console.log(res))
.catch(error => console.log(error)); // [11, 21, 44] */

/* Como el anterior, pero si alguna falla el resto se ejecuta, y el array en este caso tendrá:
status, value y reason(motivo del rejected) */
/* Promise.allSettled([
    sumPromise(4, 7, 3000),
    sumPromise(9, 12, 1500),
    sumPromise(-8, 36, 5000),
])
.then(res => console.log(res))
.catch(error => console.log(error)); // [11, 21, 44] */

/**Resultado de la promesa más rápida */
/* Promise.race([
    sumPromise(4, 7, 3000),
    sumPromise(9, 12, 1500),
    sumPromise(8, 36, 5000),
]).then(res => console.log(res)); */


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

async function obtenerMultiplesDatos() {
  try {
    console.log("Paralelo");
    const [p1, p2] = await Promise.all([ promesa1, promesa2 ]);
    console.log("Todas las promesas iniciales se completaron:", p1 , " y ", p2);
  } catch (error) {
    console.error("Error al obtener datos en paralelo:", error);
  }
}

obtenerMultiplesDatos();
console.log("ola k ase");

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