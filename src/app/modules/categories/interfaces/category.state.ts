import { EntityState } from '@ngrx/entity';
import { ICategory } from '../models/category.model';
import { IApiError } from './api-error.interface';

export interface CategoryState extends EntityState<ICategory> {
  isFormLoading: Readonly<boolean>;
  isLoading: Readonly<boolean>;
  selectedCategoryId: Readonly<number | null>;
  error: Readonly<IApiError | null>;
}
