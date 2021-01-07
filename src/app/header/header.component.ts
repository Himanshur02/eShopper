import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchForm: FormGroup;
  submitted :boolean = false;
  notMatched : string;
  products : any;

  constructor(private formBuilder: FormBuilder ,private adminService : AdminServiceService,private toastr:ToastrService,private route : Router,private _router : ActivatedRoute ) { 
    this.searchForm = this.formBuilder.group({     
      searchKeywords: ['', [Validators.required]]
    });
  }

  searchProduct(){
    console.log("Searching Works");
    this.adminService.searchProduct(this.searchForm.value).subscribe(product => {
      console.log(product);
      this.submitted =true;
      console.log(product[0]);
      if(product[0]==undefined){
        this.notMatched = "No Product Found";
      }
      else {
        this.submitted =false;
        this.products = product;
      }  
    });
  }

  ngOnInit(): void {
  }

}
