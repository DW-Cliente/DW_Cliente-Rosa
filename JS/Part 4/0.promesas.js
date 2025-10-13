const promesaExitosa = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("¡Operación completada con éxito!");
    }, 1000);
});

promesaExitosa
    .then((mensaje) => {
        console.log(mensaje); // Se ejecuta si la promesa tiene éxito
    })
    .catch((error) => {
        console.error(error); // Se ejecutaría si fallara
    });

/* const promesaFallida = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Algo salió mal. ");
  }, 1500);
});

promesaFallida
  .then((mensaje) => {
    console.log(mensaje); // Este bloque no se ejecutará
  })
  .catch((error) => {
    console.error(error); // Se ejecuta para manejar el error
  }); */
