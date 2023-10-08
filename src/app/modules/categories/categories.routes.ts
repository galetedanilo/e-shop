import { Routes } from '@angular/router';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ACategoriesService, CategoriesService } from './services';
import { CategoriesFacade, provideCategoriesState } from './states';
import { inject } from '@angular/core';

const CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    providers: [
      { provide: ACategoriesService, useClass: CategoriesService },
      MessageService,
      ConfirmationService,
      CategoriesFacade,
      provideCategoriesState,
    ],
    canActivate: [() => inject(CategoriesFacade).enterPage()],
    loadComponent: () =>
      import('./containers/categories.component').then(
        c => c.CategoriesComponent
      ),
  },
];

export default CATEGORIES_ROUTES;
