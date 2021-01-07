import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthAdminGuard } from './auth-admin.guard';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path : "" , redirectTo:"/home",pathMatch: "full" },
  { path : "home" , component : HomepageComponent},
  { path : "login" , component : LoginComponent},
  { path : "adminLogin" , component : AdminLoginComponent},
  { path : "cart" , component : CartComponent},
  { path : "cart/:id" , component : CartComponent},
  { path : "checkout" , component : CheckoutComponent},
  { path : "adminDashboard" , component : AdminDashboardComponent, canActivate : [AuthAdminGuard]},
  { path : "adminDashboard/:id" , component : AdminDashboardComponent, canActivate : [AuthAdminGuard]},
  { path : "userDashboard" , component : UserDashboardComponent },
  { path : "userDashboard/:id" , component : UserDashboardComponent },
  { path : "addCategory" , component : AddCategoryComponent },
  { path : "category" , component : CategoryComponent },
  { path : "category/:id" , component : CategoryComponent },
  { path : "editCategory/:id" , component : UpdateCategoryComponent },
  { path : "addProduct" , component : AddProductComponent },
  { path : "product" , component : ProductComponent },
  { path : "product/:categoryName/:id" , component : ProductComponent },
  { path : "productDetails/:id" , component : ProductDetailsComponent },
  { path : "product/:id" , component : ProductComponent },
  { path : "updateProduct/:id" , component : EditProductComponent },
  { path : "contact" , component : ContactComponent},
  { path : "thankyou" , component : ThankYouComponent},
  { path : "**" , component : ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
