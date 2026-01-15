import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { EPostStatus, EPostType } from '../enums';
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';

export class CreatePostDto {
  @IsString()
  @MinLength(4, { message: 'Title must be at least 4 characters long' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Slug is required' })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'A slug should be all small letters and hyphens only',
  })
  slug: string;

  @IsEnum(EPostType, { message: 'Invalid post type' })
  @IsNotEmpty({ message: 'Post type is required' })
  postType: EPostType;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(EPostStatus, { message: 'Invalid post status' })
  @IsNotEmpty({ message: 'Post status is required' })
  status: EPostStatus;

  @IsOptional()
  @IsJSON()
  schema?: string;

  @IsOptional()
  @IsUrl()
  featuredImageUrl?: string;

  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: 'Each tag must be a string' })
  @MinLength(3, {
    each: true,
    message: 'Each tag must be at least 3 characters long',
  })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}
