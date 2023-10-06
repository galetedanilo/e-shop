import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { SubcategoriesFeature } from './states/subcategories.feature';
import { provideEffects } from '@ngrx/effects';
import { SubcategoreisEffect } from './states/subcategories.effects';
import { MessageService } from 'primeng/api';
import { ISubcategoryService } from './services/subcategory.service.interface';
import { SubcategoryService } from './services/subcategory.service';

export const SUBCATEGORIES_ROUTES: Routes = [
  {
    path: '',
    providers: [
      { provide: ISubcategoryService, useClass: SubcategoryService },
      MessageService,
      provideState(SubcategoriesFeature),
      provideEffects(SubcategoreisEffect),
    ],
    loadComponent: () =>
      import('./subcategories.component').then(c => c.SubcategoriesComponent),
  },
];
