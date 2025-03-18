import {
  BadRequestException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SkuService } from '../../sku/sku.service';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { Supplier } from './entities/supplier.entity';
import { SupplierService } from './supplier.service';

@Resolver(() => Supplier)
export class SupplierResolver {
  constructor(
    private readonly supplierService: SupplierService,
    private readonly skuService: SkuService,
  ) {}

  @Mutation(() => Supplier)
  async createSupplier(
    @Args('createSupplierInput') createSupplierInput: CreateSupplierInput,
  ) {
    const skus = createSupplierInput.skus;
    delete createSupplierInput.skus;
    const newSupplier = await this.supplierService.create(createSupplierInput);

    const newSkus = await this.skuService.createSkus(skus, newSupplier.id);

    return { ...newSupplier, newSkus };
  }

  @Mutation(() => Supplier)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = file.originalname;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(csv)$/)) {
          return callback(
            new BadRequestException('Somente arquivos CSV são permitidos!'),
            false,
          );
        }
        callback(null, true);
      },
      limits: { fileSize: 1024 * 1024 * 5 },
    }),
  )
  async createSupplierWithFile(
    @Args('createSupplierInput') createSupplierInput: CreateSupplierInput,
    @UploadedFile('skusCSV') file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo é obrigatório');
    }

    const newSupplier = await this.supplierService.create(createSupplierInput);

    const filePath = file.path;

    const skus = await this.skuService.createSkusFromCSV(
      filePath,
      newSupplier.id,
    );

    return { ...newSupplier, skus };
  }

  @Query(() => [Supplier])
  getSuppliers() {
    return this.supplierService.getAll();
  }

  @Query(() => Supplier)
  getSupplierById(@Args('id') id: string) {
    return this.supplierService.getById(id);
  }

  @Mutation(() => Supplier)
  updateSupplier(
    @Args('updateSupplierInput') updateSupplierInput: UpdateSupplierInput,
  ) {
    return this.supplierService.update(updateSupplierInput);
  }

  @Mutation(() => Supplier)
  deleteSupplier(@Args('id') id: string) {
    return this.supplierService.delete(id);
  }
}
