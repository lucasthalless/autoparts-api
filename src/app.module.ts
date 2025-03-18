import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { GraphqlModule } from './config/graphql/graphql.module';
import { DatabaseModule } from './database/database.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { SkuModule } from './sku/sku.module';

@Module({
  imports: [
    GraphqlModule,
    ConfigModule,
    DatabaseModule,
    SupplierModule,
    SkuModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
