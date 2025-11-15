import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductQueryDto } from '../dto/product-query.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Check if SKU already exists
    const existingProduct = await this.productRepository.findBySku(
      createProductDto.sku,
    );
    if (existingProduct) {
      throw new ConflictException(
        `Product with SKU '${createProductDto.sku}' already exists`,
      );
    }

    // Validate price
    if (createProductDto.price <= 0) {
      throw new BadRequestException('Price must be positive');
    }

    // Set default quantity if not provided
    const productData = {
      ...createProductDto,
      quantity: createProductDto.quantity ?? 0,
    };

    return await this.productRepository.create(productData);
  }

  async findAll(query: ProductQueryDto): Promise<{
    products: Product[];
    total: number;
    page: number;
    limit: number;
  }> {
    const result = await this.productRepository.findAll(query);

    return {
      ...result,
      page: query.page || 1,
      limit: query.limit || 10,
    };
  }

  async findOne(id: number): Promise<Product> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid product ID');
    }

    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // Check if product exists
    const existingProduct = await this.findOne(id);

    // Check if SKU is being updated and if it conflicts with another product
    if (updateProductDto.sku && updateProductDto.sku !== existingProduct.sku) {
      const productWithSku = await this.productRepository.findBySku(
        updateProductDto.sku,
      );
      if (productWithSku && productWithSku.id !== id) {
        throw new ConflictException(
          `Product with SKU '${updateProductDto.sku}' already exists`,
        );
      }
    }

    // Validate price if being updated
    if (updateProductDto.price !== undefined && updateProductDto.price <= 0) {
      throw new BadRequestException('Price must be positive');
    }

    // Validate quantity if being updated
    if (
      updateProductDto.quantity !== undefined &&
      updateProductDto.quantity < 0
    ) {
      throw new BadRequestException('Quantity cannot be negative');
    }

    const updatedProduct = await this.productRepository.update(
      id,
      updateProductDto,
    );
    if (!updatedProduct) {
      throw new NotFoundException(`Failed to update product with ID ${id}`);
    }

    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    // Check if product exists
    await this.findOne(id);

    const deleted = await this.productRepository.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Failed to delete product with ID ${id}`);
    }
  }
}
