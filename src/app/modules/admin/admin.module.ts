import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { DeleteConfirmationComponent } from './components/products/delete-confirmation/delete-confirmation.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReadDescriptionComponent } from './components/products/read-description/read-description.component';

@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
    DeleteConfirmationComponent,
    ReadDescriptionComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
})
export class AdminModule {}
