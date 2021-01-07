import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder , private router: Router,private _router : ActivatedRoute, private adminService :AdminServiceService, private toastr : ToastrService) { 

    this.categoryForm = this.formBuilder.group({
     
      categoryName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
  
    },
  );
}

get formError() { return this.categoryForm.controls; }

updateCategory() {

  this.submitted = true;

  if (this.categoryForm.invalid) {
    
      return  this.toastr.error('Fill Details First','Error');
      
  } else {

      this.adminService.updateCategory(this._router.snapshot.params.id,this.categoryForm.value).subscribe(result=>{
        console.log(result);
        this.toastr.success('Category Updated','Success');
        this.router.navigateByUrl('/category');
      })
  
  
  }   
}

  ngOnInit(): void {
    this.adminService.getCategoryById(this._router.snapshot.params.id).subscribe(result=>{
      this.categoryForm = this.formBuilder.group({  
        categoryName: result['categoryName'],
        description: result['description'],
        status: result['description'],
      },
    );
    })
  }


}
