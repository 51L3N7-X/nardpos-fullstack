export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  createdAt: string;
}

export interface CreateProductDto {
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

export interface UpdateProductDto {
  name?: string;
  sku?: string;
  price?: number;
  quantity?: number;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ProductListResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}
