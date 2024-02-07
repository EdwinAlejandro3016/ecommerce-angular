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

  categoryIdSelected = signal<string>("all");

  constructor(){
    effect(()=>{
      const categoryIdSelected = this.categoryIdSelected();
      if(categoryIdSelected){
        this.getProductsByCategory(categoryIdSelected);
      }
    },{allowSignalWrites:true})
  }

  getProducts(){
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProduct(id: number){
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getCategories(){
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getProductsByCategory(categoryId: string){
    //if category is all there's not necesatity to make the request
    if(categoryId === 'all'){
      this.productsByCategory.set(this.products());
      return;
    }
    this.http.get<Product[]>(`${this.apiUrl}/products/`,{params: {categoryId}})
    .subscribe({
      next: res=>{
        this.productsByCategory.set(res);
      },
      error: ()=>{

      }
    })
  }
}
