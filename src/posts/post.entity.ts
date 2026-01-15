import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreatePostMetaOptionsDto } from './dtos';
import { EPostStatus, EPostType } from './enums';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: EPostType,
    nullable: false,
    default: EPostType.POST,
  })
  postType: EPostType;

  @Column({
    type: 'enum',
    enum: EPostStatus,
    nullable: false,
    default: EPostStatus.DRAFT,
  })
  status: EPostStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishedOn?: Date;

  // TODO: Implement relations for tags and meta options
  tags?: string[];

  metaOptions?: CreatePostMetaOptionsDto[];
}
