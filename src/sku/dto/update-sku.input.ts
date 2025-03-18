import { CreateSkuInput } from './create-sku.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSkuInput extends PartialType(CreateSkuInput) {
  @Field(() => Int)
  id: number;
}
