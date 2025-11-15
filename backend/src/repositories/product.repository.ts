import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductQueryDto } from '../dto/product-query.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.repository.create(createProductDto);
    return await this.repository.save(product);
  }

  async findAll(
    query: ProductQueryDto,
  ): Promise<{ products: Product[]; total: number }> {
    const { search, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const queryBuilder = this.repository.createQueryBuilder('product');

    if (search) {
      queryBuilder.where('product.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    queryBuilder.skip(skip).take(limit).orderBy('product.createdAt', 'DESC');

    const [products, total] = await queryBuilder.getManyAndCount();

    return { products, total };
  }

  async findOne(id: number): Promise<Product | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findBySku(sku: string): Promise<Product | null> {
    return await this.repository.findOne({ where: { sku } });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    await this.repository.update(id, updateProductDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
