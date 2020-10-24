import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_shared/services/auth.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],

})
export class SignInComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    var head = document.getElementById('headerr');
    head.className += ' color-blue-header';
    console.log(head);
  }

  email = 'email';
  password = 'password';
  signIn(credentials){
    console.log(JSON.parse(JSON.stringify(credentials)));
    this.auth.login(credentials)
      .subscribe( result =>{
        console.log(result);
        if (result){
          console.log(result);
          console.log('success here');
        }
        else
          console.log('error here')
      })
  }

}
