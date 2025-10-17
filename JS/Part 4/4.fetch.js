import { SERVER } from "./constantes.js";
const plantilla = document.getElementById("template");
const tabla = document.getElementById("products");
const formulario = document.getElementById("formProducto");
const imgPreview = document.getElementById("imgPreview");
getProductos();

function getProductos() {
  fetch(`${SERVER}/products`)
    .then((resp) => {
      if (!resp.ok) throw new Error(resp.statusText); // El servidor devuelve un código de error
      return resp.json(); // Promesa
    })
    .then((respJSON) => {
      respJSON.products.forEach((p) => mostrarProducto(p));
    })
    .catch((error) => console.error(error));
}

function mostrarProducto(producto) {
  const plantillaCl = plantilla.content.cloneNode(true);
  const tr = plantillaCl.firstElementChild;
  tr.querySelector("img").src = producto.imageUrl;
  tr.children[1].textContent = producto.description;
  tr.children[2].textContent = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(producto.price);
  tr.children[3].textContent = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(producto.available));
  tr.children[4].addEventListener("click", async () => {
          
      fetch(`${SERVER}/products/${producto.id}`,{method: 'DELETE'})
      .catch(error=>{console.log(error);})
      tr.remove();    
  });

  tabla.querySelector("tbody").append(tr);
}

formulario.addEventListener("submit", addProducto);
function addProducto(e) {
  e.preventDefault();
  let producto = {
    description: formProducto.description.value,
    price: +formProducto.price.value,
    imageUrl: imgPreview.src,
    available: new Date().toISOString().split("T")[0],
    rating: 1,
  };

  fetch(`${SERVER}/products`, {
    method: "POST",
    body: JSON.stringify(producto), // El servidor requiere que le enviemos los datos en JSON, los serializo
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((json) => {
      mostrarProducto(json.product);
      formProducto.reset();
      imgPreview.src = "";
    });
}

formulario.image.addEventListener("change", (e) => {
  const file = formulario.image.files[0];
  const reader = new FileReader();

  if (file) {
    // Si se ha seleccionado un archivo válido (convertir a Base64)
    reader.readAsDataURL(file);
  }

  reader.addEventListener("load", () => {
    // Evento de conversión a Base64 completa (asíncrono)
    imgPreview.src = reader.result; // Mostramos la imagen cargada en un elemento <img> (previsualización)
  });
});