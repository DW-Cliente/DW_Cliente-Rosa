/* const personName = "John"; */
/* personName = 54; */
/* console.log(personName);

const a = []; // tipo any[]
a[0] = 23;
a[1] = "hello";
a.push(23);
a.push("vaca");
console.log(a);

const a1: string[] = [];
a1.push("Hola");
a1.push("Adiós");
// a1.push(123); // Argument of type 'number' is not assignable to parameter of type 'string'
console.log(a1); */

const a2: Array<number> = [];
a2.push(24);
a2.push(120);
console.log(a2);
/* 
const array2 = ["Hola", "Adiós"]; // string[] -> Array de strings
array2.push("Qué tal?");
// array2.push(23); // Argument of type 'number' is not assignable to parameter of type 'string'

function suma(n1: number, n2: number): number {
    return n1 + n2;
}

console.log(suma(2, 4));

// Recibe 2 parámetros de tipo number y devuelve un number
let f: (n1: number, n2: number) => number;
// No hace falta tipar parámetros o lo que devuelve al declararla
f = (n1, n2) => n1 + n2;
console.log(f(3, 5)); // 8
f = (n1, n2) => n1 - n2;
console.log(f(3, 5)); // -2

function operar(
    n1: number,
    n2: number,
    f: (n1: number, n2: number) => number
): number {
    return f(n1, n2);
}

console.log(operar(3, 5, (n1, n2) => n1 * n2)); */

/* Unión de tipos */
/* function longitud(cifra: number | string): number {
    if (typeof cifra === "number") {
        console.log(cifra.toFixed(2));
    }
    return String(cifra).length;
}

console.log(longitud(345)); // 3
console.log(longitud("6546")); // 4
// console.log(longitud(new Date())); // Argument of type 'Date' is not assignable to parameter of type 'string | number'

// Se puede hacer también una unión de valores literales
type Rol = "admin" | "usuario" | "invitado" | "mago";

class Persona {
    nombre: string;
    rol: Rol; // Solo puede ser "admin", "usuario" o "invitado"

    constructor(nombre: string, rol: Rol) {
        this.nombre = nombre ?? "Hola";
        this.rol = rol;
    }
}

const per = new Persona("Juan", "admin"); // OK
console.log(per);
// let per1 = new Persona("Pepe", "pera"); // ERROR: Argument of type '"mago"' is not assignable to parameter of type 'Rol'

type TuplaPersona = [string, number];
const p: TuplaPersona = ["Pepe", 23]; // OK
console.log(p); */
/* const p1: TuplaPersona = [45, 23]; // ERROR: Type 'number' is not assignable to type 'string'
console.log(p1); */
