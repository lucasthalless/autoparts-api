import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Supplier } from 'src/modules/supplier/entities/supplier.entity';

@ObjectType()
export class ReadSkuResponse {
  @Field()
  id: string;

  @Field()
  sku: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field()
  manufacturer: string;

  @Field(() => Float, { nullable: true })
  promoPrice: number;

  @Field(() => Supplier)
  supplier: Supplier;
}
