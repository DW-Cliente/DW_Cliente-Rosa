const form = document.getElementById("formProducto");
const imgPreview = document.getElementById("imgPreview");
const template = document.getElementById("aficionesTemplate");
const tabla = document.getElementById("aficiones");

form.avatar.addEventListener("change", (event) => {
  let file = event.target.files[0];
  if (!file) {
    avatar.setCustomValidity("");
    return;
  }

  if (!file.type.startsWith("image")) {
    avatar.setCustomValidity("El archivo debe ser de tipo imagen");
  } else if (file.size > 100000) {
    avatar.setCustomValidity("No puedes seleccionar imágenes de más de 100KB");
  } else {
    avatar.setCustomValidity(""); // No hay error
  }
  avatar.reportValidity(); // Mostramos el posible mensaje de error sin esperar al envío (submit)

  imgPreview.src = URL.createObjectURL(file); // Representación interna de la URL al archivo
});

// Cuando se carga la imagen previsualizada liberamos la memoria de la URL (recomendado)
imgPreview.addEventListener("load", (e) => URL.revokeObjectURL(imgPreview.src));

form.addEventListener("submit", (e) => {
  // Evento de envío del formulario
  e.preventDefault(); // Impedimos que se recargue la página

  const formData = new FormData(form);
  const nombre = formData.get("nombre");
  console.log(nombre);
  console.log(formData.getAll("hobbies"));

  const ejHTML = template.content.cloneNode(true);
  const tr = ejHTML.firstElementChild;
  tr.querySelector("img").src = imgPreview.src;
  tr.children[1].textContent = form.nombre.value;
  tr.children[2].textContent = formData.getAll("hobbies");

  tabla.querySelector("tbody").append(tr);

  form.reset(); // Limpia los campos del formulario
  imgPreview.src = "";
});
