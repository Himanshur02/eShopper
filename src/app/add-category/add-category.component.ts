import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder , private router: Router,private _router: ActivatedRoute,private adminService :AdminServiceService, private toastr : ToastrService) { 

    this.categoryForm = this.formBuilder.group({
     
      categoryName: ['', [Validators.required]],
      description: ['', [Validators.required]]
      
  
    },
  );
}

get formError() { return this.categoryForm.controls; }

addCategory() {

  this.submitted = true;

  if (this.categoryForm.invalid) {
    
      return  this.toastr.error('Fill Details First','Error');;
      
  } else {

    this.adminService.addCategory(this.categoryForm.value).subscribe(result=>{

      this.toastr.success(result['message'],'Message');
          
      this.router.navigateByUrl('/category');
      
    })
  }   
}

  ngOnInit(): void {
  }

}
