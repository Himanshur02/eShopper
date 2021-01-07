import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  Imageurl = "../assets/picssc.jpg";

  constructor(private router: ActivatedRoute,private route : Router,private toastr :ToastrService) { }
  
  Logout(){

    localStorage.removeItem('admin');
    localStorage.removeItem('AdminFirstName');
    localStorage.removeItem('AdminLastName');
    localStorage.removeItem('AdminEmail');
    localStorage.removeItem('AdminPhone');
    

    this.toastr.success("Logout Successfully",'Message');
    this.route.navigateByUrl('/adminLogin');

  }

get firstname(): any {
    return localStorage.getItem('AdminFirstName');
}

get lastname(): any {
  return localStorage.getItem('AdminLastName');
}

get email(): any {
  return localStorage.getItem('AdminEmail');
}

get phone(): any {
  return localStorage.getItem('AdminPhone');
}

  ngOnInit(): void {
  }

}
