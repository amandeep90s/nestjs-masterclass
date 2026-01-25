export const appConfig = () => {
  return {
    environment: process.env.NODE_ENV || 'production',
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      autoLoadEntities: process.env.DB_AUTOLOADENTITIES === 'true',
    },
  };
};
