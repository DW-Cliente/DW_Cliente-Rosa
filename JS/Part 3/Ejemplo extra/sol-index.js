const formulario = document.getElementById('mi-formulario');
const inputNombre = document.getElementById('nombre');
const textareaMensaje = document.getElementById('mensaje');
const checkboxTerminos = document.getElementById('terminos');
const boton = document.getElementById('boton-submit');
const zonaMouse = document.getElementById('zona-mouse');
const log = document.getElementById('log-eventos');
const coordenadas = document.getElementById('coordenadas');

/* Registro en nuestra consola */
function logEvent(eventName, elementId, extraClass = '') {
    const item = document.createElement('div');
    item.className = `log-item ${extraClass}`;
    item.textContent = `Evento: ${eventName} | Elemento: #${elementId}`;
    log.prepend(item); // prepend para que los nuevos eventos aparezcan arriba
}

/* Eventos del teclado */
inputNombre.addEventListener('keydown', (e) => logEvent(`keydown (${e.key})`, 'nombre'));
inputNombre.addEventListener('keypress', (e) => logEvent(`keypress (${e.key})`, 'nombre')); // Nota: keypress está obsoleto, pero se incluye para la demo.
inputNombre.addEventListener('keyup', (e) => logEvent(`keyup (${e.key})`, 'nombre'));

/* Eventos del ratón */
boton.addEventListener('click', () => logEvent('click', 'boton-submit'));
boton.addEventListener('dblclick', () => logEvent('dblclick', 'boton-submit'));
boton.addEventListener('mousedown', () => logEvent('mousedown', 'boton-submit'));
boton.addEventListener('mouseup', () => logEvent('mouseup', 'boton-submit'));
zonaMouse.addEventListener('mouseenter', () => logEvent('mouseenter', 'zona-mouse'));
zonaMouse.addEventListener('mouseleave', () => {
    logEvent('mouseleave', 'zona-mouse');
    coordenadas.textContent = ''; // Limpia coordenadas al salir
});
zonaMouse.addEventListener('mousemove', (e) => {
    // Para no saturar el log, mostramos esto en otro lado
    coordenadas.textContent = `X: ${e.offsetX}, Y: ${e.offsetY}`;
});

/* Eventos foco del input */
inputNombre.addEventListener('focus', () => logEvent('focus', 'nombre', 'focus'));
inputNombre.addEventListener('blur', () => logEvent('blur', 'nombre', 'blur'));

/* Con cada cambio */
inputNombre.addEventListener('input', () => logEvent(`input (valor: ${inputNombre.value})`, 'nombre'));
/* Al cambiar y perder el foco */
checkboxTerminos.addEventListener('change', () => logEvent(`change (marcado: ${checkboxTerminos.checked})`, 'terminos'));

/* selección de texto */
textareaMensaje.addEventListener('select', () => {
    const selection = textareaMensaje.value.substring(
        textareaMensaje.selectionStart,
        textareaMensaje.selectionEnd
    );
    logEvent(`select ("${selection}")`, 'mensaje');
});

/* Envío del form */
formulario.addEventListener('submit', (e) => {
    // Prevenimos que la página se recargue (comportamiento por defecto)
    e.preventDefault(); 
    logEvent('submit', 'mi-formulario');
    alert('Formulario enviado (revisa el registro)');
});