import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductQueryDto } from '../dto/product-query.dto';
import { ProductResponseDto } from '../dto/product-response.dto';
import { ProductsListResponseDto } from '../dto/products-list-response.dto';
import {
  ErrorResponseDto,
  ValidationErrorResponseDto,
} from '../dto/error-response.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed.',
    type: ValidationErrorResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - SKU already exists.',
    type: ErrorResponseDto,
  })
  async create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products with pagination and search' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search by product name',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'List of products retrieved successfully.',
    type: ProductsListResponseDto,
  })
  async findAll(@Query(ValidationPipe) query: ProductQueryDto) {
    return await this.productService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a product' })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Product details retrieved successfully.',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
    type: ErrorResponseDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    example: 1,
  })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Product data to update',
  })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed.',
    type: ValidationErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - SKU already exists.',
    type: ErrorResponseDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({
    name: 'id',
    description: 'Product ID',
    example: 1,
  })
  @ApiResponse({
    status: 204,
    description: 'The product has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found.',
    type: ErrorResponseDto,
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.productService.remove(id);
  }
}
