import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ description: 'Name of the tag', example: 'JavaScript' })
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(256, { message: 'Name must be at most 256 characters long' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Slug for the tag', example: 'javascript' })
  @IsString()
  @MinLength(4, { message: 'Slug must be at least 4 characters long' })
  @MaxLength(256, { message: 'Slug must be at most 256 characters long' })
  @IsNotEmpty({ message: 'Slug is required' })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'A slug should be all small letters and hyphens only',
  })
  slug: string;

  @ApiPropertyOptional({
    description: 'Content/description of the tag',
    example: 'This is the content of my first tag',
  })
  @IsString()
  @IsOptional()
  description?: string;

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
}
