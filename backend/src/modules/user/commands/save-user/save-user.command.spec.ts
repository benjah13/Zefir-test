import { InMemUserRepository } from '../../repository/in-mem-user.repository';
import { User } from '../../user.entity';
import { SaveUserCommand, SaveUserCommandHandler } from './save-user.command';
import { v4 as uuid } from 'uuid';
import { ConfigProvider } from '../../../config/config.provider';
import { ConfigService } from '../../../config/config.service';
import { AnagramService } from '../../../anagram/anagram.service';

describe('SaveUserHandler', () => {
  let userRepository: InMemUserRepository;
  let handler: SaveUserCommandHandler;
  let configService: ConfigService;
  const anagramService = {} as AnagramService;
  const email = 'test@zefir.fr';

  beforeEach(async () => {
    userRepository = new InMemUserRepository();
    configService = new ConfigProvider();
    anagramService.createAnagram = jest.fn();
    anagramService.getAnagramForUser = jest.fn();
    handler = new SaveUserCommandHandler(userRepository, anagramService, configService);
  });

  afterEach(() => {
    userRepository.clear();
  });

  it('should save the new user', async () => {
    const command = new SaveUserCommand(email);
    await handler.execute(command);

    const count = userRepository.count();

    expect(count).toBe(1);
    expect(anagramService.createAnagram).toHaveBeenCalled();
  });

  it('should throw an error if the address is already used with associated anagrams', async () => {
    const userId = uuid();
    userRepository.saveUser(new User({ id: userId, email, fib: 1 }));
    anagramService.getAnagramForUser = jest.fn().mockResolvedValue({ anagramMap: '', id: uuid(), userId });
    const command = new SaveUserCommand(email);

    await expect(handler.execute(command)).rejects.toThrow('A user is already registered with this email');
  });

  it('should override existing user if address already exists but without anagrams', async () => {
    userRepository.saveUser(new User({ id: uuid(), email, fib: 1 }));
    anagramService.getAnagramForUser = jest.fn().mockResolvedValue(undefined);

    const command = new SaveUserCommand(email);
    await handler.execute(command);

    const count = userRepository.count();
    expect(count).toBe(1);
    expect(anagramService.createAnagram).toHaveBeenCalled();
  });

  it('should throw an error if the address is not well formatted', async () => {
    const wronglyFormattedAddress = 'a@gmail.com';
    const command = new SaveUserCommand(wronglyFormattedAddress);

    await expect(handler.execute(command)).rejects.toThrow('email address must be valid @zefir.fr address');
  });
});
