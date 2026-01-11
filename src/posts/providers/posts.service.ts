import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  // Inject UsersService to potentially use user-related data
  constructor(private readonly usersService: UsersService) {}

  public findAll(userId: string) {
    const user = this.usersService.findById(Number(userId));

    return [
      { id: 1, title: 'First Post', user },
      { id: 2, title: 'Second Post', user },
    ];
  }
}
