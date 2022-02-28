import { User } from './user.entity';
import { v4 as uuid } from 'uuid';

export const fakeUser: (override?: Partial<User>) => User = (override) => ({
  id: uuid(),
  fib: 0,
  email: 'test@zefir.fr',
  ...override,
});
