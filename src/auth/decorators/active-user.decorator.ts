import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../constants/auth.constants';
import { IActiveUserData } from '../interfaces/active-user-data.interface';
import { TRequestWithUser } from '../types/request-with-user.type';

export const ActiveUser = createParamDecorator(
  (field: keyof IActiveUserData | undefined, ctx: ExecutionContext) => {
    const request: TRequestWithUser = ctx.switchToHttp().getRequest();

    const user = request[REQUEST_USER_KEY] as IActiveUserData;

    return field ? user[field] : user;
  },
);
