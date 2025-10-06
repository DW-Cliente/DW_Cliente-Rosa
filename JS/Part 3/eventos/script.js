
/** El evento input lo implementaremos a posteriori, para validar el formulario */

/** Con el evento focus diremos el id del input que tiene el foco y 
 * pondremos un mensaje 'Por favor, introduce tu nombre' en el parrafoMensaje
 */

/** Con el evento blur diremos el id que ha perdido el foco y limpiaremos el párrafo */
/** Con el evento keydown, diremos qué tecla se ha pulsado, no se permite pulsar la x 
 * ¿Cómo haría para que no se pueda escribir?
*/


/** Cada vez que cambie el check diga si está aceptado o no
 * y cambie el atributo disabled a true/false
 */


miFormulario.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombreUsuario = campoNombre.value;
    const opcionSeleccionada = document.querySelector('input[name="lenguaje"]:checked');
    if (opcionSeleccionada) {
        const valor = opcionSeleccionada.value;
        console.log(`Tu lenguaje favorito es: ${valor}`);
    } else console.log('Por favor, selecciona una opción.');
    parrafoMensaje.textContent = `¡Hola, ${nombreUsuario}! Formulario enviado correctamente.`;
    miFormulario.reset(); // Método que limpia todos los campos del formulario
    botonEnviar.disabled = true; // Volver a deshabilitar el botón
});