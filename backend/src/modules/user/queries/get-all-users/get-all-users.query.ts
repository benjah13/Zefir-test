import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserDto } from '../../dto/user.dto';
import { UserRepository, USER_REPOSITORY } from '../../repository/user.repository';
import { User } from '../../user.entity';

export class GetAllUsersQuery {}

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserDto[]> {
    return (await this.userRepository.getAllUsers()).map(this.mapToDto);
  }

  mapToDto = (user: User): UserDto => {
    return { ...user };
  };
}
