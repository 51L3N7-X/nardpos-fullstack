import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { Product, ProductQueryParams } from '../../models/product.model';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { BrnAlertDialogImports } from '@spartan-ng/brain/alert-dialog';
import { HlmAlertDialogImports } from '@spartan-ng/helm/alert-dialog';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    HlmTableImports,
    HlmButtonImports,
    HlmInputImports,
    HlmCardImports,
    BrnAlertDialogImports,
    HlmAlertDialogImports,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  searchTerm = '';
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  Math = Math;

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    const params: ProductQueryParams = {
      page: this.currentPage,
      limit: this.pageSize,
      search: this.searchTerm || undefined,
    };

    this.productService.getProducts(params).subscribe({
      next: (response) => {
        this.products = response.products;
        this.totalItems = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.notificationService.error(
          'Failed to load products',
          error.message
        );
        this.loading = false;
      },
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.notificationService.success('Product deleted successfully!');
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error deleting product:', error);
        this.notificationService.error(
          'Failed to delete product',
          error.message
        );
      },
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
