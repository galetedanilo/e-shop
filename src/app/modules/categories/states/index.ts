import { provideState } from '@ngrx/store';
import { categoriesFeature } from './categories.feature';
import { provideEffects } from '@ngrx/effects';
import { CategoriesEffect } from './categories.effects';

export { CategoriesFacade } from './categories.facade';

export const provideCategoriesState = [
  provideState(categoriesFeature),
  provideEffects(CategoriesEffect),
];
