import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from './product-response.dto';

export class ProductsListResponseDto {
  @ApiProperty({
    description: 'Array of products',
    type: [ProductResponseDto],
  })
  products: ProductResponseDto[];

  @ApiProperty({
    description: 'Total number of products',
    example: 25,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  limit: number;
}
