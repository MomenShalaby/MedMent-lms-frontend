import { Component, OnInit } from '@angular/core';
import { Category } from './category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  categories: Category[] = [];
  dummyCategories: Category[] = [
    {
      id: 1,
      name: "Anatomy",
      icon: "assets/img/categories/anantomy.png",
      coursesCount: 20
    },
    {
      id: 2,
      name: "Pathology",
      icon: "assets/img/categories/anantomy.png",
      coursesCount: 25
    },
    {
      id: 3,
      name: "Physiology",
      icon: "assets/img/categories/anantomy.png",
      coursesCount: 22
    },
    {
      id: 4,
      name: "Medical Genetics",
      icon: "assets/img/categories/anantomy.png",
      coursesCount: 15
    },
    {
      id: 5,
      name: "Epidemiology",
      icon: "assets/img/categories/anantomy.png",
      coursesCount: 14
    },
    {
      id: 6,
      name: "Histology",
      icon: "assets/img/categories/anantomy.png",
      coursesCount: 13
    },
  ];
  constructor(){}
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    //To Do: call category service to get categories with most cources
    this.categories = this.dummyCategories; //will be removed
  }
}
