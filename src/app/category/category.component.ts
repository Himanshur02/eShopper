import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  searchForm: FormGroup;
  submitted :boolean = false;
  notMatched : string;

  categories : any;

  constructor(private formBuilder: FormBuilder ,private adminService : AdminServiceService,private toastr:ToastrService,private route : Router,private _router : ActivatedRoute ) { 
    this.searchForm = this.formBuilder.group({     
      searchKeywords: ['', [Validators.required]]
    },
  );
  }
  searchCategory(){
    console.log("Searching Works");
    this.adminService.searchCategory(this.searchForm.value).subscribe(category => {
      this.submitted =true;
      console.log(category[0]);
      if(category[0]==undefined){
        this.notMatched = "No Results Found";
      }
      else {
        this.submitted =false;
        this.categories = category;
      }  
    });
  }

  showCategories(){
    this.adminService.getAllCategories(this._router.snapshot.params.id).subscribe(category => {
      this.categories = category;
    });
  }

  deleteCategory(categoryId:any){
    this.adminService.deleteCategory(categoryId).subscribe(result =>{
      this.toastr.success("Category Deleted",'Message'); 
      window.location.reload();
    })   
  } 

  updateCategory(categoryId:any) {
    this.route.navigateByUrl('/editCategory/'+categoryId);
  }

  ngOnInit(): void {
    this.showCategories();
  }

}
