import { Routes } from '@angular/router';
import { ProductDetail } from './product-detail/product-detail';
import { ProductForm } from './product-form/product-form';
import { ProductsPage } from './products-page/products-page';

export const routes: Routes = [
  { path: 'products',    
    children: [
       { path: '', title: 'Productos | Angular Products', component: ProductsPage },
       { path: 'add', title: 'Añadir producto | Angular Products', component: ProductForm },
       { path: ':id', component: ProductDetail }
    ]
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' }
];
