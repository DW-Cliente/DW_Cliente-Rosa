const imagen = document.querySelector("#image");
const imgPreview = document.getElementById("imgPreview");
const form = document.getElementById("formProducto");
const template = document.getElementById("template");
const tabla = document.getElementById("products"); 

form.elements.namedItem("imagen").addEventListener('change', event => {
    let file = event.target.files[0];
    let reader = new FileReader();
    if (file) reader.readAsDataURL(file); // Serializar en base64
    reader.addEventListener('load', e => { // Serialización terminada
        imgPreview.src = reader.result; // Datos en Base64
    });
});
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(form);
    const plantilla = template.content.cloneNode(true);
    const tr = plantilla.firstElementChild;
    tr.querySelector("img").src = imgPreview.src;
    tr.children[1].textContent = formData.get("description");
    tr.children[2].textContent = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(formData.get("price"));
    tr.children[3].textContent = new Intl.DateTimeFormat('es-ES', {
    dateStyle: "short"
}).format(new Date());
    tabla.querySelector("tbody").append(tr);

    form.reset();
    imgPreview.src="";
});