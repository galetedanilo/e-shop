import { Routes } from '@angular/router';
import { ICategoriesService } from './services/categories.service.interface';
import { CategoriesService } from './services/categories.service';
import { provideState } from '@ngrx/store';
import { CategoriesFeature } from './states/categories.feature';
import { provideEffects } from '@ngrx/effects';
import { CategoriesEffect } from './states/categories.effects';
import { ConfirmationService, MessageService } from 'primeng/api';

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
