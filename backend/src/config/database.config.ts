import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'nard_inventory',
  entities: [Product],
  synchronize: true, // Set to false in production
  logging: process.env.NODE_ENV === 'development',
};
