import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder , private router: Router,private adminService :AdminServiceService, private toastr : ToastrService) { 

    this.loginForm = this.formBuilder.group({
     
      email: ['', [Validators.required, Validators.email]],
 
      password: ['', [Validators.required, Validators.minLength(8)]],
  
    },
  );
}
  get formError() { return this.loginForm.controls; }

  onLogin() {

    this.submitted = true;
  
    if (this.loginForm.invalid) {
      
        return  this.toastr.error('Incorrect Details','Error');;
        
    } else {

      this.adminService.loginAdmin(this.loginForm.value).subscribe(result=>{
        
        if(result['status']===401){

          this.toastr.error(result['message'],'Message');


        } else {
          
          var token= result['result'].token;

          localStorage.setItem('admin',token);

          localStorage.setItem('AdminFirstName',result['result'].firstName);
          
          localStorage.setItem('AdminLastName',result['result'].lastName);

          localStorage.setItem('AdminEmail',result['result'].email);

          localStorage.setItem('AdminPhone',result['result'].phone);
          
          this.toastr.success(result['message'],'Message');
            
        this.router.navigateByUrl('/adminDashboard/'+result['result'].id);
          
        }
      })
    }   
  }

  ngOnInit(): void {
  }

}
