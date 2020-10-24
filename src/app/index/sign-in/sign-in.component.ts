import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_shared/services/auth.service';
import { StoreOwner } from '../../_shared/models/store_owner.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],

})
export class SignInComponent implements OnInit {

  constructor(private auth: AuthService) { }

  store_owner : StoreOwner = new StoreOwner();

  ngOnInit(): void {
  }

  signIn(){
    console.log(JSON.stringify(this.store_owner));
    this.auth.login(this.store_owner)
      .subscribe( result =>{
        console.log(result)
        if (result){
          // console.log(result);
          localStorage.setItem('token', result['token'])
          // console.log(result);
          console.log('success here');
        }
        else
          console.log('error here')
      })
  }

}
