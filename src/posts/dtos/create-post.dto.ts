import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreatePostMetaOptionsDto } from 'src/meta-options/dtos';
import { EPostStatus, EPostType } from '../enums';

export class CreatePostDto {
  @ApiProperty({ description: 'Title of the post', example: 'My First Post' })
  @IsString()
  @MinLength(4, { message: 'Title must be at least 4 characters long' })
  @MaxLength(512, { message: 'Title must be at most 512 characters long' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ description: 'Slug for the post', example: 'my-first-post' })
  @IsString()
  @MinLength(4, { message: 'Slug must be at least 4 characters long' })
  @MaxLength(256, { message: 'Slug must be at most 256 characters long' })
  @IsNotEmpty({ message: 'Slug is required' })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'A slug should be all small letters and hyphens only',
  })
  slug: string;

  @ApiProperty({
    description: 'Possible types of the post: post, page, story, series',
    enum: EPostType,
    example: EPostType.POST,
  })
  @IsEnum(EPostType, { message: 'Invalid post type' })
  @IsNotEmpty({ message: 'Post type is required' })
  postType: EPostType;

  @ApiPropertyOptional({
    description: 'Content of the post',
    example: 'This is the content of my first post',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    description:
      'Possible statuses of the post: draft, published, review, scheduled',
    enum: EPostStatus,
    example: EPostStatus.DRAFT,
  })
  @IsEnum(EPostStatus, { message: 'Invalid post status' })
  @IsNotEmpty({ message: 'Post status is required' })
  status: EPostStatus;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown',
    example:
      '{"@context":"https://schema.org","@type":"BlogPosting","headline":"My First Post"}',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured image URL',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @MaxLength(1024, {
    message: 'Featured image URL must be at most 1024 characters long',
  })
  @IsUrl()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'Publication date of the post',
    example: '2025-05-05T07:45:32+0000',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  @ApiPropertyOptional({
    description: 'Array of tags associated with the post passed as strings',
    example: ['nestjs', 'typescript'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: 'Each tag must be a string' })
  @MinLength(3, {
    each: true,
    message: 'Each tag must be at least 3 characters long',
  })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Meta options for the post',
    type: CreatePostMetaOptionsDto,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto;
}
