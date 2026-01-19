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

  public async findAll() {
    return await this.postsRepository.find({
      relations: {
        metaOptions: true,
        author: true,
      },
    });
  }

  /**
   * Find a post by its ID
   * @param id - ID of the post to find
   */
  public async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  }

  /**
   * Create a new post
   * @param createPostDto - Data Transfer Object containing post details
   * @returns
   */
  public async create(createPostDto: CreatePostDto) {
    // Find author by ID
    const author = await this.usersService.findById(createPostDto.authorId);
    if (!author) {
      throw new Error('Author not found');
    }
    // Create and save meta options if provided
    const post = this.postsRepository.create({ ...createPostDto, author });

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

  /**
   * Delete a post by its ID
   * @param id - ID of the post to delete
   */
  public async delete(id: number) {
    // Delete the post
    await this.postsRepository.delete(id);

    return { message: 'Post deleted successfully', deleted: true, id };
  }
}
