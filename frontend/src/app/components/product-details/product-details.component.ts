import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import { Product } from '../../models/product.model';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmDialogImports, HlmDialogService } from '@spartan-ng/helm/dialog';

@Component({
  selector: 'app-product-details',
  imports: [
    CommonModule,
    RouterLink,
    HlmButtonImports,
    HlmCardImports,
    HlmDialogImports
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = false;
  productId: number | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: HlmDialogService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productId = +params['id'];
        this.loadProduct();
      }
    });
  }

  loadProduct(): void {
    if (this.productId) {
      this.loading = true;
      this.productService.getProduct(this.productId).subscribe({
        next: (product) => {
          this.product = product;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading product:', error);
          this.loading = false;
          this.router.navigate(['/products']);
        }
      });
    }
  }

  deleteProduct(): void {
    if (this.product && confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      this.productService.deleteProduct(this.product.id).subscribe({
        next: () => {
          this.notificationService.success('Product deleted successfully!');
          this.router.navigate(['/products']);
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.notificationService.error('Failed to delete product', error.message);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
