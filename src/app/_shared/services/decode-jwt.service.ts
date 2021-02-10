import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DecodeJwtService {

  token = null;
  decodedToken = null;

  constructor() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      try {
        this.decodedToken = this.getDecodedAccessToken(this.token);
      } catch (e) {
        console.log(e);
      }
    }
  }

  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch (Error){
      return null;
    }
  }
}
