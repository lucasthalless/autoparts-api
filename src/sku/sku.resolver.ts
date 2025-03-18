import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Sku } from './entities/sku.entity';
import { SkuService } from './sku.service';

@Resolver(() => Sku)
export class SkuResolver {
  constructor(private readonly skuService: SkuService) {}

  private readonly keys = {
    access_token: '4865444e5266585a754c6b58476f6863',
    maxICMS: '12',
    partner_id: '2009839',
    partner_secret:
      '555477446b45476f6f5669455746655a4d4f454b7a4d49704d77484441445450',
    profitMargin: '10',
    refresh_token: '414468694678524e6c4f734d444d6b4e',
    shop_id: 1348933320,
  };

  @Mutation(() => [Sku])
  async importCSVSkus(
    @Args('supplierId') supplierId: string,
    @Args('csvPath') csvPath: string,
  ) {
    return await this.skuService.createSkusFromCSV(csvPath, supplierId);
  }

  @Query(() => [Sku])
  getSkus() {
    return this.skuService.getAll();
  }

  // @Query(() => Sku)
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.skuService.findOne(id);
  // }

  // @Mutation(() => Sku)
  // updateSku(@Args('updateSkuInput') updateSkuInput: UpdateSkuInput) {
  //   return this.skuService.update(updateSkuInput.id, updateSkuInput);
  // }

  // @Mutation(() => Sku)
  // removeSku(@Args('id', { type: () => Int }) id: number) {
  //   return this.skuService.remove(id);
  // }
}
