let boton = document.getElementById("boton");
let boton1 = document.getElementById("boton1");
let boton2= document.getElementById("boton2");
let boton3 = document.getElementById("boton3");
boton.addEventListener('click', function(event) {
    alert("Un evento " + event.type + " ha sido detectado en " + this.id);
});
boton.addEventListener('mouseenter', function(event) {
    console.log("lola");
});

function inputClick(event) {
    console.log("Un evento " + event.type + " ha sido detectado en " + this.id);
};

boton1.addEventListener('click', inputClick);
boton2.addEventListener('click', inputClick);
boton3.addEventListener('click', inputClick);
