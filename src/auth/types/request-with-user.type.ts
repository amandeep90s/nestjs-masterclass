import { Request } from 'express';
import { REQUEST_USER_KEY } from '../constants/auth.constants';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

export type TRequestWithUser = Request & {
  [REQUEST_USER_KEY]?: IJwtPayload;
};
