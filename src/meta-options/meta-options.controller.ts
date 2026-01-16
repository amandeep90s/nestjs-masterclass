import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from './dtos';
import { MetaOptionsService } from './providers/meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @Post()
  create(@Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    return this.metaOptionsService.create(createPostMetaOptionsDto);
  }
}
