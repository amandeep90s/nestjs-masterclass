import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  /**
   * Fetch all users with pagination
   * @param page
   * @param limit
   * @returns
   */
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

  /**
   * Fetch a user by ID
   * @param getUserParamDto
   * @returns
   */
  public findById(id: number) {
    return {
      id,
      firstName: 'John',
      email: 'john@example.com',
    };
  }
}
