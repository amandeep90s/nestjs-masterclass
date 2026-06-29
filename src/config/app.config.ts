import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    environment: process.env.NODE_ENV || 'development',
    port: Number(process.env.APP_PORT) || 3000,
    apiVersion: process.env.API_VERSION || '0.1.1',
  };
});
