import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos';
import { Tag } from '../tag.entity';

@Injectable()
export class TagsService {
  constructor(
    /**
     * Inject tagsRepository
     */
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto);

    return await this.tagsRepository.save(tag);
  }

  /**
   * Find multiple tags by their IDs
   * @param tagIds
   * @returns
   */
  public async findMultipleByIds(tagIds: number[]) {
    return await this.tagsRepository.find({
      where: {
        id: In(tagIds),
      },
    });
  }
}
