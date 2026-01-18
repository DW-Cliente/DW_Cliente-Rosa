import { computed, inject, Injectable, Signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductsResponse, SingleProductResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly #url = 'products';
  readonly #http = inject(HttpClient);

  getProductIdResource(id: Signal<number>) {
    return httpResource<SingleProductResponse>(() => `${this.#url}/${id()}`);
  }
  
  getProductsResource(search: Signal<string>) {
    const queryParams = computed(() => new URLSearchParams({ search: search() }).toString());
    return httpResource<ProductsResponse>(() => `products?${queryParams()}`);
  }

  changeRating(idProduct: number, rating: number): Observable<void> {
    return this.#http.put<void>(`${this.#url}/${idProduct}/rating`, {
      rating: rating,
    });
  }

  insertProduct(product: Product): Observable<Product> {
    return this.#http
      .post<SingleProductResponse>(this.#url, product)
      .pipe(map((resp) => resp.product));
  }

  deleteProduct(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#url}/${id}`);
  }
}
