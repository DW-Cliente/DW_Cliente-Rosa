export interface Direccion {
    calle: string;
    numero: number;
    cp: string;
}
export interface Persona {
    nombre: string;
    edad: number;
    direccion: Direccion;
    telefonos: string[];
}