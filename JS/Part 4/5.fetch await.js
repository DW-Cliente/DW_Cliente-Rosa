import { SERVER } from "./constantes.js";
const plantilla = document.getElementById("template");
const tabla = document.getElementById("products");
const formulario = document.getElementById("formProducto");
const imgPreview = document.getElementById("imgPreview");
getProductos();

async function getProductos() {
  try {
    const resp = await fetch(`${SERVER}/products`);
    if (!resp.ok) throw new Error(resp.statusText); // El servidor devuelve un código de error
    const respJSON = await resp.json(); // Promesa
    respJSON.products.forEach((p) => mostrarProducto(p));
  } catch (error) {
    console.error(error);
  }
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
    try{      
      const resp = await fetch(`${SERVER}/products/${producto.id}`,{
            method: 'DELETE'
        });
        if(!resp.ok) throw new Error(resp.statusText);

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
    const resp = await fetch(`${SERVER}/products`, {
      method: "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!resp.ok) throw new Error(resp.statusText);
    const json = await resp.json();
    mostrarProducto(json.product);
  } catch (error) {
    console.error("Error añadiendo producto: " + error);
  }
  formulario.reset();
  imgPreview.src="";
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
