/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductQueryDto } from '../dto/product-query.dto';
import { Product } from '../entities/product.entity';

describe('ProductService', () => {
  let service: ProductService;
  let repository: jest.Mocked<ProductRepository>;

  const mockProduct: Product = {
    id: 1,
    name: 'Laptop',
    sku: 'SKU123',
    price: 1000,
    quantity: 5,
    createdAt: new Date(),
  };

  const mockProductRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findBySku: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get(ProductRepository);
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

    it('should create a new product', async () => {
      repository.findBySku.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockProduct);

      const result = await service.create(createProductDto);

      expect(repository.findBySku).toHaveBeenCalledWith(createProductDto.sku);
      expect(repository.create).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(mockProduct);
    });

    it('should throw ConflictException if SKU already exists', async () => {
      repository.findBySku.mockResolvedValue(mockProduct);

      await expect(service.create(createProductDto)).rejects.toThrow(
        ConflictException,
      );
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if price is not positive', async () => {
      const invalidDto = { ...createProductDto, price: -100 };
      repository.findBySku.mockResolvedValue(null);

      await expect(service.create(invalidDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('should set default quantity to 0 if not provided', async () => {
      const dtoWithoutQuantity = { ...createProductDto };
      delete dtoWithoutQuantity.quantity;

      repository.findBySku.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockProduct);

      await service.create(dtoWithoutQuantity);

      expect(repository.create).toHaveBeenCalledWith({
        ...dtoWithoutQuantity,
        quantity: 0,
      });
    });
  });

  describe('findAll', () => {
    const query: ProductQueryDto = { page: 1, limit: 10, search: 'Laptop' };
    const mockResult = {
      products: [mockProduct],
      total: 1,
    };

    it('should return paginated products', async () => {
      repository.findAll.mockResolvedValue(mockResult);

      const result = await service.findAll(query);

      expect(repository.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual({
        ...mockResult,
        page: 1,
        limit: 10,
      });
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      repository.findOne.mockResolvedValue(mockProduct);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProduct);
    });

    it('should throw NotFoundException if product not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for invalid id', async () => {
      await expect(service.findOne(0)).rejects.toThrow(BadRequestException);
      await expect(service.findOne(-1)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    const updateProductDto: UpdateProductDto = {
      name: 'Updated Laptop',
      price: 1200,
    };

    it('should update a product', async () => {
      const updatedProduct = { ...mockProduct, ...updateProductDto };
      repository.findOne.mockResolvedValue(mockProduct);
      repository.update.mockResolvedValue(updatedProduct);

      const result = await service.update(1, updateProductDto);

      expect(repository.findOne).toHaveBeenCalledWith(1);
      expect(repository.update).toHaveBeenCalledWith(1, updateProductDto);
      expect(result).toEqual(updatedProduct);
    });

    it('should throw NotFoundException if product not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.update(1, updateProductDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ConflictException if SKU already exists for another product', async () => {
      const anotherProduct = { ...mockProduct, id: 2 };
      repository.findOne.mockResolvedValue(mockProduct);
      repository.findBySku.mockResolvedValue(anotherProduct);

      await expect(service.update(1, { sku: 'EXISTING_SKU' })).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw BadRequestException for invalid price', async () => {
      repository.findOne.mockResolvedValue(mockProduct);

      await expect(service.update(1, { price: -100 })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException for negative quantity', async () => {
      repository.findOne.mockResolvedValue(mockProduct);

      await expect(service.update(1, { quantity: -5 })).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      repository.findOne.mockResolvedValue(mockProduct);
      repository.remove.mockResolvedValue(true);

      await service.remove(1);

      expect(repository.findOne).toHaveBeenCalledWith(1);
      expect(repository.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if product not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if removal fails', async () => {
      repository.findOne.mockResolvedValue(mockProduct);
      repository.remove.mockResolvedValue(false);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
