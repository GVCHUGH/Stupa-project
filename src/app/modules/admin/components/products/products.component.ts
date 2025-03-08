import { Component } from '@angular/core';
import { ProductService } from '../../../customer/components/product/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { ReadDescriptionComponent } from './read-description/read-description.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productList: any[] = [];
  totalProducts: any;

  paginationData: any;

  isLoading = false;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllProducts(1, 10);
  }
  getAllProducts(offset: any, limit: any) {
    this.isLoading = true;
    this.productService
      .getAllPaginateProducts(offset, limit)
      .subscribe((res: any) => {
        this.isLoading = false;
        this.productList = res;
      });
    this.productService.getAllProducts().subscribe((res: any) => {
      this.totalProducts = res.length;
    });
  }

  toAdd() {
    this.dialog
      .open(AddProductComponent)
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.getAllProducts(1, 10);
        }
      });
  }
  toUpdate(data: any) {
    this.dialog
      .open(AddProductComponent, {
        data: data,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.getAllProducts(1, 10);
        }
      });
  }

  toDelete(data: any) {
    this.dialog
      .open(DeleteConfirmationComponent, {
        data: data.title,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.productService.deleteProduct(data.id).subscribe((res: any) => {
            if (res) {
              this.getAllProducts(1, 10);
            }
          });
        }
      });
  }

  onPageChange(page: any) {
    this.getAllProducts(page.page, page.pageSize);
  }

  onPageSizeChange(size: number) {
    this.getAllProducts(1, size);
  }

  readMore(data: any) {
    this.dialog
      .open(ReadDescriptionComponent, {
        data: data.description,
      })
      .afterClosed()
      .subscribe((res: any) => {});
  }
}
