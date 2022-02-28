import { InMemUserRepository } from '../../repository/in-mem-user.repository';
import { User } from '../../user.entity';
import { SaveUserCommand, SaveUserCommandHandler } from './save-user.command';
import { v4 as uuid } from 'uuid';

describe('SaveUserHandler', () => {
  let userRepository: InMemUserRepository;
  let handler: SaveUserCommandHandler;
  const email = 'test@zefir.fr';

  beforeEach(async () => {
    userRepository = new InMemUserRepository();
    handler = new SaveUserCommandHandler(userRepository);
  });

  afterEach(() => {
    userRepository.clear();
  });

  it('should save the new user', async () => {
    const command = new SaveUserCommand(email);
    await handler.execute(command);

    const count = userRepository.count();

    expect(count).toBe(1);
  });

  it('should throw an error if the address is already used', async () => {
    userRepository.saveUser(new User({ id: uuid(), email, fib: 1 }));

    const command = new SaveUserCommand(email);

    await expect(handler.execute(command)).rejects.toThrow('A user is already registered with this email');
  });

  it('should throw an error if the address is not well formatted', async () => {
    const wronglyFormattedAddress = 'a@gmail.com';
    const command = new SaveUserCommand(wronglyFormattedAddress);

    await expect(handler.execute(command)).rejects.toThrow('email addresses must be @zefir.fr');
  });
});
