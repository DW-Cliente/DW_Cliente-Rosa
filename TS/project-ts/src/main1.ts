import type { Persona } from './interface/direccion';

/* class Persona {
    nombre: string;
    edad: number;
    protected rol: string;

    constructor(nombre: string, edad: number, rol: string) {
        this.nombre = nombre;
        this.edad = edad;
        this.rol = rol;
    }
}

const p = new Persona("Juan", 42, "admin"); */
// console.log(p.rol); // Property 'rol' is private and only accessible within class 'Persona'
// Object.entries(p).forEach(([k,v]) => console.log(`${k} => ${v}`)); // Recorremos las propiedades del objeto
/*
nombre => Juan
edad => 42
rol => admin -> Estamos accediendo a una propiedad "private". En JavaScript se elimina el modificador
*/

const p: Persona = {
    nombre: "Pedro",
    edad: 35,
    direccion: {
        calle: "Perico Palotes",
        numero: 12,
        cp: "24353"
    },
    telefonos: ["9542345453", "6574352643"]
};
console.log(p);

const a = ["perro", "casa", "árbol", "mesa", "coche"];
const palabra = a.find((p) => p.startsWith("z")); // Devuelve string | undefined

console.log(palabra.toLocaleUpperCase()); // ERROR: 'palabra' is possibly 'undefined'
console.log(palabra?.toLocaleUpperCase()); // Si palabra es undefined, devuelve undefined sin acceder al método