import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => String, { description: 'user UUID' })
  id: string;

  @Field(() => String, { description: 'user email' })
  email: string;

  @Field(() => Number, { description: 'User fibonacci value' })
  fib: number;

  @Field(() => String, { description: 'User associated anagrams' })
  anagrams: string;
}
