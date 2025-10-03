let ul = document.querySelector("ul"); // Obtiene la primera lista (ul)
let li3 = ul.children[2]; // Tercer elemento de la lista (li)
let newLi3 = document.createElement("li"); // Crea un nuevo elemento de lista
newLi3.textContent = "Now I'm the third element"; // Y le asigna un texto

li3.before(newLi3); // Ahora li3 es el cuarto elemento de la lista (newLi3 se inserta antes)
li3.textContent = "I'm the fourth element..."; // Cambiamos el texto para reflejar que es el cuarto elemento