import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseRes {
  @Field()
  status: string;
  @Field()
  message: string;
}

@ArgsType()
export class DeleteArgs {
  @Field()
  id: string;
}

@ObjectType()
export class GetCountRes extends BaseRes {
  @Field()
  data: number;
}
