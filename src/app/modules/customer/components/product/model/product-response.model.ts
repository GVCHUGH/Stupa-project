export interface ProductResponseData {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryResponseData;
  images: string[];
}

export interface CategoryResponseData {
  id: number;
  name: string;
  image: string;
}
