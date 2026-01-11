import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetUserParamDto {
  @IsInt()
  @Type(() => Number)
  id: number;
}
