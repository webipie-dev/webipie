import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Utils} from '../utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              public jwtHelper: JwtHelperService) { }

  protected getUrl() {
    return Utils.url;
  }

  signIn(credentials){
    return this.http.post(this.getUrl() + '/storeOwner/signin', credentials);
  }

  login(credentials){
    return this.http.post(this.getUrl() + '/storeOwner/signup', credentials);
  }

  loginWithFb(credentials){
    return this.http.post(this.getUrl() + '/storeOwner/oauth/facebook', {access_token: credentials});
  }

  loginWithGoogle(credentials){
    return this.http.post(this.getUrl() + '/storeOwner/oauth/google', {access_token: credentials});
  }

  logOut(): void{
    localStorage.removeItem('token');
  }
  
  changePwd(oldPassword, newPassword){
    let httpOptions: any;
    if ( localStorage.getItem('token') ){
      httpOptions = {
        headers: { Authorization: localStorage.getItem('token') },
      };
    }
    return this.http.post(this.getUrl() + '/storeOwner/changepwd', { oldPassword, newPassword }, httpOptions );
  }


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
