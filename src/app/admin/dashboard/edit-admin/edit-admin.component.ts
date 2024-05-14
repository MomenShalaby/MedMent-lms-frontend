import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.css'
})
export class EditAdminComponent {
  permissionsArr?: string[];
  editAdminForm: FormGroup = new FormGroup({});
  errorMessage? : string[];
  adminId : number = this.activatedRoute.snapshot.params['id'];
  adminData : any;


  constructor(private adminService: AdminService, private router : Router, private activatedRoute : ActivatedRoute) {
    this.editAdminForm = new FormGroup({
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
        console.log(this.permissionsArr);
        
        this.editAdminForm.controls['permissions'].setValue(this.permissionsArr)
      },
      (error) => {
        console.log(error);
      }
    );    
    this.adminService.getAdminById(this.adminId).subscribe(
      response =>{
        this.adminData = response.data.admin
        console.log(this.adminData);
        this.editAdminForm.controls['fname'].setValue(this.adminData.fname)
        this.editAdminForm.controls['lname'].setValue(this.adminData.lname)
        this.editAdminForm.controls['email'].setValue(this.adminData.email)
      }
    )
  }

  editAdmin() {
    console.log(this.permissionsArr);
console.log(this.editAdminForm.value);

    if (!this.editAdminForm.valid) {
      this.editAdminForm.markAllAsTouched();
      return
    }
     this.adminService.editAdmin(this.adminId,this.editAdminForm.value).subscribe(
      
        (res) => {
          console.log(res)
          this.router.navigate(['/admin/dashboard/view-admins'])
        } , 
        (error) =>{
        console.log(error);
        }
      );
  }
}
