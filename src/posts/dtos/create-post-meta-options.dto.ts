import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostMetaOptionsDto {
  @ApiProperty({ description: 'Key for the meta option', example: 'meta_key' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    description: 'Value for the meta option',
    example: 'meta_value',
  })
  @IsNotEmpty()
  value: any;
}
