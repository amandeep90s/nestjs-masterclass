import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto, UpdatePostDto } from '../dtos';

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

  public create(createPostDto: CreatePostDto) {
    console.log({ createPostDto });

    // Logic to create a post would go here
    return { message: 'Post created successfully' };
  }

  public update(id: number, updatePostDto: UpdatePostDto) {
    console.log({ id, updatePostDto });

    // Logic to create a post would go here
    return { message: 'Post updated successfully' };
  }
}
