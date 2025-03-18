import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sku } from 'src/sku/entities/sku.entity';
import { SkuModule } from 'src/sku/sku.module';
import { Supplier } from './entities/supplier.entity';
import { SupplierRepository } from './supplier.repository';
import { SupplierResolver } from './supplier.resolver';
import { SupplierService } from './supplier.service';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier, Sku]), SkuModule],
  providers: [SupplierResolver, SupplierService, SupplierRepository],
})
export class SupplierModule {}
