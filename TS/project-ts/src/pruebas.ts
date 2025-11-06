export interface Producto {
    id?: number;
    descripcion: string;
    precio: number;
}

const productoCompleto: Readonly<Partial<Producto>> = {    
    precio: 34
};
console.log(productoCompleto.descripcion);