import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    description: 'Product ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Product name',
    example: 'Laptop',
  })
  name: string;

  @ApiProperty({
    description: 'Product SKU (Stock Keeping Unit)',
    example: 'SKU123',
  })
  sku: string;

  @ApiProperty({
    description: 'Product price',
    example: 1000.0,
  })
  price: number;

  @ApiProperty({
    description: 'Product quantity in stock',
    example: 5,
  })
  quantity: number;

  @ApiProperty({
    description: 'Product creation timestamp',
    example: '2025-11-14T12:00:00.000Z',
  })
  createdAt: Date;
}
