import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Error message',
    example: 'Product with ID 999 not found',
  })
  message: string;

  @ApiProperty({
    description: 'Error type',
    example: 'Not Found',
  })
  error: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 404,
  })
  statusCode: number;
}

export class ValidationErrorResponseDto {
  @ApiProperty({
    description: 'Array of validation error messages',
    example: ['name should not be empty', 'price must be a positive number'],
    type: [String],
  })
  message: string[];

  @ApiProperty({
    description: 'Error type',
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: number;
}
