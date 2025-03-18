import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkuInput } from './dto/create-sku.input';
import { Sku } from './entities/sku.entity';

@Injectable()
export class SkuRepository {
  constructor(
    @InjectRepository(Sku)
    private readonly supplierRepository: Repository<Sku>,
  ) {}

  async create(input: CreateSkuInput): Promise<Sku> {
    const supplier = this.supplierRepository.create(input);
    await this.supplierRepository.save(supplier);
    return supplier;
  }

  async getAll() {
    const skus = await this.supplierRepository.find({
      relations: { supplier: true },
    });

    return skus;
  }
}
