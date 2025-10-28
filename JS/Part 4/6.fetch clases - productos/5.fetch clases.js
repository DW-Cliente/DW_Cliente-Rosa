import { ProductoService } from "./productos.class.js";
const plantilla = document.getElementById("template");
const tabla = document.getElementById("products");
const formulario = document.getElementById("formProducto");
const imgPreview = document.getElementById("imgPreview");
const pService = new ProductoService();
getProductos();

async function getProductos() {
  try {
    const productos = await pService.getProductos();
    productos.forEach((p) => {
        mostrarProducto(p);});
  } catch (error) {
    console.error(error);
  }
}

async function mostrarProducto(producto) {
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
    try{      
      pService.delete(producto.id);
      tr.remove();
    }catch(error){
      console.log(`Error : ${error}`);
    }
    
  });

  tabla.querySelector("tbody").append(tr);
}

formulario.addEventListener("submit", addProducto);
async function addProducto(e) {
  e.preventDefault();
  let producto = {
    description: formulario.description.value,
    price: +formulario.price.value,
    imageUrl: imgPreview.src,
    available: new Date().toISOString().split("T")[0],
    rating: 1,
  };
  try {
    mostrarProducto(await pService.add(producto));
    formulario.reset();
    imgPreview.src = "";
  } catch (error) {
    console.error("Error añadiendo producto: " + error);
  }
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
