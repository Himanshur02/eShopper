import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  products : any;
  productName : any;

  constructor(private adminService: AdminServiceService, private router: Router, private _router : ActivatedRoute,private toastr:ToastrService) { }

  addToCart(productId:any){
    this.adminService.addToCart(productId).subscribe((result)=>{
      var cartId = result['result'].id
      this.toastr.success(result['message'],'Success');
      this.router.navigateByUrl('/cart/'+cartId);
    })
    
  }

  ngOnInit(): void {
    this.adminService.getProductById(this._router.snapshot.params.id).subscribe(product => {
      this.productName = product['productName'];
      this.products = product;
    });
    
  }

}
