import { Field, ObjectType } from '@nestjs/graphql';
import { Sku } from 'src/sku/entities/sku.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('supplier')
export class Supplier {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  brandCode: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ unique: true })
  cnpj: string;

  @Field()
  @Column()
  registration: string;

  @Field()
  @Column()
  addressLine: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  cep: string;

  @Field()
  @Column()
  phone: string;

  @Field(() => [String])
  @Column('text', { array: true })
  contacts: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  cost?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  discount?: string;

  @Field(() => [Sku], { nullable: true })
  @OneToMany(() => Sku, (sku) => sku.supplier, {
    nullable: true,
    cascade: true,
  })
  skus: Sku[];
}
