import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials){
    return this.http.post('http://127.0.0.1:3000/storeOwner/signup', credentials)
  };

  loginWithFb(credentials){
    return this.http.post('http://127.0.0.1:3000/storeOwner/oauth/facebook', {"access_token":credentials})
  }

  loginWithGoogle(credentials){
    return this.http.post('http://127.0.0.1:3000/storeOwner/oauth/google', {"access_token":credentials})
  }
}
