import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editProductForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder , private router: Router,private _router: ActivatedRoute,private adminService :AdminServiceService, private toastr : ToastrService) { 

    this.editProductForm = this.formBuilder.group({
     
      productName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      category: ['', [Validators.required]],
      // image: [''],
      price: ['', [Validators.required]]    
    },
  );
}

get formError() { return this.editProductForm.controls; }

editProduct() {

  this.submitted = true;

  if (this.editProductForm.invalid) {
    
    return  this.toastr.error('Fill Details','Error');
      
  } else {
    this.adminService.updateProduct(this._router.snapshot.params.id,this.editProductForm.value).subscribe(result=>{
      this.toastr.success("Product Updated Successfully",'Success');
      this.router.navigateByUrl('/product');
    })
  }   
}

  ngOnInit(): void {
    this.adminService.getProductById(this._router.snapshot.params.id).subscribe(result=>{
      console.log(result);
      this.editProductForm = this.formBuilder.group({  
        productName: result['productName'],
        description: result['description'],
        quantity: result['quantity'],
        category: result['category'],
        // image: result['image'],
        price: result['price']
      },
    );
  })
}
}
