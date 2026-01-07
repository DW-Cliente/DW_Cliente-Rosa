import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  #titleService = inject(Title);
  constructor(){
    this.#titleService.setTitle("Productos | Angular Products");
    //...
  }
}
