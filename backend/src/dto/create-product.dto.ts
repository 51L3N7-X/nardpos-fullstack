import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Laptop',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Product SKU (Stock Keeping Unit)',
    example: 'SKU123',
  })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({
    description: 'Product price',
    example: 1000.0,
    minimum: 0.01,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'Product quantity in stock',
    example: 5,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(0, { message: 'Quantity cannot be negative' })
  quantity?: number;
}
