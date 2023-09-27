import { EApiCode, EApiMessage } from '../enums/api-error.enum';

export interface IApiError {
  code: EApiCode;
  message: EApiMessage;
}
