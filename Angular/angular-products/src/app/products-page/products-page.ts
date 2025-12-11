import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { FormsModule } from '@angular/forms';
import { ProductItem } from '../product-item/product-item';
import { ProductForm } from '../product-form/product-form';
import { ProductsService } from '../services/products-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'products-page',
  imports: [FormsModule, ProductItem, ProductForm],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPage {
  title = 'Tabla de productos';
  search = signal('');
  #productsService = inject(ProductsService);
  products = signal<Product[]>([]);
  showImage = signal(true);
  fileName = '';
  filteredProducts = computed(() => {
    return this.search()
      ? this.products().filter((p) =>
          p.description.toLowerCase().includes(this.search().toLowerCase()),
        )
      : this.products();
  });

  constructor() {
    this.#productsService.getProducts().pipe(takeUntilDestroyed())
    .subscribe({
      next: (products) => this.products.set(products),
      error: (error) => console.error(error),
    }).add(/* Finaly */);
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
