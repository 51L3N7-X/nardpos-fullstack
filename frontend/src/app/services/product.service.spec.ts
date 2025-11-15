import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product, CreateProductDto, UpdateProductDto, ProductListResponse } from '../models/product.model';
import { ProductsResponseApi } from '../types/api.types';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:3000/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should fetch products with default parameters', () => {
      const mockResponse: ProductsResponseApi = {
        products: [
          { id: 1, name: 'Test Product', sku: 'TEST001', price: 10.99, quantity: 5, createdAt: '2023-01-01T00:00:00Z' }
        ],
        total: 1,
        page: 1,
        limit: 10
      };

      service.getProducts().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should fetch products with search parameters', () => {
      const mockResponse: ProductsResponseApi = {
        products: [],
        total: 0,
        page: 1,
        limit: 10
      };

      const params = { page: 1, limit: 5, search: 'laptop' };
      service.getProducts(params).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${baseUrl}?page=1&limit=5&search=laptop`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getProduct', () => {
    it('should fetch a single product by id', () => {
      const mockProduct: Product = {
        id: 1,
        name: 'Test Product',
        sku: 'TEST001',
        price: 10.99,
        quantity: 5,
        createdAt: '2023-01-01T00:00:00Z'
      };

      service.getProduct(1).subscribe(product => {
        expect(product).toEqual(mockProduct);
      });

      const req = httpMock.expectOne(`${baseUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProduct);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', () => {
      const createDto: CreateProductDto = {
        name: 'New Product',
        sku: 'NEW001',
        price: 15.99,
        quantity: 10
      };

      const mockProduct: Product = {
        id: 2,
        ...createDto,
        createdAt: '2023-01-01T00:00:00Z'
      };

      service.createProduct(createDto).subscribe(product => {
        expect(product).toEqual(mockProduct);
      });

      const req = httpMock.expectOne(baseUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(createDto);
      req.flush(mockProduct);
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product', () => {
      const updateDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 20.99
      };

      const mockProduct: Product = {
        id: 1,
        name: 'Updated Product',
        sku: 'TEST001',
        price: 20.99,
        quantity: 5,
        createdAt: '2023-01-01T00:00:00Z'
      };

      service.updateProduct(1, updateDto).subscribe(product => {
        expect(product).toEqual(mockProduct);
      });

      const req = httpMock.expectOne(`${baseUrl}/1`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(updateDto);
      req.flush(mockProduct);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', () => {
      service.deleteProduct(1).subscribe(response => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(`${baseUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
