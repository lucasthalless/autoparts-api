import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/modules/supplier/entities/supplier.entity';
import { Sku } from './entities/sku.entity';
import { SkuRepository } from './sku.repository';
import { SkuResolver } from './sku.resolver';
import { SkuService } from './sku.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sku, Supplier])],
  providers: [SkuResolver, SkuService, SkuRepository],
  exports: [SkuService],
})
export class SkuModule {}
