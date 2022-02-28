import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApolloClient, gql, InMemoryCache } from 'apollo-boost';
import { AppModule } from '../../app.module';

import { UserRepository, USER_REPOSITORY } from './repository/user.repository';
import { buildClient } from '../utils/client-graphql';
import { fakeUser } from './fake-user.fixture';

describe('users e2e ', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  const email = 'test@zefir.fr';

  let userRepository: UserRepository;

  const TCP_PORT = 4242;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    userRepository = testingModule.get(USER_REPOSITORY);

    app = testingModule.createNestApplication();
    await app.listen(TCP_PORT);
  });

  beforeEach(async () => {
    await userRepository.deleteAll();
  });

  afterAll(async () => {
    await userRepository.deleteAll();
    await app.close();
  });

  describe('saveUser', () => {
    const client = buildClient(TCP_PORT);

    const MUTATION_SAVE_USER = gql`
      mutation saveUser($email: String!) {
        saveUser(input: { email: $email }) {
          success
        }
      }
    `;

    const saveUser = (client: ApolloClient<InMemoryCache>, variables?: Record<string, unknown>) => {
      return client.mutate({
        mutation: MUTATION_SAVE_USER,
        variables,
        fetchPolicy: 'no-cache',
      });
    };

    it('saves a user', async () => {
      const { data } = await saveUser(client, { email });

      expect(data.saveUser).toEqual({ success: true });
      const users = await userRepository.getUserByEmail(email);
      expect(users).toEqual({
        email,
        fib: expect.any(Number),
        id: expect.any(String),
      });
    });

    it('returns an error if the email is not well formatted', async () => {
      const email = 'test@gmail.fr';

      await expect(
        saveUser(client, {
          email,
        }),
      ).rejects.toThrow(/email addresses must be @zefir.fr/);
    });

    it('returns an error if the email is already used', async () => {
      await saveUser(client, {
        email,
      });

      const promise = saveUser(client, {
        email,
      });

      await expect(promise).rejects.toThrow(/A user is already registered with this email/i);
    });
  });

  describe('getAllUsers', () => {
    const client = buildClient(TCP_PORT);

    const QUERY_GET_ALL = gql`
      query getAll {
        users {
          id
          email
          fib
        }
      }
    `;

    const getAll = (client: ApolloClient<InMemoryCache>) => {
      return client.mutate({
        mutation: QUERY_GET_ALL,
        fetchPolicy: 'no-cache',
      });
    };

    it('should not get anything if db is empty', async () => {
      const { data } = await getAll(client);

      expect(data.users).toEqual([]);
    });

    it('should return all the users', async () => {
      await userRepository.saveUser(fakeUser({ email: 'test@gmail.fr' }));
      await userRepository.saveUser(fakeUser({ email: 'secondtest@gmail.fr' }));

      const { data } = await getAll(client);
      expect(data.users).toHaveLength(2);
    });
  });
});
