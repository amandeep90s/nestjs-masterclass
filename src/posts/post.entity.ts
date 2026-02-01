import { MetaOption } from 'src/meta-options/meta-option.entity';
import { Tag } from 'src/tags/tag.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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
    type: 'timestamp', // 'datetime' in mysql
    nullable: true,
  })
  publishOn?: Date;

  @OneToOne(() => MetaOption, (metaOptions) => metaOptions.post, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  metaOptions?: MetaOption;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  author: User;

  @ManyToMany(() => Tag, (tag) => tag.posts, { eager: true })
  @JoinTable()
  tags?: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
