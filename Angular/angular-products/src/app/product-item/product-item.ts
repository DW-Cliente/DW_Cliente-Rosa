import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../interfaces/product';
import { IntlCurrencyPipe } from '../pipes/intl-currency-pipe';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { StarRating } from '../star-rating/star-rating';

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

  deleteProduct() {
    this.deleted.emit();
  }
}
