import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';
import {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from '../../models/product.model';
@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId: number | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      sku: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
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
          this.productForm.patchValue({
            name: product.name,
            sku: product.sku,
            price: product.price,
            quantity: product.quantity,
          });
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading product:', error);
          this.loading = false;
          this.router.navigate(['/products']);
        },
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.submitting = true;
      const formValue = this.productForm.value;

      if (this.isEditMode && this.productId) {
        const updateData: UpdateProductDto = formValue;
        this.productService
          .updateProduct(this.productId, {
            ...updateData,
            price: Number(updateData.price),
          })
          .subscribe({
            next: () => {
              this.submitting = false;
              this.notificationService.success('Product updated successfully!');
              this.router.navigate(['/products']);
            },
            error: (error) => {
              console.error('Error updating product:', error);
              this.notificationService.error(
                'Failed to update product',
                error.message
              );
              this.submitting = false;
            },
          });
      } else {
        const createData: CreateProductDto = formValue;
        this.productService.createProduct(createData).subscribe({
          next: () => {
            this.submitting = false;
            this.notificationService.success('Product created successfully!');
            this.router.navigate(['/products']);
          },
          error: (error) => {
            console.error('Error creating product:', error);
            this.notificationService.error(
              'Failed to create product',
              error.message
            );
            this.submitting = false;
          },
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  getFieldError(fieldName: string): string | null {
    const field = this.productForm.get(fieldName);
    if (field && field.invalid && (field.dirty || field.touched)) {
      if (field.errors?.['required']) {
        return `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`;
      }
      if (field.errors?.['minlength']) {
        return `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } must be at least ${
          field.errors['minlength'].requiredLength
        } characters`;
      }
      if (field.errors?.['min']) {
        return `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } must be greater than ${field.errors['min'].min}`;
      }
    }
    return null;
  }
}
