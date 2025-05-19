import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/layout/auth/auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./domain/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
      {
        path: 'redefinir-senha',
        loadComponent: () =>
          import('./core/pages/reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent
          ),
      },
    ],
  },
];
