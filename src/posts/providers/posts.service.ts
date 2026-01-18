import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from '../dtos';
import { Post } from '../post.entity';

@Injectable()
export class PostsService {
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
     * Inject metaOptionsRepository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public findAll(userId: string) {
    const user = this.usersService.findById(Number(userId));

    return [
      { id: 1, title: 'First Post', user },
      { id: 2, title: 'Second Post', user },
    ];
  }

  /**
   * Create a new post
   * @param createPostDto - Data Transfer Object containing post details
   * @returns
   */
  public async create(createPostDto: CreatePostDto) {
    // Create and save meta options if provided
    const post = this.postsRepository.create(createPostDto);

    return await this.postsRepository.save(post);
  }

  /**
   * Update an existing post
   * @param id - ID of the post to update
   * @param updatePostDto - Data Transfer Object containing updated post details
   * @returns
   */
  public update(id: number, updatePostDto: UpdatePostDto) {
    console.log({ id, updatePostDto });

    // Logic to update a post would go here
    return { message: 'Post updated successfully' };
  }
}
