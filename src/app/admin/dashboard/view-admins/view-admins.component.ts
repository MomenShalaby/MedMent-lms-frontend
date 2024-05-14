import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-admins',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-admins.component.html',
  styleUrl: './view-admins.component.css'
})
export class ViewAdminsComponent {
  admins : any ;
  constructor(private adminService: AdminService, private router : Router) { }

  ngOnInit() {
    this.adminService.getAdmins().subscribe(
      response => {
        this.admins = response.data;
        console.log(this.admins);
        
      }

    )
  }

  deleteAdmin(id : number, name : string){
    console.log(name);
    console.log(id);
    
    if (confirm(`Are you sure you want to delete "${name}" from admins?`)) {
      this.adminService.deleteAdmin(id).subscribe(
        (response) => {
          console.log(response);
          window.location.href ='admin/dashboard/view-admins';
        },
        (error) => {
          console.log(error);

        })
    }
  }
  editAdmin(id : number){
    this.router.navigate([`/admin/dashboard/edit-admin/${id}`])

  }
}
