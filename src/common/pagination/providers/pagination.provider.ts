import { Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';

@Injectable()
export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    const results = await repository.find({
      take: paginationQuery.limit,
      skip: paginationQuery.page
        ? (paginationQuery.page - 1) * paginationQuery.limit
        : 0,
    });

    return results;
  }
}
