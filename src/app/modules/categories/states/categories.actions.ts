import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICategoryModel } from '../models/category.model';
import { Update } from '@ngrx/entity';

export const categoriesActions = createActionGroup({
  source: 'Page Categories',
  events: {
    EnterPage: emptyProps(),
    LoadCategories: emptyProps(),
    LoadCategoriesSuccess: props<{ categories: ICategoryModel[] }>(),
    LoadCategoriesFailure: emptyProps(),
    CreateCategory: props<{ category: ICategoryModel }>(),
    CreateCategorySuccess: props<{ category: ICategoryModel }>(),
    CreateCategoryFailure: emptyProps(),
    UpdateCategory: props<{ category: ICategoryModel }>(),
    UpdateCategorySuccess: props<{ category: Update<ICategoryModel> }>(),
    UpdateCategoryFailure: emptyProps(),
    DeleteCategory: props<{ id: string }>(),
    DeleteCategorySuccess: props<{ id: string }>(),
    DeleteCategoryFailure: emptyProps(),
    SetSelectedCategory: props<{ id: string }>(),
  },
});
