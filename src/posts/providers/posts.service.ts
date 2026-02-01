import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { Tag } from 'src/tags/tag.entity';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from '../dtos';
import { GetPostsDto } from '../dtos/get-posts.dto';
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
    /**
     * Inject tagsService
     */
    private readonly tagsService: TagsService,
    /**
     * Injecting paginationProvider
     */
    private readonly paginationProvider: PaginationProvider,
  ) {}

  public async findAll(postQuery: GetPostsDto): Promise<IPaginated<Post>> {
    return await this.paginationProvider.paginateQuery<Post>(
      { limit: postQuery.limit, page: postQuery.page },
      this.postsRepository,
    );
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
    // Find tags by their IDs if provided
    let tags: Tag[] = [];
    if (createPostDto.tags && createPostDto.tags.length > 0) {
      tags = await this.tagsService.findMultipleByIds(createPostDto.tags);
    }
    // Create and save meta options if provided
    const post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    return await this.postsRepository.save(post);
  }

  /**
   * Update an existing post
   * @param id - ID of the post to update
   * @param updatePostDto - Data Transfer Object containing updated post details
   * @returns
   */
  public async update(id: number, updatePostDto: UpdatePostDto) {
    let post: Post | null = null;
    let tags: Tag[] = [];

    // Find tags by their IDs if provided
    if (updatePostDto.tags && updatePostDto.tags.length > 0) {
      try {
        tags = await this.tagsService.findMultipleByIds(updatePostDto.tags);
      } catch {
        throw new RequestTimeoutException(
          'Unable to process request at this time please try again later',
          {
            description: 'Error connecting to the database',
          },
        );
      }
    }

    if (tags.length !== updatePostDto.tags?.length) {
      throw new BadRequestException(
        'Please check your tag Ids and ensure they are correct',
      );
    }

    // Find the existing post
    try {
      post = await this.postsRepository.findOne({
        where: { id },
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process request at this time please try again later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Update post properties
    post.title = updatePostDto.title ?? post.title;
    post.content = updatePostDto.content ?? post.content;
    post.status = updatePostDto.status ?? post.status;
    post.postType = updatePostDto.postType ?? post.postType;
    post.slug = updatePostDto.slug ?? post.slug;
    post.featuredImageUrl =
      updatePostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = updatePostDto.publishOn
      ? new Date(updatePostDto.publishOn)
      : post.publishOn;
    post.tags = tags.length > 0 ? tags : post.tags;

    try {
      await this.postsRepository.save(post);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process request at this time please try again later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    return post;
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

  /**
   * Soft delete a post by its ID
   * @param id
   * @returns
   */
  public async softDelete(id: number) {
    // Soft delete the post
    await this.postsRepository.softDelete(id);

    return { message: 'Post soft-deleted successfully', deleted: true, id };
  }
}
