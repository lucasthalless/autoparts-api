import { Field, InputType } from '@nestjs/graphql';
import { CreateSkuInput } from 'src/sku/dto/create-sku.input';

@InputType()
export class CreateSupplierInput {
  @Field()
  brandCode: string;

  @Field()
  name: string;

  @Field()
  cnpj: string;

  @Field()
  registration: string;

  @Field()
  addressLine: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  country: string;

  @Field()
  cep: string;

  @Field()
  phone: string;

  @Field(() => [String])
  contacts: string[];

  @Field()
  logo?: string;

  @Field({ nullable: true })
  discount?: string;

  @Field(() => [CreateSkuInput], { nullable: true })
  skus: CreateSkuInput[];
}
