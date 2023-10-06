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
  {
    path: 'subcategories',
    title: 'E-Shop - Subcategoreis',
    loadChildren: () =>
      import('./modules/subcategories/subcategories.routes').then(
        r => r.SUBCATEGORIES_ROUTES
      ),
  },
];
