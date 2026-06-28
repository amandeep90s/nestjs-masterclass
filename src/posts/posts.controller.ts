import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import type { IActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreatePostDto, UpdatePostDto } from './dtos';
import { GetPostsDto } from './dtos/get-posts.dto';
import { PostsService } from './providers/posts.service';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Retrieves all blog posts' })
  @ApiResponse({
    status: 200,
    description:
      'You will get a 200 response if your posts are retrieved successfully',
  })
  @Get()
  findAll(@Query() postQuery: GetPostsDto) {
    return this.postsService.findAll(postQuery);
  }

  @ApiOperation({ summary: 'Creates a new blog post' })
  @ApiResponse({
    status: 201,
    description:
      'You will get a 201 response if your post is created successfully',
  })
  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: IActiveUserData,
  ) {
    return this.postsService.create(createPostDto, user);
  }

  @ApiOperation({ summary: 'Retrieves a blog post by ID' })
  @ApiResponse({
    status: 200,
    description:
      'You will get a 200 response if your post is retrieved successfully',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the post to retrieve',
    example: 1,
  })
  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ summary: 'Updates an existing blog post' })
  @ApiResponse({
    status: 200,
    description:
      'You will get a 200 response if your post is updated successfully',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the post to update',
    example: 1,
  })
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Deletes an existing blog post' })
  @ApiResponse({
    status: 200,
    description:
      'You will get a 200 response if your post is deleted successfully',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the post to delete',
    example: 1,
  })
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }

  @ApiOperation({ summary: 'Deletes an existing blog post' })
  @ApiResponse({
    status: 200,
    description:
      'You will get a 200 response if your post is deleted successfully',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the post to delete',
    example: 1,
  })
  @Delete('/soft-delete/:id')
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.softDelete(id);
  }
}
