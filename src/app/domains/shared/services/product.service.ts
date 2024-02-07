import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { Category, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  apiUrl = `https://api.escuelajs.co/api/v1`;

  products = signal<Product[]>([]);
  productsByCategory = signal<Product[]>([]);

  getProducts(category_id?:string){
    const url = new URL(`${this.apiUrl}/products`);
    if(category_id){
      url.searchParams.set('categoryId',category_id);
    }
    return this.http.get<Product[]>(url.toString());
  }

  getProduct(id: number){
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getProductsByCategory(categoryId: string){
    if(categoryId === 'all'){
      this.productsByCategory.set(this.products());
      return;
    }
    this.getProducts(categoryId)
    .subscribe({
      next: res=> {
        this.productsByCategory.set(res);
      }
    })
  }
}
