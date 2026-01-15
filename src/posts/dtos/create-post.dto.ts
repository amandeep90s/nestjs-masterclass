import { EPostStatus, EPostType } from '../enums';

export class CreatePostDto {
  title: string;
  slug: string;
  postType: EPostType;
  content?: string;
  status: EPostStatus;
  schema?: string;
  featuredImageUrl?: string;
  publishedOn?: Date;
  tags?: string[];
  metaOptions?: [{ key: string; value: string }];
}
