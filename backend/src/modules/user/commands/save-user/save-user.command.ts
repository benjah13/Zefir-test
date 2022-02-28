import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository, USER_REPOSITORY } from '../../repository/user.repository';
import { User } from '../../user.entity';
import { v4 as uuid } from 'uuid';
import { EmailAlreadyExistsError } from '../../error/email-already-exists.error';
import { InvalidEmailError } from '../../error/invalid-email.error';
import { AnagramService } from '../../../anagram/anagram.service';
import { ConfigService } from '../../../config/config.service';
import { Anagram } from '../../../anagram/anagram.entity';

export class SaveUserCommand {
  constructor(public readonly email: string) {}
}

@CommandHandler(SaveUserCommand)
export class SaveUserCommandHandler implements ICommandHandler<SaveUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly anagramService: AnagramService,
    private readonly configService: ConfigService,
  ) {}

  async execute(data: SaveUserCommand) {
    const { email } = data;

    const regex = new RegExp('[a-z0-9]+@zefir.fr');
    if (!regex.test(email)) {
      throw new InvalidEmailError('email addresses must be @zefir.fr');
    }

    const user = await this.userRepository.getUserByEmail(email);

    let anagrams: Anagram | undefined;
    if (user) {
      anagrams = await this.anagramService.getAnagramForUser(user.id);
      if (anagrams) {
        throw new EmailAlreadyExistsError('A user is already registered with this email');
      }
    }

    const id = user ? user.id : uuid();
    const min = Number(this.configService.get('USER_FIBONACCI_MIN') || '10');
    const max = Number(this.configService.get('USER_FIBONACCI_MAX') || '20');
    const fib = fibonacci(getRandomNumber(min, max));

    if (user) {
      await this.userRepository.updateUser(new User({ id, email, fib }));
    } else {
      await this.userRepository.saveUser(new User({ id, email, fib }));
    }
    await this.anagramService.createAnagram(id);
    console.log(`user ${id} created`);
  }
}

export function getRandomNumber(min: number, max: number) {
  return Math.ceil(Math.random() * (max - min) + min);
}

const fibonacci = (n: number): number => {
  if (n <= 0) return 0;
  if (n == 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
};
