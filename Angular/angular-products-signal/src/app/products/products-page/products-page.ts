import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, signal, untracked, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Product } from '../interfaces/product';
import { ProductItem } from '../product-item/product-item';
import { ProductsService } from '../services/products-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'products-page',
  imports: [ReactiveFormsModule, ProductItem],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPage {
  title = 'Tabla de productos';
  searchControl = new FormControl('', { nonNullable: true });
  search = toSignal(this.searchControl.valueChanges.pipe(
      debounceTime(600), // 600 milisegundos hasta que deja de escribir
      distinctUntilChanged(), // Solo si el valor cambia
    ),
    { initialValue: '' },);
  showImage = signal(true);
  
  #productsService = inject(ProductsService);
  productsResource = this.#productsService.getProductsResource(this.search);

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
