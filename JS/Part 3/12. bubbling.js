let div1 = document.getElementById("div1");
let div2 = document.getElementById("div2");
let div3 = document.getElementById("div3");

let divClick = function(event) {
    console.log("Has pulsado: " + this.id);
};

/* div1.addEventListener('click', divClick);
div2.addEventListener('click', divClick);
div3.addEventListener('click', divClick); */

div1.addEventListener('click', divClick, true);
div2.addEventListener('click', divClick, true);
div3.addEventListener('click', divClick, true);
