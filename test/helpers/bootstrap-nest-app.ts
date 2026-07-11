import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { appCreate } from 'src/app.create';
import { AppModule } from 'src/app.module';
import { MailService } from 'src/mail/providers/mail.service';
import { App } from 'supertest/types';

export async function bootstrapNestApp(): Promise<INestApplication<App>> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, ConfigModule],
    providers: [ConfigService],
  })
    .overrideProvider(MailService)
    .useValue({ sendWelcomeEmail: jest.fn().mockResolvedValue(undefined) })
    .compile();

  const app: INestApplication<App> = moduleFixture.createNestApplication();

  appCreate(app);

  await app.init();

  return app;
}
