import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  selectedImage = 0;
  cart: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductDetailComponent>
  ) {
    this.loadCart();
    dialogRef.disableClose = true;
  }

  toChangeImage(index: any) {
    this.selectedImage = index;
  }

  loadCart() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
  }
  getProductQuantity(productId: number): number {
    const item = this.cart.find((p) => p.id === productId);
    return item ? item.quantity : 0;
  }

  addToCart(product: any, event: Event) {
    event.stopPropagation();
    const item = this.cart.find((p) => p.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  increaseQuantity(product: any, event: Event) {
    event.stopPropagation();
    const item = this.cart.find((p) => p.id === product.id);
    if (item) {
      item.quantity += 1;
    }
    this.saveCart();
  }

  decreaseQuantity(product: any, event: Event) {
    event.stopPropagation();
    const itemIndex = this.cart.findIndex((p) => p.id === product.id);
    if (itemIndex !== -1) {
      if (this.cart[itemIndex].quantity > 1) {
        this.cart[itemIndex].quantity -= 1;
      } else {
        this.cart.splice(itemIndex, 1);
      }
    }
    this.saveCart();
  }

  onClose() {
    this.dialogRef.close();
  }
}
