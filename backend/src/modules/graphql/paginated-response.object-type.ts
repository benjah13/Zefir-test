import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export type PaginatedResponse<TItem> = {
  items: TItem[];
  total: number;
  hasMore: boolean;
};

export function PaginatedResponse<T>(classRef: Type<T>): Type<PaginatedResponse<T>> {
  @ObjectType(`${classRef.name}Edge`, { isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    items: T[];

    @Field(() => Int)
    total: number;

    @Field()
    hasMore: boolean;
  }
  return PaginatedType as any;
}
