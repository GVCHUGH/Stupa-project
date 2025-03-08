import { Injectable } from '@angular/core';
import { ProductResponseData } from './model/product-response.model';
import { apiEndpoints } from '../../../../core/api-endpoints/api-endpoints';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts() {
    return this.httpClient.get<ProductResponseData>(apiEndpoints.allProducts);
  }

  getAllPaginateProducts(offset: number, limit: number) {
    return this.httpClient.get<ProductResponseData>(
      `${apiEndpoints.allProducts}?offset=${offset}&limit=${limit}`
    );
  }

  addProduct(data: any) {
    return this.httpClient.post<ProductResponseData>(
      apiEndpoints.addProduct,
      data
    );
  }
  updateProduct(data: any, id: any) {
    return this.httpClient.put<ProductResponseData>(
      apiEndpoints.addProduct + id,
      data
    );
  }

  deleteProduct(id: any) {
    return this.httpClient.delete<ProductResponseData>(
      apiEndpoints.addProduct + id
    );
  }
}
