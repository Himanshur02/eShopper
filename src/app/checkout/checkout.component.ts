import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  items : any;
  totalPrice : any;

  constructor(private adminService: AdminServiceService,private userService : UserService,private router : Router, private toastr: ToastrService) { }

  deleteItem(itemId:any){
    this.adminService.deleteCartItem(itemId).subscribe(result =>{
      this.toastr.success("Item Deleted Successfully",'Success');     
      window.location.reload();
    })   
  } 
  showCartItems(){
    this.adminService.showCartItems().subscribe((item)=>{
      this.items = item;
    });
  }
  
  totalPriceInCart(){
    this.userService.totalPriceInCart().subscribe((price)=>{
      this.totalPrice = price[0].Totalprice;
    })
  }

  // Get user email from localStorage
  userEmail = localStorage.getItem('email');
  
  
  // Send Mail To the User
  confirmOrderMail(){
    this.adminService.confirmOrderMail(this.userEmail).subscribe((result)=>{
      this.toastr.success(result['message'],"Success");
      this.router.navigateByUrl('/thankyou');
    });
  }

  ngOnInit(): void {
   this.showCartItems();
   this.totalPriceInCart();
  }
}
