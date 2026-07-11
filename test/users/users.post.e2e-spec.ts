import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { DataSource } from 'typeorm';
import { bootstrapNestApp } from '../helpers/bootstrap-nest-app';
import { truncateDatabase } from '../helpers/truncate-database';
import {
  completeUser,
  missingEmail,
  missingFirstName,
  missingPassword,
} from './users.post.e2e-spec.sample-data';

jest.mock('@nestjs-modules/mailer/adapters/handlebars.adapter', () => ({
  HandlebarsAdapter: jest.fn().mockImplementation(() => ({ compile: jest.fn() })),
}));

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication<App>;
  let httpServer: App;
  let dataSource: DataSource;

  beforeAll(async () => {
    app = await bootstrapNestApp();
    httpServer = app.getHttpServer();
    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await truncateDatabase(dataSource);
  });

  it('/users - Endpoint is public', async () => {
    return request(httpServer).post('/users').send({}).expect(400);
  });

  it('/users - firstName is required', async () => {
    return request(httpServer).post('/users').send(missingFirstName).expect(400);
  });

  it('/users - email is required', async () => {
    return request(httpServer).post('/users').send(missingEmail).expect(400);
  });

  it('/users - password is required', async () => {
    return request(httpServer).post('/users').send(missingPassword).expect(400);
  });

  it('/users - valid request successfully creates a user', async () => {
    return request(httpServer).post('/users').send(completeUser).expect(201);
  });

  it('/users - password is not returned in the response', async () => {
    const response = await request(httpServer).post('/users').send(completeUser).expect(201);
    expect(response.body.password).toBeUndefined();
  });

  it('/users - googleId is not returned in the response', async () => {
    const response = await request(httpServer).post('/users').send(completeUser).expect(201);
    expect(response.body.googleId).toBeUndefined();
  });
});
