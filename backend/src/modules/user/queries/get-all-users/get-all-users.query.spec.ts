import { fakeUser } from '../../fake-user.fixture';
import { InMemUserRepository } from '../../repository/in-mem-user.repository';
import { GetAllUsersHandler } from './get-all-users.query';

describe('GetAllUsersHandler', () => {
  let userRepository: InMemUserRepository;
  let handler: GetAllUsersHandler;
  const email = 'test@zefir.fr';
  const fib = 10;

  beforeEach(async () => {
    userRepository = new InMemUserRepository();
    handler = new GetAllUsersHandler(userRepository);
  });

  afterEach(() => {
    userRepository.clear();
  });

  it('should one  user', async () => {
    await userRepository.saveUser(fakeUser({ email, fib }));
    const restult = await handler.execute();

    expect(restult).toMatchObject([
      {
        email,
        fib,
      },
    ]);
  });

  it('should get several users', async () => {
    await userRepository.saveUser(fakeUser({ email, fib }));
    await userRepository.saveUser(fakeUser({ email: 'test2@zefir.fr', fib: 22 }));

    const result = await handler.execute();

    expect(result).toMatchObject([
      {
        id: expect.any(String),
        email,
        fib,
      },
      {
        id: expect.any(String),
        email: 'test2@zefir.fr',
        fib: 22,
      },
    ]);
  });
});
