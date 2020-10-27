import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    public jwtHelper: JwtHelperService) { }

  login(credentials){
    return this.http.post('http://127.0.0.1:3000/storeOwner/signup', credentials)
  };

  loginWithFb(credentials){
    return this.http.post('http://127.0.0.1:3000/storeOwner/oauth/facebook', {"access_token":credentials})
  }

  loginWithGoogle(credentials){
    return this.http.post('http://127.0.0.1:3000/storeOwner/oauth/google', {"access_token":credentials})
  }


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
