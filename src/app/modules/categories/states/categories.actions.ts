import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICategory } from '../models/category.model';
import { IApiError } from '../../../shared/interfaces/api-error.interface';
import { Update } from '@ngrx/entity';
import { IMessages } from 'src/app/shared/interfaces/messages.interface';
import { ApiCode, ApiMessage } from '../enums/api-error.enum';

export const CategoriesActions = createActionGroup({
  source: 'Page Categories',
  events: {
    EnterPage: props<{ messages: IMessages }>(),
    LoadCategories: props<{ messages: IMessages }>(),
    LoadCategoriesSuccess: props<{ categories: ICategory[] }>(),
    LoadCategoriesFailure: props<{ error: IApiError<ApiCode, ApiMessage> }>(),
    CreateCategory: props<{ category: ICategory }>(),
    CreateCategorySuccess: props<{ category: ICategory }>(),
    CreateCategoryFailure: props<{ error: IApiError<ApiCode, ApiMessage> }>(),
    UpdateCategory: props<{ category: ICategory }>(),
    UpdateCategorySuccess: props<{ category: Update<ICategory> }>(),
    UpdateCategoryFailure: props<{ error: IApiError<ApiCode, ApiMessage> }>(),
    DeleteCategory: props<{ id: string }>(),
    DeleteCategorySuccess: props<{ id: string }>(),
    DeleteCategoryFailure: props<{ error: IApiError<ApiCode, ApiMessage> }>(),
    SetSelectedCategory: props<{ id: string }>(),
    ClearSelectedCategory: emptyProps(),
  },
});
