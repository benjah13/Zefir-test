import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class SaveUserInput {
  @Field(() => String, { description: 'user email' })
  @IsString()
  @IsNotEmpty()
  email: string;
}
