import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products : any;
  categories : any;
  productCounts : any;

  searchForm: FormGroup;
  submitted :boolean = false;
  notMatched : string;

  constructor(private formBuilder: FormBuilder,private adminService: AdminServiceService, private router: Router,private _router : ActivatedRoute,private toastr:ToastrService ) {
    this.searchForm = this.formBuilder.group({     
      searchKeywords: ['', [Validators.required]]
    });
   }

  showProducts(){
    this.adminService.showAllProducts(this._router.snapshot.params.id).subscribe(product => {
      this.products = product;
    });
  }
  showProductsByCategory(categoryName : any ){
    this.adminService.showProductsByCategory(categoryName,this._router.snapshot.params.id).subscribe(product => {
      this.router.navigateByUrl('/product/'+categoryName+'/'+this._router.snapshot.params.id);
      this.products = product;
    });   
  }

  showCategories(){
    this.adminService.getAllCategories(this._router.snapshot.params.id).subscribe(category => { 
      category.forEach((categoryName )=>{
        this.adminService.showProductCount(categoryName['categoryName']).subscribe(productCount => {  
          console.log(productCount['count']);
          this.productCounts = productCount;
        });
      }) 
      this.categories = category;
    });
  }

  showProductCount(categoryName){
    this.adminService.showProductCount("Men").subscribe(productCount => {  
      this.productCounts = productCount;
    });
  }
  
  deleteProduct(categoryId:any){
    this.adminService.deleteProduct(categoryId).subscribe(result =>{
      this.toastr.success("Product Deleted Successfully",'Success');
    })   
  } 

  searchProduct(){
    this.adminService.searchProduct(this.searchForm.value).subscribe(product => {
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
    this.showProducts();
    this.showCategories();
  }

}
