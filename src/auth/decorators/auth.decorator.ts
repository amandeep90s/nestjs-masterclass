import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';
import { EAuthType } from '../enums/auth-type.enum';

export const Auth = (...authTypes: EAuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authTypes);
