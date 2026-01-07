import { inject, Injectable, Signal } from '@angular/core';
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

  getProductsResource(search: Signal<string>) {
    return httpResource<ProductsResponse>(() => {
      const urlSearchParams = new URLSearchParams({ search: search() });
      return `${this.#url}?${urlSearchParams.toString()}`;
    });
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
