import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import * as decode from 'jwt-decode' ;
import { retry } from 'rxjs/operators' ;
import {ShoppinglistCacheService} from "./shoppinglist-cache.service";

interface User {
  result: {
    created_at: Date,
    email: string,
    id: number,
    firstname: string,
    lastname: string,
    role: string,
    address: string,
    updated_at: Date
  }
}
@Injectable()
export class AuthenticationService {

  private api:string = 'http://einkaufsliste.s1710456034.student.kwmhgb.at/api/auth';
  constructor(private http: HttpClient,
              private sc: ShoppinglistCacheService
  ) { }

  login(email: string, password: string){
    return this.http.post(`${this.api}/login`, {'email': email, 'password': password});
  }

  public setCurrentUserId(){
    this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res => {
      localStorage.setItem('userId', res.result.toString());
    })
  };

  public getCurrentUserId(){
    return Number.parseInt(localStorage.getItem('userId'));
  }

  public setCurrentUserRole(id:number){
    this.sc.getUser(id).subscribe(res => {
      localStorage.setItem('role', res.role.toString());
    });
  }

  public getCurrentUserRole(){
    //console.log("getrole");
    return String(localStorage.getItem('role'));
  }

  public isHelper(){
    if(this.getCurrentUserRole() ===  'helper'){
      return true;
    }
    else {
      return false;
    }
  }

  public setLocalStorage(token: string){
    console.log("Storing token");
    console.log(token);
    const decodedToken = decode(token);
    console.log(decodedToken);
    //console.log(decodedToken.user.role);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', decodedToken.user.id);
    this.setCurrentUserRole(decodedToken.user.id);
    //this.getCurrentUserRole();
    //localStorage.setItem('role', decodedToken.user.role);
  }

  logout(){
    this.http.post(`${this.api}/logout`,{});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    console.log("logged out");
  }

  public isLoggedIn(){
    if(isNotNullOrUndefined(localStorage.getItem("token"))){
      let token: string = localStorage.getItem("token");
      //console.log(token);
      const decodedToken = decode(token);
      let expirationDate:Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if(expirationDate < new Date()) {
        console.log("token expired");
        localStorage.removeItem("token");
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  isLoggedOut(){
    return !this.isLoggedIn();
  }

}
