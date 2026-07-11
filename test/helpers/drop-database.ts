import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(configService: ConfigService): Promise<void> {
  // Create a new database connection using the configuration from ConfigService
  const AppDataSource = new DataSource({
    type: 'postgres',
    synchronize: false,
    logging: false,
    port: Number(configService.get('database.port')),
    host: configService.get('database.host'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.database'),
  });

  try {
    // Initialize the database connection
    await AppDataSource.initialize();
    // Drop all tables in the database
    await AppDataSource.dropDatabase();
  } catch (error) {
    // Silently ignore errors - database might already be empty
    console.error('Error dropping database:', error);
  } finally {
    // Close the database connection
    try {
      await AppDataSource.destroy();
    } catch {
      // Ignore errors on close
    }
  }
}
