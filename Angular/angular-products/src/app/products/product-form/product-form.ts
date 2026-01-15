import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64-directive';
import { CanComponentDeactivate } from '../../shared/guards/leave-page-guard';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products-service';
import { MinDate } from '../../shared/directives/min-date';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'product-form',
  imports: [FormsModule, EncodeBase64Directive, MinDate, DatePipe],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm implements CanComponentDeactivate{
  #productsService = inject(ProductsService);
  #destroyRef = inject(DestroyRef);
saved = false;
  newProduct: Product = {
    id: 0,
    description: '',
    available: '',
    imageUrl: '',
    rating: 1,
    price: 0,
  };

  addProduct() {
    this.#productsService
      .insertProduct(this.newProduct)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.saved = true;
        this.newProduct.imageUrl = ''; // La imagen también (no está vinculada al formulario)
      });
  }
  canDeactivate() {
    return this.saved || confirm('¿Quieres abandonar la página?. Los cambios se perderán...');
  }
}
