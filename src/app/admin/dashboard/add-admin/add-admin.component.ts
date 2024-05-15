import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css',
})
export class AddAdminComponent {
  permissionsArr?: string[];
  addAdminForm: FormGroup = new FormGroup({});
  errorMessage? : string[];

  constructor(private adminService: AdminService, private router : Router) {
    this.addAdminForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      permissions: new FormControl('',[Validators.required])
    });
  }

  ngOnInit() {
    this.adminService.getPermissions().subscribe(
      (response) => {
        this.permissionsArr = response.data.map( (item: { name: string }) => item.name);        
        this.addAdminForm.controls['permissions'].setValue(this.permissionsArr)
      },
      (error) => {
        console.log(error);
      }
    );    
  }

  addAdmin() {
    if (!this.addAdminForm.valid) {
      this.addAdminForm.markAllAsTouched();
      return
    }
     this.adminService.addAdmin(this.addAdminForm.value).subscribe(
      
        (res) => {
          this.router.navigate(['/admin/dashboard/view-admins'])
        } , 
        (error) =>{
        console.log(error);
        }
      );
  }
}
