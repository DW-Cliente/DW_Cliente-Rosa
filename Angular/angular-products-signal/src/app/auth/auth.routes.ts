import { Routes } from "@angular/router";

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./register/register').then((m) => m.Register),
    title: 'Register | Angular Products',
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then((m) => m.Register),
    title: 'Registrar usuario | Angular Products',
  }
];
