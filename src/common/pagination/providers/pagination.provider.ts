import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { type Request } from 'express';
import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { IPaginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(
    /**
     * Injecting request to create request urls
     */
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  /**
   * Paginate a TypeORM repository query
   * @param paginationQuery
   * @param repository
   * @returns IPaginated<T>
   */
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<IPaginated<T>> {
    const results = await repository.find({
      take: paginationQuery.limit,
      skip: paginationQuery.page
        ? (paginationQuery.page - 1) * paginationQuery.limit
        : 0,
    });

    /**
     * Create the request urls
     */
    const baseUrl = `${this.request.protocol}://${this.request.headers.host}/`;
    const newUrl = new URL(this.request.url, baseUrl);

    /**
     * Calculating page numbers
     */
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);
    const nextPage =
      paginationQuery.page === totalPages
        ? paginationQuery.page
        : paginationQuery.page + 1;
    const prevPage =
      paginationQuery.page === 1
        ? paginationQuery.page
        : paginationQuery.page - 1;

    const finalResponse: IPaginated<T> = {
      data: results,
      meta: {
        itemsPerPage: paginationQuery.limit,
        totalItems,
        currentPage: paginationQuery.page,
        totalPages,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${prevPage}`,
      },
    };

    return finalResponse;
  }
}
