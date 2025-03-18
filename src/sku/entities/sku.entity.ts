import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Supplier } from 'src/modules/supplier/entities/supplier.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('sku')
export class Sku {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  sku: string;

  @Field(() => Float)
  @Column('float')
  price: number;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field()
  @Column()
  manufacturer: string;

  @Field(() => Float, { nullable: true })
  @Column('float', { nullable: true })
  promoPrice: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.skus)
  @Field(() => Supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;
}
