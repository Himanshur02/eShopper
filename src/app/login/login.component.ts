import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  imageUrl = "../assets/buyer.jpg";

  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;

  form: FormGroup;

  imageData: String;

  users : any;
  admin:any;
  
  selectFile:File;
  file : File;
  userId : any;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private toastr : ToastrService) { 

    this.loginForm = this.formBuilder.group({

    email: ['', [Validators.required, Validators.email]],
 
    password: ['', [Validators.required, Validators.minLength(8)]],
    
    },

    this.registerForm = this.formBuilder.group({
     
      firstName: ['', Validators.required , Validators.minLength(3)],
  
      lastName: ['', Validators.required , Validators.maxLength(3)],
     
      email: ['', [Validators.required, Validators.email]],
  
      password: ['', [Validators.required, Validators.minLength(8)]],
  
      role: ['', Validators.required , Validators.minLength(3)],
  
      phone: ['', Validators.required , Validators.minLength(3)],
  
      address: ['', Validators.required , Validators.minLength(3)],
      
      city: ['', Validators.required , Validators.minLength(3)],

      image: ['', Validators.required],
      
      state: ['', Validators.required , Validators.minLength(3)],
      
      country: ['', Validators.required , Validators.minLength(3)],
  
      zip: ['', Validators.required , Validators.minLength(3)],
    })
  );
}

  get f() { return this.loginForm.controls; }

  onLogin() {
    this.submitted = true;
  
    if (this.loginForm.invalid) {
      
        return  this.toastr.error('Invalid User','Error');
        
    } else {

      this.userService.loginUser(this.loginForm.value).subscribe(result=>{

        console.log(result);
        
        if(result['status']===401){

          this.toastr.error(result['message'],'Message');

        } else {
          
          var token= result['result'].token;

          localStorage.setItem('token',token);

          localStorage.setItem('firstName',result['result'].firstName);
          
          localStorage.setItem('lastName',result['result'].lastName);

          localStorage.setItem('email',result['result'].email);

          var userId= result['result'].id
          
          this.toastr.success(result['message'],'Message');
                 
        this.router.navigateByUrl('/userDashboard/'+userId);
          
        }      
      })
    }
  }

  addUser(){

    this.submitted = true;
  
    if (this.registerForm.invalid) {
        return  this.toastr.error('Fill Form First','Error');
    }
    
      this.userService.registerUser(this.registerForm.value).subscribe(result => {
      this.toastr.success(result['message'],'Message'); 
      window.location.reload();
    }); 
    const profileData = new FormData();
    profileData.append("name",this.selectFile.name);
    profileData.append("image",this.form.value.image);
    this.userService.uploadImage(profileData);
    this.toastr.success("File Uploaded Successfullly",'Message');
    this.form.reset();
    this.imageData =null;
  }

  onFileSelect(event){
    this.selectFile = <File>event.target.files[0];
    var file = (event.target as HTMLInputElement).files[0];
    console.log(file.name);
    this.form.patchValue({ image:file });
    const allowedMimeTypes = ["image/png","image/jpeg","image/jpg"];
   if(file && allowedMimeTypes.includes(file.type)) {
     const reader = new FileReader();
     reader.onload = () =>{
       this.imageData = reader.result as String;
     }
     reader.readAsDataURL(file);
   } 
   this.changeImage(event);
  }

  changeImage(event:any){
    this.selectFile = <File>event.target.files[0];
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any) =>{
      this.imageUrl = event.target.result;
      }      
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });
  }

}
