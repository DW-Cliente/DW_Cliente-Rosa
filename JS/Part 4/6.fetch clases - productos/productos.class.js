import { Http } from './http.class.js';
import { SERVER } from './constants.js';

export class ProductoService {
  #http;
  constructor() {
    this.#http = new Http();
  }

  async getProductos() {
    const resp = await this.#http.get(`${SERVER}/products`);
    return resp.products;
  }

  async add(product) {
    const resp = await this.#http.post(`${SERVER}/products`, product);
    return resp.product;
  }

  async update(product) {
    const resp = await this.#http.put(`${SERVER}/products/${product.id}`, product);
    return resp.product;
  }

  delete(id) {
    return this.#http.delete(`${SERVER}/products/${id}`);
  }
}