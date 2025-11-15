/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductQueryDto } from '../dto/product-query.dto';
import { Product } from '../entities/product.entity';

describe('ProductController', () => {
  let controller: ProductController;
  let service: jest.Mocked<ProductService>;

  const mockProduct: Product = {
    id: 1,
    name: 'Laptop',
    sku: 'SKU123',
    price: 1000,
    quantity: 5,
    createdAt: new Date(),
  };

  const mockProductService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createProductDto: CreateProductDto = {
      name: 'Laptop',
      sku: 'SKU123',
      price: 1000,
      quantity: 5,
    };

    it('should create a product', async () => {
      service.create.mockResolvedValue(mockProduct);

      const result = await controller.create(createProductDto);

      expect(service.create).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    const query: ProductQueryDto = { page: 1, limit: 10, search: 'Laptop' };
    const mockResult = {
      products: [mockProduct],
      total: 1,
      page: 1,
      limit: 10,
    };

    it('should return all products with pagination', async () => {
      service.findAll.mockResolvedValue(mockResult);

      const result = await controller.findAll(query);

      expect(service.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      service.findOne.mockResolvedValue(mockProduct);

      const result = await controller.findOne(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('update', () => {
    const updateProductDto: UpdateProductDto = {
      name: 'Updated Laptop',
      price: 1200,
    };

    it('should update a product', async () => {
      const updatedProduct = { ...mockProduct, ...updateProductDto };
      service.update.mockResolvedValue(updatedProduct);

      const result = await controller.update(1, updateProductDto);

      expect(service.update).toHaveBeenCalledWith(1, updateProductDto);
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      service.remove.mockResolvedValue(undefined);

      await controller.remove(1);

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
