import { Product } from "../models/product.model";

export interface ProductsResponseApi extends PaginatedResponseApi {
    products: Product[];
}

export interface PaginatedResponseApi {
  limit: number;
  total: number;
  page: number;
}
