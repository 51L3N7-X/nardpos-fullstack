import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource, DataSourceOptions } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Product } from '../../entities/product.entity';
import { databaseConfig } from '../../config/database.config';

async function runSeed() {
  const AppDataSource = new DataSource(databaseConfig as DataSourceOptions);

  try {
    await AppDataSource.initialize();
    console.log('Database connection established.');

    const productRepository = AppDataSource.getRepository(Product);

    // Clear existing data
    await productRepository.clear();
    console.log('Cleared existing products.');

    const products: Product[] = [];
    for (let i = 0; i < 50; i++) {
      const product = new Product();
      product.name = faker.commerce.productName();
      product.sku = faker.random.alphaNumeric(10).toUpperCase();
      product.price = parseFloat(faker.commerce.price());
      product.quantity = faker.datatype.number({ min: 1, max: 100 });
      products.push(product);
    }

    await productRepository.save(products);
    console.log(`Seeded ${products.length} products.`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await AppDataSource.destroy();
    console.log('Database connection closed.');
  }
}

runSeed();
