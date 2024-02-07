import { Category, Product } from '@/shared/models/product.model';
import { ProductService } from '@/shared/services/product.service';
import { UpperCasePipe } from '@angular/common';
import { Component, OnInit, effect, inject, signal } from '@angular/core';

@Component({
  selector: 'app-select-categories',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './select-categories.component.html',
  styleUrl: './select-categories.component.css'
})
export class SelectCategoriesComponent implements OnInit{
  private productService = inject(ProductService);
  categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.productService.getCategories()
    .subscribe({
      next: res=>{
        this.categories.set(res);
      },
      error: ()=>{

      }
    })
  }

  optionChanged(e: Event){
    const input = e.target as HTMLInputElement;
    const id = input.value;
    this.productService.categoryIdSelected.set(id);
  }
}
