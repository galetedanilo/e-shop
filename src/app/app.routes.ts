import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'categories',
    title: 'E-Shop - Categories',
    loadChildren: () =>
      import('./modules/categories/categories.routes').then(
        r => r.CATEGORIES_ROUTES
      ),
  },
];
