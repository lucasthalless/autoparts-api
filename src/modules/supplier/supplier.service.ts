import { Injectable, Logger } from '@nestjs/common';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { SupplierRepository } from './supplier.repository';

@Injectable()
export class SupplierService {
  constructor(private readonly supplierRepository: SupplierRepository) {}

  private readonly logger = new Logger(this.constructor.name);

  async create(createSupplierInput: CreateSupplierInput) {
    try {
      const supplier =
        await this.supplierRepository.create(createSupplierInput);

      return supplier;
    } catch (error) {
      this.logger.error('Erro ao criar fornecedor: ', error.message);
    }
  }

  async getAll() {
    try {
      return await this.supplierRepository.getAll();
    } catch (error) {
      this.logger.error('Erro ao buscar fornecedores: ', error.message);
    }
  }

  async getById(id: string) {
    try {
      return await this.supplierRepository.findById(id);
    } catch (error) {
      this.logger.error('Erro ao buscar fornecedor: ', error.message);
    }
  }

  async update(updateSupplierInput: UpdateSupplierInput) {
    try {
      return await this.supplierRepository.update(updateSupplierInput);
    } catch (error) {
      this.logger.error('Erro ao atualizar fornecedor: ', error.message);
    }
  }

  async delete(id: string) {
    try {
      return await this.supplierRepository.delete(id);
    } catch (error) {
      this.logger.error('Erro ao deletar fornecedor: ', error.message);
    }
  }
}
