import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add validation pipe globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have any decorators
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      transformOptions: {
        enableImplicitConversion: true, // Enable implicit conversion for primitive types
      },
    }),
  );

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJs Masterclass - Blog App API')
    .setDescription('Use the base API Url as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000', 'Local Development Server')
    .addServer('https://api.example.com', 'Production Server')
    .setVersion('1.0')
    .build();
  // Instantiate swagger document
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  // Setup AWS S3 Bucket Configuration
  const serviceConfig = app.get(ConfigService);

  config.update({
    credentials: {
      accessKeyId: serviceConfig.get('appConfig.aws.accessKeyId'),
      secretAccessKey: serviceConfig.get('appConfig.aws.secretAccessKey'),
    },
    region: serviceConfig.get('appConfig.aws.region'),
  });

  // Enable CORS
  app.enableCors();

  // Add global interceptors
  // app.useGlobalInterceptors(new DataResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);

  console.log(`App is running on http://localhost:3000`);
}
void bootstrap();
