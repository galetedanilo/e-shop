import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICategory } from '../models/category.model';
import { IApiError } from '../interfaces/api-error.interface';
import { Update } from '@ngrx/entity';
import { IMessages } from '../interfaces/messages.interface';

export const CategoriesActions = createActionGroup({
  source: 'Page Categories',
  events: {
    EnterPage: props<{ messages: IMessages }>(),
    LoadCategories: props<{ messages: IMessages }>(),
    LoadCategoriesSuccess: props<{ categories: ICategory[] }>(),
    LoadCategoriesFailure: props<{ error: IApiError }>(),
    CreateCategory: props<{ category: ICategory }>(),
    CreateCategorySuccess: props<{ category: ICategory }>(),
    CreateCategoryFailure: props<{ error: IApiError }>(),
    UpdateCategory: props<{ category: ICategory }>(),
    UpdateCategorySuccess: props<{ category: Update<ICategory> }>(),
    UpdateCategoryFailure: props<{ error: IApiError }>(),
    DeleteCategory: props<{ id: number }>(),
    DeleteCategorySuccess: props<{ id: number }>(),
    DeleteCategoryFailure: props<{ error: IApiError }>(),
    SetSelectedCategory: props<{ id: number }>(),
    ClearSelectedCategory: emptyProps(),
  },
});
