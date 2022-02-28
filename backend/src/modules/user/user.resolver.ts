import { Args, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OperationResult } from '../graphql/operation-result.object-type';
import { SaveUserInput } from './input/save-user.input';
import { SaveUserCommand } from './commands/save-user/save-user.command';
import { UserType } from './objec-type/user.type';
import { GetAllUsersQuery } from './queries/get-all-users/get-all-users.query';
import { AnagramRepository, ANAGRAM_REPOSITORY } from '../anagram/repository/anagram.repository';
import { Inject } from '@nestjs/common';
import { User } from './user.entity';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(ANAGRAM_REPOSITORY) private readonly anagramRepository: AnagramRepository,
  ) {}

  @Mutation(() => OperationResult, { description: 'create a new user' })
  async saveUser(@Args('input') { email }: SaveUserInput): Promise<OperationResult> {
    await this.commandBus.execute(new SaveUserCommand(email));
    return { success: true };
  }

  @Query(() => [UserType], { name: 'users', description: 'get all the users' })
  async users(): Promise<UserType[]> {
    return await this.queryBus.execute(new GetAllUsersQuery());
  }

  @ResolveField()
  async anagrams(@Parent() user: User) {
    const { id } = user;
    const anagram = await this.anagramRepository.getByUserId(id);
    return anagram ? anagram.anagramMap : '';
  }
}
