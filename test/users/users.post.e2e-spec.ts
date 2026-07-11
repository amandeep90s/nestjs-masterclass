import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import request from 'supertest';
import { App } from 'supertest/types';
import { bootstrapNestApp } from '../helpers/bootstrap-nest-app';
import { dropDatabase } from '../helpers/drop-database';

jest.mock('@nestjs-modules/mailer/adapters/handlebars.adapter', () => ({
  HandlebarsAdapter: jest.fn().mockImplementation(() => ({ compile: jest.fn() })),
}));

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication<App>;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    app = await bootstrapNestApp();
    config = app.get<ConfigService>(ConfigService);
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  it('/users - Endpoint is public', async () => {
    return request(httpServer).post('/users').send({}).expect(400);
  });

  it.todo('/users - firstName is required');

  it.todo('/users - email is required');

  it.todo('/users - password is required');

  it.todo('/users - valid request successfully creates a user');

  it.todo('/users - password is not returned in the response');

  it.todo('/users - googleId is not returned in the response');
});
