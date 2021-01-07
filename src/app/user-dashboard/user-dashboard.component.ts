import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl} from '@angular/forms';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  form: FormGroup;
  imageData: String;

  user : any ;
  selectFile:File = null;
  userId : any;
  
  
  constructor( private http : HttpClient ,private profileService : UserService,private fb : FormBuilder,private router: ActivatedRoute,private route : Router,private toastr :ToastrService) {
   }

   Imageurl = "../assets/picssc.jpg";



  onFileSelect(event){
   
    this.selectFile = <File>event.target.files[0];
    console.log(this.selectFile.name);
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image:file });
    const allowedMimeTypes = ["image/png","image/jpeg","image/jpg"];
   if(file && allowedMimeTypes.includes(file.type)) {
     
     const reader = new FileReader();
     reader.onload = () =>{
       this.imageData = reader.result as String;
     }
     reader.readAsDataURL(file);
   } 
  }

  changeImage(event:any){
    this.selectFile = <File>event.target.files[0];
    // console.log(this.selectFile.name);
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // this.selectFile = <File>event.target.files[0];
      // console.log(this.selectFile.name);
      reader.onload = (event:any) =>{
      this.Imageurl = event.target.result;
      }      
    }
  }

  onSubmit(){
  // this.profileService.addProfile(this.selectFile.name,this.form.value.image);
  //  this.form.reset();
  //  this.imageData =null;
  }
  
  changePass(){
    var userId = this.router.snapshot.params.id;
    this.route.navigateByUrl('edit/'+ userId);
  }
  
  // onProfileUpload(event :any){
  //   if(event.target.files.length>0){
  //     const filename = this.selectFile.name;
  //     this.profilePic.get("profile").setValue(filename);

  //   }

  // }

  
get firstName(): any {
    return localStorage.getItem('firstName');
}

get lastName(): any {
  return localStorage.getItem('lastName');
}

get email(): any {
  return localStorage.getItem('email');
}


  Logout(){

    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');

    this.toastr.success("Logout Successfully",'Message');
    this.route.navigateByUrl('/login');

  }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });

    // this.profilePic = this.fb.group({
    //   profile : ['']
    // });
  
  }

}
