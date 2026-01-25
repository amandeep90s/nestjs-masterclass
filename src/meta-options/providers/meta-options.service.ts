import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostMetaOptionsDto } from '../dtos';
import { MetaOption } from '../meta-option.entity';

/**
 * Class to connect to Meta Options table and perform business operations
 */
@Injectable()
export class MetaOptionsService {
  /**
   * Constructor
   * @param metaOptionsRepository
   */
  constructor(
    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * Create a new Post Meta Option
   * @param createPostMetaOptionsDto
   * @returns
   */
  public async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    const metaOption = this.metaOptionsRepository.create(
      createPostMetaOptionsDto,
    );

    return await this.metaOptionsRepository.save(metaOption);
  }
}
