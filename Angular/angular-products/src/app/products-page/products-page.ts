import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { FormsModule, NgForm } from '@angular/forms';
import {  DatePipe, UpperCasePipe } from '@angular/common';
import { IntlCurrencyPipe } from '../pipes/intl-currency-pipe';

@Component({
  selector: 'products-page',
  imports: [ FormsModule, UpperCasePipe, DatePipe, IntlCurrencyPipe],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPage {
  title = "Tabla de productos";
  search = signal('');
  products = signal<Product[]>([{
    id: 1,
    description: 'SSD hard drive',
    available: '2016-10-03',
    price: 75,
    imageUrl: '/ssd.jpg',
    rating: 5
  },{
    id: 2,
    description: 'LGA1151 Motherboard',
    available: '2016-09-15',
    price: 96.95,
    imageUrl: '/motherboard.jpg',
    rating: 4
  }]);

  showImage = signal(true);
  newProduct: Product = { // Asignamos directamente
    id: 0,
    description: '',
    available: '',
    imageUrl: '',
    rating: 1,
    price: 0
  };
  fileName = '';

  #changeDetector = inject(ChangeDetectorRef); // Necessary in new Angular zoneless apps


  filteredProducts = computed(() => {
    return this.search()
      ? this.products().filter((p) =>
          p.description.toLowerCase().includes(this.search().toLowerCase())
        )
      : this.products();
  });
  toggleImage() {
//    this.showImage.set(!this.showImage);
    this.showImage.update((show) => !show );
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files?.length) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newProduct.imageUrl = reader.result as string;
      this.#changeDetector.markForCheck(); // Necessary in new Angular zoneless apps
    });
  }

  addProduct(productForm: NgForm) {
    this.newProduct.id = Math.max(...this.products().map(p => p.id!)) + 1;
    const productClone = {...this.newProduct}; // Clonamos objeto antes de añadirlo
    this.products.update(products => [...products, productClone]); // Añadimos el producto al array
    
    productForm.resetForm();
    this.newProduct.imageUrl = '';
  }
  deleteProduct(product: Product) {
    this.products.update(products => products.filter(p => p !== product));
  }
}