import { DataSource } from 'typeorm';

export async function truncateDatabase(dataSource: DataSource): Promise<void> {
  if (!dataSource.isInitialized) {
    return;
  }

  const tableNames = dataSource.entityMetadatas.map((entity) => `"${entity.tableName}"`).join(', ');

  await dataSource.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
}
