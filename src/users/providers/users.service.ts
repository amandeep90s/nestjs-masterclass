import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public findAll(
    page: number,
    limit: number,
  ): Array<{ firstName: string; email: string }> {
    console.log({ page, limit });

    return [
      {
        firstName: 'John',
        email: 'john@example.com',
      },
      {
        firstName: 'Jane',
        email: 'jane@example.com',
      },
    ];
  }
}
