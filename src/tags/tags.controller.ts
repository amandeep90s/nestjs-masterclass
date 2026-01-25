import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateTagDto } from './dtos';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({ summary: 'Creates a new tag' })
  @ApiResponse({
    status: 201,
    description:
      'You will get a 201 response if your tag is created successfully',
  })
  @Post()
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @ApiOperation({ summary: 'Deletes an existing tag' })
  @ApiResponse({
    status: 200,
    description:
      'You will get a 200 response if your tag is deleted successfully',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the tag to delete',
    example: 1,
  })
  @Delete('/:id')
  public delete(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }
}
