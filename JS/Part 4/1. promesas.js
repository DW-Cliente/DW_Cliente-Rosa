/* function obtenerUsuario() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Usuario obtenido.");
            resolve({ id: 1, nombre: "Juan" });
        }, 1000);
    });
}

function obtenerPublicaciones(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Publicaciones del usuario ${userId} obtenidas.`);
            resolve(["Post 1", "Post 2"]);
        }, 1000);
    });
}

obtenerUsuario()
    .then((usuario) => {
        console.log(`Usuario encontrado: ${usuario.nombre}`);
        // Devulvemos una nueva promesa
        return obtenerPublicaciones(usuario.id);
    })
    .then((publicaciones) => {
        console.log("Publicaciones:", new Intl.ListFormat("es", {
            style: "long",
            type: "conjunction",
        }).format(publicaciones));
    })
    .catch((error) => {
        console.error("Error en la cadena:", error);
    }); */

/* function verificarNumero(num) {
    return new Promise((resolve, reject) => {
        if (num > 10) {
            resolve("El número es válido.");
        } else {
            reject("El número debe ser mayor que 10.");
        }
    });
}

function procesarValidez() {
    return Promise.resolve("Procesamiento adicional completado.");
}

verificarNumero(15) 
    .then((respuesta) => {
        console.log(respuesta);
        return procesarValidez(); // Si es válido, continuamos
    })
    .then((mensajeProcesado) => {
        console.log(mensajeProcesado);
    })
    .catch((error) => {
        console.error("Error de validación:", error);
    }); */


const autenticar = (user) => Promise.resolve(`Token para ${user}`);
const obtenerPerfil = (token) => Promise.resolve({ id: 123, token });
const cargarPermisos = (perfil) => Promise.reject("Error: Permisos no disponibles.");

autenticar("Admin")
    .then(token => {
        console.log("1. Autenticado, token obtenido.");
        return obtenerPerfil(token);
    })
    .then(perfil => {
        console.log("2. Perfil obtenido, solicitando permisos...");
        return cargarPermisos(perfil); // Esta promesa será rechazada
    })
    .then(permisos => {
        // Este bloque nunca se ejecutará
        console.log("3. Permisos cargados:", permisos);
    })
    .catch(error => {
        console.error("Error en el flujo:", error);
    });