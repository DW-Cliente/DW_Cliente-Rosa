import { Component, signal } from '@angular/core';
import { ProductsPage } from "./products-page/products-page";

@Component({
  selector: 'app-root',
  imports: [ProductsPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title2 = "Hola DAW";
  protected readonly title = signal('Angular products');
}
