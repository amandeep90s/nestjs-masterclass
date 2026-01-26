import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { error } from 'console';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
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
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];

    // Create query runner instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect query runner to datasource
      await queryRunner.connect();

      // Start transaction
      await queryRunner.startTransaction();
    } catch {
      throw new RequestTimeoutException(
        'Unable to process request at this time please try again later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      // If successful commit transaction
      await queryRunner.commitTransaction();
    } catch {
      // If error rollback transaction
      await queryRunner.rollbackTransaction();

      throw new ConflictException(
        'Could not complete the transaction, please try again',
        {
          description: String(error),
        },
      );
    } finally {
      // Finally release query runner
      await queryRunner.release();
    }

    return newUsers;
  }
}
