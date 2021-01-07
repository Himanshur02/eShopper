import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../admin-service.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items : any;
  totalPrice : any;

  constructor(private adminService: AdminServiceService,private userService : UserService, private toastr: ToastrService) { }

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
  ngOnInit(): void {
   this.showCartItems();
   this.totalPriceInCart();
  }

}
