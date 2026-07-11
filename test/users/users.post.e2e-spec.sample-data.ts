import { faker } from '@faker-js/faker';

export const completeUser = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: 'Aman@1234',
};

export const missingFirstName = {
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: 'Aman@1234',
};

export const missingEmail = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  password: 'Aman@1234',
};

export const missingPassword = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
};
