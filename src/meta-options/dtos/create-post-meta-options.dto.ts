import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreatePostMetaOptionsDto {
  @ApiProperty({
    description: 'The metaValue should be a valid JSON string',
    example: '{"sidebarEnabled":true}',
  })
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
