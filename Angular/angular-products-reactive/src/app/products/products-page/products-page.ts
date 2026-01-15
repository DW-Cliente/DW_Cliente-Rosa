import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { FormsModule } from '@angular/forms';
import { ProductItem } from '../product-item/product-item';
import { ProductsService } from '../services/products-service';

@Component({
  selector: 'products-page',
  imports: [FormsModule, ProductItem],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPage {
  title = 'Tabla de productos';
  search = signal('');
  showImage = signal(true);
  
  #productsService = inject(ProductsService);
  productsResource = this.#productsService.getProductsResource(this.search);

  products = linkedSignal(() =>
    this.productsResource.hasValue() ? this.productsResource.value().products : [],
  );

  
  
  
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
