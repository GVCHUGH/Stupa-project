import { environment } from '../../../environments/environment';

const baseUrl = environment.API_URL;
export const apiEndpoints = {
  login: `${baseUrl}/auth/login`,
  allProducts: `${baseUrl}/products`,
  addProduct: `${baseUrl}/products/`,
};
