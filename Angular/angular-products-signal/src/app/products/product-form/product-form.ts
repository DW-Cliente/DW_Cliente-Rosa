import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField, min, minLength, required } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64-directive';
import { CanComponentDeactivate } from '../../shared/guards/leave-page-guard';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products-service';
import { minDate } from '../../shared/directives/min-date';

@Component({
  selector: 'product-form',
  imports: [FormField, EncodeBase64Directive],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm implements CanComponentDeactivate {
  #productsService = inject(ProductsService);
  saved = false;
  protected readonly today = new Date().toISOString().split('T')[0];
  #route = inject(Router);

  productModel = signal<Product>({
    description: '',
    available: '',
    imageUrl: '',
    rating: 1,
    price: 0,
  });

  productForm = form(this.productModel, (schemaPath) => {
    required(schemaPath.description, { message: 'Description cannot be empty' });
    required(schemaPath.available, { message: 'Available date cannot be empty' });
    required(schemaPath.imageUrl);
    required(schemaPath.price, { message: 'Price cannot be empty' });
    minLength(schemaPath.description, 5, {
      message: (context) =>
        `You must enter at least ${5 - context.value().length} characters more`,
    });
    min(schemaPath.price, 0.01, { message: 'Price cannot be 0 or negative' });
    minDate(schemaPath.available, new Date().toISOString().slice(0, 10));
  });
  imageField = form(signal(''), field => {
    required(field, { message: 'You must choose an image file' });
  });

  addProduct(event: Event) {
    event.preventDefault();
    this.#productsService.insertProduct(this.productModel()).subscribe(() => {
        this.saved = true;
        this.#route.navigate(['/products']);
      });
  }
  canDeactivate() {
    return (
      this.saved || !this.productForm().dirty() ||
      confirm('¿Quieres abandonar la página?. Los cambios se perderán...')
    );
  }
  constructor() {
   /*  this.productForm.description().setControlValue('Valor inicial dado en el constructor'); */
  }
}
