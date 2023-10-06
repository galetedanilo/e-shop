import { EntityState } from '@ngrx/entity';
import { IApiError } from 'src/app/shared/interfaces/api-error.interface';
import { ApiCode, ApiMessage } from '../enums';
import { ICategory } from '../models';

export interface ICategoryState extends EntityState<ICategory> {
  isLoading: Readonly<boolean>;
  isFormLoading: Readonly<boolean>;
  selectedId: Readonly<string | null>;
  error: Readonly<IApiError<ApiCode, ApiMessage> | null>;
}
