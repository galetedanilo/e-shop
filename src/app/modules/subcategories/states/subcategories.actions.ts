import { createActionGroup, props } from '@ngrx/store';
import { ICategory } from '../models/category.model';
import { IMessages } from 'src/app/shared/interfaces/messages.interface';
import { IApiError } from '../../../shared/interfaces/api-error.interface';
import { ApiCode, ApiMessage } from '../enums/api-error.enum';
import { ISubcategory } from '../models/subcategory.model';

export const SubcategoriesActions = createActionGroup({
  source: 'Page Subcategories',
  events: {
    LoadSubcategories: props<{ messages: IMessages }>(),
    LoadSubcategoriesSuccess: props<{
      subcategories: ISubcategory[];
      categories: ICategory[];
    }>(),
    LoadSubcategoriesFailure: props<{
      error: IApiError<ApiCode, ApiMessage>;
    }>(),
  },
});
