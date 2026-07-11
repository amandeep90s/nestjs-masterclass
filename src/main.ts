import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appCreate } from './app.create';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Call the appCreate function to set up global configurations
  appCreate(app);

  // Start the application and listen on the specified port
  await app.listen(process.env.PORT ?? 3000);

  console.log(`App is running on http://localhost:3000`);
}
void bootstrap();
