import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../product.service';
import { FormControl } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TooltipPosition } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent {
  searchText = '';
  isLike: any[] = [];

  cart: any[] = [];
  cartCount = 0;
  filteredProducts: any[] = [];

  categoryList: any[] = [{ name: 'All', image: '' }];

  selectedCategoryIndex = 0;

  productList = [];

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private ngxLoader: NgxUiLoaderService,
    private toasterService: ToastrService
  ) {}

  ngOnInit() {
    this.ngxLoader.start();
    this.productService.getAllProducts().subscribe((res: any) => {
      this.ngxLoader.stop();
      this.toasterService.success('All Products Fetched');
      this.productList = res;
      this.filteredProducts = res;
      this.categoryList = [
        ...this.categoryList,
        ...Array.from(
          new Map(
            res.map((data: any) => [
              data.category.name,
              {
                id: data.category.id,
                name: data.category.name,
                image: data.category.image,
              },
            ])
          ).values()
        ),
      ];
    });

    this.loadLikedProducts();
    this.loadCart();
    this.filteredProducts = [...this.productList];
    this.updateCart();
  }

  isFilteredData = false;
  filterProduct() {
    if (this.searchText) {
      this.isFilteredData = true;
      this.filteredProducts = this.productList.filter((data: any) =>
        data.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.productList];
      this.isFilteredData = false;
    }
  }
  clearFilter() {
    if (this.isFilteredData) {
      this.isFilteredData = false;
      this.filteredProducts = [...this.productList];
      this.searchText = '';
    }
  }

  updateCart() {
    this.cartCount = 0;
    for (let i = 0; i < this.cart.length; i++) {
      this.cartCount += this.cart[i].quantity;
    }
  }

  toLike(product: any, event: Event) {
    event.stopPropagation();
    const index = this.isLike.findIndex((p: any) => p.id === product.id);
    if (index === -1) {
      this.isLike.push(product);
    } else {
      this.isLike.splice(index, 1);
    }
    localStorage.setItem('likedProducts', JSON.stringify(this.isLike));
  }

  isLiked(product: any): boolean {
    return this.isLike.some((p: any) => p.id === product.id);
  }

  loadLikedProducts() {
    const storedLikes = localStorage.getItem('likedProducts');
    if (storedLikes) {
      this.isLike = JSON.parse(storedLikes);
    }
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
    this.updateCart();
  }

  loadCart() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getProductQuantity(productId: number): number {
    const item = this.cart.find((p) => p.id === productId);
    return item ? item.quantity : 0;
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCart();
  }

  increaseQuantity(product: any, event?: Event) {
    event?.stopPropagation();
    const item = this.cart.find((p) => p.id === product.id);
    if (item) {
      item.quantity += 1;
    }
    this.saveCart();
    this.updateCart();
  }

  decreaseQuantity(product: any, event?: Event) {
    event?.stopPropagation();
    const itemIndex = this.cart.findIndex((p) => p.id === product.id);
    if (itemIndex !== -1) {
      if (this.cart[itemIndex].quantity > 1) {
        this.cart[itemIndex].quantity -= 1;
      } else {
        this.cart.splice(itemIndex, 1);
      }
    }
    this.saveCart();
    this.updateCart();
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
    this.updateCart();
    this.viewCart = false;
  }

  selectedMenu = 'All Products';

  toSelectCategory(index: any, name: any) {
    this.selectedMenu = name == 'All' ? 'All Products' : name;
    this.selectedCategoryIndex = index;
    this.filteredProducts = this.productList;
    if (name == 'All') {
      this.filteredProducts = this.productList;
    } else {
      this.filteredProducts = this.filteredProducts.filter(
        (res: any) => res.category.name == name
      );
    }
    this.filterPrice(this.appliedSorting);
  }
  sortControl = new FormControl(null);

  resetSort() {
    this.sortControl.reset();
    this.appliedSorting = '';
    this.filteredProducts = this.productList;
  }
  appliedSorting = '';
  filterPrice(event: any) {
    this.appliedSorting = event;
    if (event.value == 'LtH') {
      this.filteredProducts = [...this.filteredProducts].sort(
        (a: any, b: any) => a.price - b.price
      );
    } else if (event.value == 'HtL') {
      this.filteredProducts = [...this.filteredProducts].sort(
        (a: any, b: any) => b.price - a.price
      );
    }
  }

  likeFilter: boolean = false;
  toFilterLikedProducts() {
    this.likeFilter = !this.likeFilter;
    if (this.likeFilter) {
      this.filteredProducts = this.isLike;
    } else {
      this.filteredProducts = this.productList;
    }
  }

  toDetailPage(item: any) {
    this.dialog
      .open(ProductDetailComponent, {
        data: item,
      })
      .afterClosed()
      .subscribe((res: any) => {
        this.loadCart();
        this.updateCart();
      });
  }

  viewCart = false;
  toViewCart() {
    this.viewCart = !this.viewCart;
  }

  getTotalAmount(): number {
    return this.cart.reduce((total: number, item: any) => {
      return total + item.price * item.quantity;
    }, 0);
  }
}
