import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EFileType } from './enums/file-types.enum';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  path!: string;

  @Column({
    type: 'enum',
    enum: EFileType,
    default: EFileType.IMAGE,
    nullable: false,
  })
  type!: EFileType;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  mimetype!: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  size!: number;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
