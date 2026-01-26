import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dtos';
import { User } from '../user.entity';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     * Injecting datasource
     */
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Create multiple users
   * @param createUsersDto
   */
  public async createMany(createUsersDto: CreateUserDto[]) {
    const newUsers: User[] = [];

    // Create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    // Connect query runner to datasource
    await queryRunner.connect();

    // Start transaction
    await queryRunner.startTransaction();

    try {
      for (const user of createUsersDto) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      // If successful commit transaction
      await queryRunner.commitTransaction();
    } catch {
      // If error rollback transaction
      await queryRunner.rollbackTransaction();
    } finally {
      // Finally release query runner
      await queryRunner.release();
    }

    return newUsers;
  }
}
