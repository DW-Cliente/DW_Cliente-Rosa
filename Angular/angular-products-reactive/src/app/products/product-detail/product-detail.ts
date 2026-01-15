import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, DestroyRef, effect, inject, input, numberAttribute } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StarRating } from "../../shared/star-rating/star-rating";
import { IntlCurrencyPipe } from "../../shared/pipes/intl-currency-pipe";
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products-service';

@Component({
  selector: 'product-detail',
  imports: [StarRating, IntlCurrencyPipe, DatePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  #titleService = inject(Title);
  id = input.required({ transform: numberAttribute });
  #productsService = inject(ProductsService);
  productResource = this.#productsService.getProductIdResource(this.id);
  product = computed(() => this.productResource.value()?.product);
   #router = inject(Router);
  #destroyRef = inject(DestroyRef);
  #changeDetector = inject(ChangeDetectorRef);
  
  constructor(){
    effect(() => {
      if (this.productResource.hasValue()) this.#titleService.setTitle(this.product()?.description + ' | Angular Products');
      if (this.productResource.error()) this.#router.navigate(['/products']);
    });
  }

  changeRating(rating: number) {
    const product = this.product()!;
    const oldRating = product.rating;
    product.rating = rating;

    this.#productsService
      .changeRating(product.id!, rating)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        error: () => {
          product.rating = oldRating;
          this.#changeDetector.markForCheck();
        },
      });
  }

  goBack() {
    this.#router.navigate(['/products']);
  }
}
