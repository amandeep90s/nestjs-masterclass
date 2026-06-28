import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { IActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { TagsService } from 'src/tags/providers/tags.service';
import { Tag } from 'src/tags/tag.entity';
import { UsersService } from 'src/users/providers/users.service';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos';
import { Post } from '../post.entity';

@Injectable()
export class CreatePostProvider {
  // Inject UsersService to potentially use user-related data
  constructor(
    /**
     * Inject usersService
     */
    private readonly usersService: UsersService,
    /**
     * Inject postsService
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    /**
     * Inject tagsService
     */
    private readonly tagsService: TagsService,
  ) {}

  public async create(createPostDto: CreatePostDto, user: IActiveUserData) {
    // Find author by ID
    const author: User = await this.usersService.findById(user.sub);

    // Find tags by their IDs if provided
    const tags: Tag[] = createPostDto.tags?.length
      ? await this.tagsService.findMultipleByIds(createPostDto.tags)
      : [];

    // Create and save meta options if provided
    const post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    try {
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException('Could not create post', {
        cause: error,
        description:
          'Ensure that the slug is unique and all required fields are provided.',
      });
    }
  }
}
