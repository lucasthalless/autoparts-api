import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { Supplier } from 'src/modules/supplier/entities/supplier.entity';
import { DeepPartial } from 'typeorm';

@InputType()
export class CreateSkuInput {
  @Field()
  sku: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field()
  manufacturer: string;

  @Field(() => Float, { nullable: true })
  promoPrice?: number;

  supplier: DeepPartial<Supplier>;
}
