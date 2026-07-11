import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserProvider } from './create-user.provider';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});

describe('CreateUserProvider', () => {
  let provider: CreateUserProvider;
  let usersRepository: MockRepository<User>;
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserProvider,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: createMockRepository<User>() },
        { provide: MailService, useValue: { sendWelcome: jest.fn(() => Promise.resolve()) } },
        { provide: HashingProvider, useValue: { hashPassword: jest.fn(() => user.password) } },
      ],
    }).compile();

    provider = module.get<CreateUserProvider>(CreateUserProvider);
    usersRepository = module.get(getRepositoryToken(User));
  });

  describe('root', () => {
    it('should be defined"', () => {
      expect(provider).toBeDefined();
    });
  });
});
