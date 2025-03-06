import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { GraphqlModule } from './config/graphql/graphql.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [GraphqlModule, ConfigModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
