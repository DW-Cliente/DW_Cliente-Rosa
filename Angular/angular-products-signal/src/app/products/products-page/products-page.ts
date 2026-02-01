import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, signal, WritableSignal } from '@angular/core';
import { debounce, form, FormField } from '@angular/forms/signals';
import { Product } from '../interfaces/product';
import { ProductItem } from '../product-item/product-item';
import { ProductsService } from '../services/products-service';

@Component({
  selector: 'products-page',
  imports: [FormField, ProductItem],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPage {
  title = 'Tabla de productos';
  search = signal('');
  searchField = form(this.search, schema => {
    debounce(schema, 600);
  });

  showImage = signal(true);
  
  #productsService = inject(ProductsService);
  productsResource = this.#productsService.getProductsSearchResource(this.search);

  products: WritableSignal<Product[]> = linkedSignal({
    source: () => this.productsResource.value()?.products,
    computation: (resp, previous) => resp ? resp : previous?.value || [],
  });

  
  
  
  filteredProducts = computed(() => {
    return this.search()
      ? this.products().filter((p) =>
          p.description.toLowerCase().includes(this.search().toLowerCase()),
        )
      : this.products();
  });

  constructor() {
/*     this.#productsService.getProducts().pipe(takeUntilDestroyed())
    .subscribe({
      next: (products) => this.products.set(products),
      error: (error) => console.error(error),
    }).add( console.log("Final countdown")); */
  }

  toggleImage() {
    //    this.showImage.set(!this.showImage);
    this.showImage.update((show) => !show);
  }

  addProduct(product: Product) {
    this.products.update((products) => [...products, product]);
  }

  deleteProduct(product: Product) {
    this.products.update((products) => products.filter((p) => p !== product));
  }
}
