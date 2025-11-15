import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, CreateProductDto, UpdateProductDto, ProductQueryParams, ProductListResponse } from '../models/product.model';
import { ProductsResponseApi } from '../types/api.types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(params?: ProductQueryParams): Observable<ProductsResponseApi> {
    let httpParams = new HttpParams();
    
    if (params?.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }
    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }
    if (params?.search) {
      httpParams = httpParams.set('search', params.search);
    }

    return this.http.get<ProductsResponseApi>(this.baseUrl, { params: httpParams });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  updateProduct(id: number, product: UpdateProductDto): Observable<Product> {
    return this.http.patch<Product>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
