
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminServiceService } from './admin-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private authService : AdminServiceService,private router : Router) { }

  canActivate() : boolean {
    if(this.authService.authAdmin()) {
      return true
    } else {
      this.router.navigate(['/adminLogin'])
      return false
    }
  } 
}
