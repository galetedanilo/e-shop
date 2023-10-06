import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ICategoriesService, CategoriesService } from './services';
import { CategoriesFeature, CategoriesEffect } from './states';

export const CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    providers: [
      { provide: ICategoriesService, useClass: CategoriesService },
      MessageService,
      ConfirmationService,
      provideState(CategoriesFeature),
      provideEffects(CategoriesEffect),
    ],
    loadComponent: () =>
      import('./categories.component').then(c => c.CategoriesComponent),
  },
];
