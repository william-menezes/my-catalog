import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((m) => m.SignupComponent),
  },
];
