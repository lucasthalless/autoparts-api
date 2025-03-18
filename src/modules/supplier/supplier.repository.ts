import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';

@Injectable()
export class SupplierRepository {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async create(input: CreateSupplierInput) {
    const supplier = this.supplierRepository.create(input);
    await this.supplierRepository.save(supplier);
    return supplier;
  }

  async getAll() {
    const skus = await this.supplierRepository.find({
      relations: { skus: true },
    });

    return skus;
  }

  findById(id: string) {
    return this.supplierRepository.findOneBy({ id });
  }

  async update(args: UpdateSupplierInput) {
    const supplier = await this.supplierRepository.preload(args);

    if (!supplier) {
      throw new BadRequestException('Supplier not found');
    }

    const updateSupplier = await this.supplierRepository.save(supplier);
    return updateSupplier;
  }

  async delete(id: string) {
    const result = await this.supplierRepository.delete(id);

    if (result.affected === 0) {
      throw new BadRequestException('Supplier not found');
    }

    return true;
  }
}
