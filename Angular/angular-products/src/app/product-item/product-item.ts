import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, output } from '@angular/core';
import { Product } from '../interfaces/product';
import { IntlCurrencyPipe } from '../pipes/intl-currency-pipe';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { StarRating } from '../star-rating/star-rating';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from '../services/products-service';

@Component({
  selector: 'product-item',
  imports: [IntlCurrencyPipe, DatePipe, UpperCasePipe, StarRating],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItem {
  product = input.required<Product>(); // required (obligatorio)
  showImage = input(true); // Con valor inicial por defecto (opcional)
  even = input.required<boolean>(); // required (obligatorio)
  deleted = output<void>();
  #productsService = inject(ProductsService);
  #changeDetector = inject(ChangeDetectorRef);
  #destroyRef = inject(DestroyRef);

  deleteProduct() {
    this.#productsService
      .deleteProduct(this.product().id!)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.deleted.emit());
  }

  changeRating(rating: number) {
    const oldRating = this.product().rating; // Guardamos puntuación actual
    this.product().rating = rating; // Modificamos antes de la llamada
    this.#productsService
      .changeRating(this.product().id!, rating)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        error: () => { // Ha habido un error (puntuación no cambiada en el servidor)
          this.product().rating = oldRating; // Restauramos puntuación
          this.#changeDetector.markForCheck(); // Detectar cambio
        },
      });
  }
}
