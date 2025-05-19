import { Routes } from '@angular/router';
import { isLoggedInGuard } from '../../core/guards/is-logged-in.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/signup/signup.component').then((m) => m.SignupComponent),
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'esqueci-minha-senha',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
    canActivate: [isLoggedInGuard],
  },
];
