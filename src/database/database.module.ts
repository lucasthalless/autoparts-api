import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          url: 'postgresql://postgres:@localhost:5000/postgres',
          migrations: ['dist/database/migrations/*{.js,.ts}'],
          entities: ['dist/modules/**/entities/*.entity{.ts,.js}'],
          seeds: ['dist/**/*.seeder{.ts,.js}'],
          factories: ['dist/**/*.factory{.ts,.js}'],
          migrationsRun: false,
          logging: true,
          synchronize: true,
          autoLoadEntities: true,
          extra: {
            keepAlive: true,
            max: 10,
            min: 2,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 5000,
          },
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        const dataSource = new DataSource(options);
        await dataSource.initialize();
        return dataSource;
      },
    }),
  ],
})
export class DatabaseModule {}
