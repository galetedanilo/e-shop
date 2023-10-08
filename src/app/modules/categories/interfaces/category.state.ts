import { EntityState } from '@ngrx/entity';
import { ICategoryModel } from '../models';

export interface ICategoryState extends EntityState<ICategoryModel> {
  isLoading: Readonly<boolean>;
  isFormLoading: Readonly<boolean>;
  selectedId: Readonly<string | null>;
}
