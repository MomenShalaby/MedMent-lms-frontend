import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-view-admins',
  standalone: true,
  imports: [],
  templateUrl: './view-admins.component.html',
  styleUrl: './view-admins.component.css'
})
export class ViewAdminsComponent {
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAdmins().subscribe(
      response => console.log(response)

    )
  }
}
