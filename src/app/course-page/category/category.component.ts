import { Component, OnInit } from '@angular/core';
import { Category } from '../../core/models/category.model';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../core/services/categories/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }
  
  getCategories(){
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
