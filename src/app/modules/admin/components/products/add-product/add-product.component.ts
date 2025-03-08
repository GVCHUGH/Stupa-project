import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../../customer/components/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  productForm: FormGroup;

  isEdit = false;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      categoryId: ['', Validators.required],
      images: this.fb.array([], [Validators.required]),
    });
    if (data) {
      this.isEdit = true;
      this.productForm.patchValue({
        title: data.title,
        price: data.price,
        description: data.description,
        categoryId: data.category.id,
        images: data.images.forEach((ele: any) => {
          this.images.push(new FormControl(ele));
        }),
      });
    } else {
      this.isEdit = false;
    }
    dialogRef.disableClose = true;

    if (!this.isEdit) {
      this.toAddImage();
    }
  }

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  onSubmit() {
    if (this.isEdit) {
      const title = this.productForm.value.title;
      const price = this.productForm.value.price;
      const id = this.data.id;
      this.productService
        .updateProduct({ title: title, price: price }, id)
        .subscribe((res: any) => {
          this.dialogRef.close(true);
        });
    } else {
      this.productService
        .addProduct(this.productForm.value)
        .subscribe((res: any) => {
          this.dialogRef.close(true);
        });
    }
  }

  toAddImage() {
    this.images.push(this.fb.control(null, Validators.required));
  }

  toRemoveImage(index: number) {
    this.images.removeAt(index);
  }

  onFileChange(event: any, index: any): void {
    const file = event.target.files[0];
    this.images.at(index).setValue(file);
  }

  toClose() {
    this.dialogRef.close();
  }
}
