import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

import { PaginationDto } from '../dtos/pagination.dto';
import { IPaginatedPayload } from '../interface/paginated-payload.interface';

@Injectable()
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  async paginatedQuery<T extends ObjectLiteral>({
    paginationDto,
    repository,
    where,
    relations,
  }: {
    paginationDto: PaginationDto;
    repository: Repository<T>;
    where?: FindOptionsWhere<T>;
    relations?: FindOptionsRelations<T>;
  }): Promise<IPaginatedPayload<T>> {
    const findOptions: FindManyOptions<T> = {
      skip: (paginationDto.page - 1) * paginationDto.limit,
      take: paginationDto.limit,
    };

    if (where) findOptions.where = where;
    if (relations) findOptions.relations = relations;

    const result = await repository.find(findOptions);
    const total = await repository.count();

    const totalItems = total;
    const itemsPerPage = paginationDto.limit;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = paginationDto.page;
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;

    const baseUrl = this.request.protocol + '://' + this.request.headers.host;
    const url = new URL(this.request.url, baseUrl);

    const response: IPaginatedPayload<T> = {
      data: result,
      metaData: {
        itemsPerPage,
        totalItems,
        totalPages,
        currentPage,
      },
      metaLinks: {
        firstPage: `${url.origin}${url.pathname}?page=1&limit=${itemsPerPage}`,
        lastPage: `${url.origin}${url.pathname}?page=${totalPages}&limit=${itemsPerPage}`,
        currentPage: `${url.origin}${url.pathname}?page=${currentPage}&limit=${itemsPerPage}`,
        nextPage: `${url.origin}${url.pathname}?page=${nextPage}&limit=${itemsPerPage}`,
        previousPage: `${url.origin}${url.pathname}?page=${previousPage}&limit=${itemsPerPage}`,
      },
    };

    return response;
  }
}
