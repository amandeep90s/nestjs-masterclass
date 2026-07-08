import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserProvider } from './create-user.provider';

describe('CreateUserProvider', () => {
  let provider: CreateUserProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserProvider,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: MailService, useValue: {} },
        { provide: HashingProvider, useValue: {} },
      ],
    }).compile();

    provider = module.get<CreateUserProvider>(CreateUserProvider);
  });

  describe('root', () => {
    it('should be defined"', () => {
      expect(provider).toBeDefined();
    });
  });
});
