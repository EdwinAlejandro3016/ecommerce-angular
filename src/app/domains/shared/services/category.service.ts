import { Injectable, effect, inject, signal } from '@angular/core';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private productService = inject(ProductService);

  apiUrl = `https://api.escuelajs.co/api/v1`;
  categoryIdSelected = signal<string>("all");
  

  constructor(){
    effect(()=>{
      const categoryIdSelected = this.categoryIdSelected();
      if(categoryIdSelected){
        this.productService.getProductsByCategory(categoryIdSelected);
      }
    },{allowSignalWrites:true})
  }

  getCategories(){
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
}
