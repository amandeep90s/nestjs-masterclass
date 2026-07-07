import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    environment: process.env.NODE_ENV || 'development',
    port: Number(process.env.APP_PORT) || 3000,
    apiVersion: process.env.API_VERSION || '0.1.1',
    aws: {
      publicBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
      region: process.env.AWS_REGION,
      cloudFrontUrl: process.env.AWS_CLOUDFRONT_URL,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  };
});
