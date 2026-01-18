import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64-directive';
import { minDateValidator } from '../../shared/directives/min-date';
import { CanComponentDeactivate } from '../../shared/guards/leave-page-guard';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products-service';

@Component({
  selector: 'product-form',
  imports: [ReactiveFormsModule, EncodeBase64Directive, DatePipe],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm implements CanComponentDeactivate {
  #productsService = inject(ProductsService);
  #destroyRef = inject(DestroyRef);
  saved = false;
  protected readonly today = new Date().toISOString().split('T')[0];
 /*  productForm = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    available: new FormControl('', [Validators.required, minDateValidator(this.today)]),
    imageUrl: new FormControl('',[Validators.required])
  }); */
  #fb = inject(NonNullableFormBuilder);

  productForm = this.#fb.group({
    description: ['', [Validators.required, Validators.minLength(5)]],
    price: [0, [Validators.required, Validators.min(1)]],
    available: ['', [Validators.required, minDateValidator(this.today)]],
    imageUrl: ['', [Validators.required]],
  });
  imageBase64 = '';
  #route = inject(Router);

  addProduct() {
    const product: Product = {
      /* ...(this.productForm.getRawValue() as unknown as Product),  */
      /* description: this.productForm.get('description')!.value!,
      price: this.productForm.get('price')!.value!,
      available: this.productForm.get('available')!.value!, */
       ...this.productForm.getRawValue(),
      rating: 1,
      imageUrl: this.imageBase64,
    };
    this.#productsService
      .insertProduct(product)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.saved = true;
        this.imageBase64 = ''; // La imagen también (no está vinculada al formulario)
        this.#route.navigate(['/products']);
      });
  }
  canDeactivate() {
    return (
      this.saved || this.productForm.pristine ||
      confirm('¿Quieres abandonar la página?. Los cambios se perderán...')
    );
  }
  constructor() {
/*     this.productForm.get('description')?.setValue('Para el editar formulario'); */
  }
  resetForm() {
    this.productForm.reset();
  }
}
