import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/product/all-products/all-products.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AllProductsComponent, ProductDetailComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, FormsModule],
})
export class CustomerModule {}
