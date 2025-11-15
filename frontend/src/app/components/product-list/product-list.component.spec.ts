import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { ProductsResponseApi } from '../../types/api.types';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  const mockProductListResponse: ProductsResponseApi = {
    products: [
      { id: 1, name: 'Test Product 1', sku: 'TEST001', price: 10.99, quantity: 5, createdAt: '2023-01-01T00:00:00Z' },
      { id: 2, name: 'Test Product 2', sku: 'TEST002', price: 15.99, quantity: 3, createdAt: '2023-01-02T00:00:00Z' }
    ],
    total: 2,
    page: 1,
    limit: 10
  };

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    productService.getProducts.and.returnValue(of(mockProductListResponse));

    component.ngOnInit();

    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProductListResponse.products);
    expect(component.totalItems).toBe(2);
    expect(component.loading).toBeFalse();
  });

  it('should handle error when loading products', () => {
    const errorMessage = 'Failed to load products';
    productService.getProducts.and.returnValue(throwError(() => new Error(errorMessage)));

    component.ngOnInit();

    expect(productService.getProducts).toHaveBeenCalled();
    expect(notificationService.error).toHaveBeenCalledWith('Failed to load products', errorMessage);
    expect(component.loading).toBeFalse();
  });

  it('should search products', () => {
    productService.getProducts.and.returnValue(of(mockProductListResponse));
    component.searchTerm = 'test';

    component.onSearch();

    expect(component.currentPage).toBe(1);
    expect(productService.getProducts).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      search: 'test'
    });
  });

  it('should delete product successfully', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    productService.deleteProduct.and.returnValue(of(undefined));
    productService.getProducts.and.returnValue(of(mockProductListResponse));

    component.deleteProduct(1);

    expect(productService.deleteProduct).toHaveBeenCalledWith(1);
    expect(notificationService.success).toHaveBeenCalledWith('Product deleted successfully!');
    expect(productService.getProducts).toHaveBeenCalled();
  });

  it('should handle delete product error', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const errorMessage = 'Failed to delete';
    productService.deleteProduct.and.returnValue(throwError(() => new Error(errorMessage)));

    component.deleteProduct(1);

    expect(productService.deleteProduct).toHaveBeenCalledWith(1);
    expect(notificationService.error).toHaveBeenCalledWith('Failed to delete product', errorMessage);
  });

  it('should not delete product when user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.deleteProduct(1);

    expect(productService.deleteProduct).not.toHaveBeenCalled();
  });

  it('should calculate total pages correctly', () => {
    component.totalItems = 25;
    component.pageSize = 10;

    expect(component.totalPages).toBe(3);
  });

  it('should change page', () => {
    productService.getProducts.and.returnValue(of(mockProductListResponse));

    component.onPageChange(2);

    expect(component.currentPage).toBe(2);
    expect(productService.getProducts).toHaveBeenCalledWith({
      page: 2,
      limit: 10,
      search: undefined
    });
  });
});
