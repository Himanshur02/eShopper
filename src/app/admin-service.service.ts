import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers : new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  Url = "http://localhost:3000/api/admin";

  constructor(private http : HttpClient) { }

  loginAdmin(data : any ):Observable<any[]>{
    return this.http.post<any[]>(this.Url+'/login',data,httpOptions);
  }

  addCategory(data:any):Observable<any[]>{
    return this.http.post<any[]>(this.Url+'/addCategory',data,httpOptions);
  }
  
  getAllCategories(pageNumber:any):Observable<any[]>{
    return this.http.get<any[]>(this.Url+'/categories/'+pageNumber);
  }

  getCategoryById(categoryId:any):Observable<any[]>{
    return this.http.get<any[]>(this.Url+'/category/'+categoryId);
  }

  deleteCategory(categoryId:any):Observable<any[]>{
    return this.http.delete<any[]>(this.Url+'/delete/Category/'+categoryId,httpOptions);
  }

  updateCategory(categoryId,data : any ):Observable<any[]>{
    return this.http.put<any[]>(this.Url+'/update/category/'+categoryId,data,httpOptions );
  }

  searchCategory(searchKeywords : any ):Observable<any[]>{
    return this.http.post<any[]>(this.Url+'/search/category',searchKeywords,httpOptions );
  }

  showProductCount(categoryName:any):Observable<any[]>{
    return this.http.get<any[]>(this.Url+'/products/category/'+categoryName);
  }

  addProduct(data : any ):Observable<any[]>{
    return this.http.post<any[]>(this.Url+'/addProduct',data,httpOptions);
  }

  showAllProducts(pageNumber:any):Observable<any[]>{ 
    return this.http.get<any[]>(this.Url+'/products/'+pageNumber,httpOptions);
  }

  getProductById(productId:any):Observable<any[]>{
    return this.http.get<any[]>(this.Url+'/product/'+productId);
  }

  updateProduct(productId,data : any ):Observable<any[]>{
    return this.http.put<any[]>(this.Url+'/update/product/'+productId,data,httpOptions );
  }

  deleteProduct(productId:any):Observable<any[]>{
    return this.http.delete<any[]>(this.Url+'/delete/product/'+productId,httpOptions);
  }

  searchProduct(searchKeywords : any ):Observable<any[]>{
    return this.http.post<any[]>(this.Url+'/search/product',searchKeywords,httpOptions );
  }

  addToCart(productId:any):Observable<any[]>{
    return this.http.get<any[]>(this.Url+'/addToCart/'+productId);
  }

  showCartItems():Observable<any[]>{
    return this.http.get<any[]>(this.Url+'/cartItems');
  }

  deleteCartItem(itemId:any):Observable<any[]>{
    return this.http.delete<any[]>(this.Url+'/delete/item/'+itemId,httpOptions);
  }

  showProductsByCategory(categoryName:any,pageNumber:any):Observable<any[]>{
    return this.http.get<any[]>(this.Url+'/show/category/'+categoryName+"/"+pageNumber);
  }

  confirmOrderMail(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.Url+'/sendMail/'+id);
  }
 
  
  authAdmin() {
    return !!localStorage.getItem('admin');
  }
}
