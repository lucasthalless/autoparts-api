import { Injectable, Logger } from '@nestjs/common';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';
import { SkuRepository } from './sku.repository';
import { CreateSkuInput } from './dto/create-sku.input';

@Injectable()
export class SkuService {
  constructor(private readonly skuRepository: SkuRepository) {}

  private readonly logger = new Logger(this.constructor.name);

  async createSkus(skusToCreate: CreateSkuInput[], supplierId: string) {
    for (const item of skusToCreate) {
      try {
        await this.skuRepository.create({
          sku: item.sku,
          price: item.price,
          quantity: item.quantity,
          manufacturer: item.manufacturer,
          promoPrice: item.promoPrice,
          supplier: { id: supplierId },
        });

        console.log(`Skus salvos com sucesso.`);
      } catch (error) {
        console.error(`Erro ao salvar skus:`, error.message);
      }
    }
  }

  async createSkusFromCSV(filePath: string, supplierId: string) {
    const skusToCreate = [];

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          const sku = row.sku;
          const price = parseFloat(row.preco);
          const quantity = parseInt(row.quantidade, 10);
          const manufacturer = row.fabricante;
          const promoPrice = parseFloat(row.preco_promocional);

          if (
            !sku ||
            isNaN(quantity) ||
            isNaN(price) ||
            !manufacturer ||
            isNaN(promoPrice)
          ) {
            console.warn(
              `Dados inválidos encontrados na linha: ${JSON.stringify(row)}`,
            );
            return;
          }

          skusToCreate.push({
            sku,
            quantity,
            price,
            manufacturer,
            promoPrice,
          });
        })
        .on('end', async () => {
          console.log(`Total de skus a salvar: ${skusToCreate.length}`);

          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Erro ao remover arquivo:', err);
            }
          });

          for (const item of skusToCreate) {
            try {
              await this.skuRepository.create({
                sku: item.sku,
                price: item.price,
                quantity: item.quantity,
                manufacturer: item.manufacturer,
                promoPrice: item.promoPrice,
                supplier: { id: supplierId },
              });

              console.log(`Skus salvos com sucesso.`);
            } catch (error) {
              console.error(`Erro ao salvar skus:`, error.message);
            }
          }

          resolve();
        })
        .on('error', (error) => {
          console.error('Erro ao processar o CSV:', error.message);
          reject(error);
        });
    });
  }

  async getAll() {
    try {
      return await this.skuRepository.getAll();
    } catch (error) {
      this.logger.error('Erro ao buscar SKUs: ', error.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} sku`;
  }
}
