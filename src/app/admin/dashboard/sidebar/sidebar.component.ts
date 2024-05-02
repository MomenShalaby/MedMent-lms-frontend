import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarCollapsed: boolean = false;

  constructor() { }

  toggleSidebar(): void {
    console.log('gggg');
    
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
