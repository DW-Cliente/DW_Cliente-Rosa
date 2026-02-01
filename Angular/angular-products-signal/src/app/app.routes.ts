import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    /* canActivate: [logoutActivateGuard], */
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./welcome/welcome').then((m) => m.Welcome),
    title: 'Bienvenido | Angular Products'
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.routes').then(m => m.productsRoutes)
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome' },
];