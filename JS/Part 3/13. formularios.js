const form = document.getElementById("formProducto");
const imgPreview = document.getElementById("imgPreview");
const tabla = document.getElementById("tablaAficiones");

form.elements.namedItem("avatar").addEventListener("change", (event) => {
  let file = event.target.files[0];
  let reader = new FileReader();
  if (file) reader.readAsDataURL(file); // Serializar en base64
  reader.addEventListener("load", (e) => {
    // Serialización terminada
    // imgPreview.src = reader.result; // Datos en Base64
    form.imgPreview.src = reader.result;
  });
});

form.addEventListener("submit", (e) => {
  // Evento de envío del formulario
  e.preventDefault(); // Impedimos que se recargue la página

  let nombre = form.nombre.value; // name como una propiedad del objeto
  console.log(nombre);
  let hobbies = Array.from(form.hobbies)
    .filter((h) => h.checked)
    .map((i) => i.value);
  console.log(hobbies);
  const avatar = imgPreview.src; // Imagen en base64
  const tbody = tabla.querySelector("tbody");
  const tr = document.createElement("tr");
  const tdAvatar = document.createElement("td");
  const tdNombre = document.createElement("td");
  const tdHobbies = document.createElement("td");
  const imgAvatar = document.createElement("img");
  imgAvatar.src = imgPreview.src;
  tdAvatar.append(imgAvatar);
  tdNombre.textContent = nombre;
  const formato = new Intl.ListFormat("es", {
    style: "long",
    type: "conjunction",
  });
  tdHobbies.textContent = formato.format(hobbies);

  tr.append(tdAvatar, tdNombre, tdHobbies);
  tbody.append(tr);
  form.reset(); // Limpia los campos del formulario
  imgPreview.src = "";
});
