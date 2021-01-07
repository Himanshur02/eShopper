import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions  = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Url = "http://localhost:3000/api/user";


  constructor( private http : HttpClient) { }

  registerUser(user : any ):Observable<any[]>{
    return this.http.post<any[]>(this.Url+'/register',user,httpOptions );
  }

  loginUser(user : any ):Observable<any[]>{
    return this.http.post<any[]>(this.Url+'/login',user,httpOptions );
  }

  forgetPassword(id,password : any ):Observable<any[]>{
    return this.http.put<any[]>(this.Url+'/forgetPassword/'+id,password,httpOptions );
  }

  changePassword(id,password : any ):Observable<any[]>{
    return this.http.put<any[]>(this.Url+'/changePassword/'+id,password,httpOptions );
  }

  getUserId(email:any):Observable<any[]>{
    return this.http.post<any[]>(this.Url+'/search',email,httpOptions );
  }

  getUserDetailsById(userId:number):Observable<any[]>{
    return this.http.get<any[]>(this.Url+'/user/'+userId);
  }

  getAllUsers():Observable<any[]>{
    return this.http.get<any[]>(this.Url+'/users');
  }

  updateUser(id,data : any ):Observable<any[]>{
    return this.http.put<any[]>(this.Url+'/update/'+id,data,httpOptions );
  }

  deleteUser(userId:any):Observable<any[]>{
    return this.http.delete<any[]>(this.Url+'/delete/'+userId,httpOptions );
  }

  
  totalPriceInCart():Observable<any[]>{
    return this.http.get<any[]>(this.Url+'/total/cartItems',httpOptions);
  }

  authUser() {
    return !!localStorage.getItem('token');
  }

  uploadImage(profileData): void {
    console.log(profileData);
    this.http.post<any>(this.Url+'/upload',profileData)
    .subscribe((result)=>{
     console.log(result);
    })  
  }

}
