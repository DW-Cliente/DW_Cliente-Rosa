import {
  ChangeDetectionStrategy,
  Component,
  output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../interfaces/product';
import { EncodeBase64Directive } from '../directives/encode-base64-directive';

@Component({
  selector: 'product-form',
  imports: [FormsModule, EncodeBase64Directive],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm {
  add = output<Product>();
  newProduct: Product = {
    // Asignamos directamente
    id: 0,
    description: '',
    available: '',
    imageUrl: '',
    rating: 1,
    price: 0,
  };

  addProduct(productForm: NgForm) {
    this.add.emit({ ...this.newProduct });
    productForm.resetForm();
    this.newProduct.imageUrl = '';
  }
}
