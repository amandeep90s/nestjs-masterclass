import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../../src/app.module';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
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
