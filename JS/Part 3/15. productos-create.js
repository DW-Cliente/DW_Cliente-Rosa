const imagen = document.querySelector("#image");
const imgPreview = document.getElementById("imgPreview");
const form = document.getElementById("formProducto");
const tabla = document.getElementById("products");

form.elements.namedItem("imagen").addEventListener("change", (event) => {
  let file = event.target.files[0];
  let reader = new FileReader();
  if (file) reader.readAsDataURL(file); // Serializar en base64
  reader.addEventListener("load", (e) => {
    // Serialización terminada
    imgPreview.src = reader.result; // Datos en Base64
  });
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const tr = document.createElement("tr");
  const tdImg = document.createElement("td");
  const tdDesc = document.createElement("td");
  const tdPrice = document.createElement("td");
  const tdDate = document.createElement("td");
  const img = document.createElement("img");

  img.src = imgPreview.src;
  tdImg.append(img);
  tdDesc.textContent = formData.get("description");
  tdPrice.textContent = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(formData.get("price"));
  tdDate.textContent = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "short",
  }).format(new Date());
  tr.append(tdImg, tdDesc, tdPrice, tdDate);
  tabla.querySelector("tbody").append(tr);

  form.reset();
  imgPreview.src = "";
});
