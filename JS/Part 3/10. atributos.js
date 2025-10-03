let link = document.getElementById("toGoogle");
link.classList.replace("normalLink", "specialLink");
link.setAttribute("href", "https://twitter.com"); // link.href = "https://twitter.com"
link.textContent = "Twitter";
if(!link.hasAttribute("title")) { // Si no tenía el atributo title, establecemos uno
    link.title = "Ahora voy a Twitter!";
}


console.log(link);
/* Imprime: <a id="toGoogle" href="https://twitter.com" class="specialLink" title="Ahora voy a Twitter!">Twitter</a> */

let div = document.getElementById("normalDiv");
div.style.boxSizing = "border-box";
div.style.maxWidth = "200px";
div.style.padding = "50px";
div.style.color = "white";
div.style.backgroundColor = "red";