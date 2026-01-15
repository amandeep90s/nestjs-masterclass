import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto, UpdatePostDto } from './dtos';
import { PostsService } from './providers/posts.service';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('{/:userId}')
  findAll(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @ApiOperation({ summary: 'Creates a new blog post' })
  @ApiResponse({
    status: 201,
    description:
      'You will get a 201 response if your post is created successfully',
  })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Updates an existing blog post' })
  @ApiResponse({
    status: 200,
    description:
      'You will get a 200 response if your post is updated successfully',
  })
  @Put()
  update(@Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(updatePostDto);
  }
}
