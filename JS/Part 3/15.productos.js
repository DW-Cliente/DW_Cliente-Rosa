const imagen = document.querySelector("#image");
const imgPreview = document.getElementById("imgPreview");
const form = document.getElementById("formProducto");
const template = document.getElementById("template");
const tabla = document.getElementById("products"); 

form.imagen.addEventListener('change', event => {
    let file = event.target.files[0];
    imgPreview.src = URL.createObjectURL(file); // Representación interna de la URL al archivo
});

// Cuando se carga la imagen previsualizada liberamos la memoria de la URL (recomendado)
imgPreview.addEventListener('load', e => URL.revokeObjectURL(imgPreview.src));

form.addEventListener('submit', ()=>{

});