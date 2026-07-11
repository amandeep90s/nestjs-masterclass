import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(configService: ConfigService): Promise<void> {
  // Create a new database connection using the configuration from ConfigService
  const AppDataSource = new DataSource({
    type: 'postgres',
    synchronize: configService.get('database.synchronize'),
    port: Number(configService.get('database.port')),
    host: configService.get('database.host'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.database'),
  });
  // Initialize the database connection
  await AppDataSource.initialize();
  // Drop all tables in the database
  await AppDataSource.dropDatabase();

  // Close the database connection
  await AppDataSource.destroy();
}
