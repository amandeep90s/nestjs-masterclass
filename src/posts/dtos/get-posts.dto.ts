import { IsDate, IsInt, IsOptional } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';
import { Type } from 'class-transformer';

class GetPostsBaseDto {
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  authorId?: string;
}

export class GetPostsDto extends IntersectionType(
  GetPostsBaseDto,
  PaginationQueryDto,
) {}
