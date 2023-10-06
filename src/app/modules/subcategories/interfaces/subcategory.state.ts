import { EntityState } from '@ngrx/entity';
import { ISubcategory } from '../models/subcategory.model';

import { ApiCode, ApiMessage } from '../enums/api-error.enum';
import { IApiError } from 'src/app/shared/interfaces/api-error.interface';
import { ICategory } from '../models/category.model';

export interface ISubcategoryState extends EntityState<ISubcategory> {
  isLoading: Readonly<boolean>;
  isFormLoading: Readonly<boolean>;
  selectedId: Readonly<string | null>;
  categories: ReadonlyArray<ICategory>;
  error: Readonly<IApiError<ApiCode, ApiMessage> | null>;
}
