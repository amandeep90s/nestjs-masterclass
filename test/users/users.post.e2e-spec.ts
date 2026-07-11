import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { appCreate } from 'src/app.create';
import { AppModule } from 'src/app.module';
import { App } from 'supertest/types';
import { dropDatabase } from '../helpers/drop-database';

jest.mock('@nestjs-modules/mailer/adapters/handlebars.adapter', () => ({
  HandlebarsAdapter: jest.fn().mockImplementation(() => ({ compile: jest.fn() })),
}));

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication<App>;
  let config: ConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ConfigModule],
      providers: [ConfigService],
    }).compile();

    app = moduleFixture.createNestApplication();
    appCreate(app);
    config = app.get<ConfigService>(ConfigService);
    await app.init();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  it.todo('/users - Endpoint is public');

  it.todo('/users - firstName is required');

  it.todo('/users - email is required');

  it.todo('/users - password is required');

  it.todo('/users - valid request successfully creates a user');

  it.todo('/users - password is not returned in the response');

  it.todo('/users - googleId is not returned in the response');
});
