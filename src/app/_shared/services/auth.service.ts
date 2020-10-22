import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials){
    return this.http.post('http://127.0.0.1:3000/storeOwner/signup', JSON.parse(JSON.stringify(credentials)))
  }
}
