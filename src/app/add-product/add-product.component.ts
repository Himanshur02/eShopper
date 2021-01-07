import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder , private router: Router,private _router: ActivatedRoute,private adminService :AdminServiceService, private toastr : ToastrService) { 

    this.productForm = this.formBuilder.group({
     
      productName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      category: ['', [Validators.required]],
      image: [''],
      price: ['', [Validators.required]]    
    },
  );
}

get formError() { return this.productForm.controls; }

addPrduct() {

  this.submitted = true;

  if (this.productForm.invalid) {
    
      return  this.toastr.error('Fill Details First','Error');;
      
  } else {

    this.adminService.addProduct(this.productForm.value).subscribe(result=>{

      this.toastr.success(result['message'],'Message');
          
      this.router.navigateByUrl('/product');
      
    })
  }   
}

  ngOnInit(): void {
  }


}
