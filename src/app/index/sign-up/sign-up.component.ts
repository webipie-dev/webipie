import { Component, OnInit, EventEmitter } from '@angular/core';
import {AuthService} from '../../_shared/services/auth.service';
import {StoreOwner} from '../../_shared/models/store_owner.model';

import {SocialAuthService} from 'angularx-social-login';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],

})
export class SignUpComponent implements OnInit {

  invalidEmail = false;
  emailError = '';
  invalidPassword = false;
  passwordError = '';

  constructor(private auth: AuthService,
              private authService: SocialAuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  storeOwner: StoreOwner = new StoreOwner();

  ngOnInit(): void {
    const head = document.getElementById('headerr');
    head.className += ' color-blue-header';
  }

  signUp() {
    // console.log(JSON.stringify(this.storeOwner));
    this.auth.login(this.storeOwner)
      .subscribe(result => {
          console.log(result);
          localStorage.setItem('token', result['token']);
          const returnUrl = this.route.snapshot.queryParamMap.get('retrunUrl');
          this.router.navigate([returnUrl || '/after-signin']);
      }, error => {
        console.log(error);
        console.log(error.error);
        console.log(error.error);
        if (error.status === 400) {
          if (error.error.indexOf('email') > -1) { this.invalidEmail =  true; this.emailError = error.error;  }
          if (error.error.indexOf('password') > -1) { this.invalidPassword =  true; this.passwordError = error.error; }
        }
        if (error.status === 403) {
          this.invalidEmail = true;
          this.emailError = error.error.error;
        }
        console.log(this.invalidEmail);
      });
  }

  onInputFocus(event) {
    console.log(event.target.id);
    if (event.target.id === 'email'){
      this.invalidEmail = false;
      this.emailError = '';
    }

    if (event.target.id === 'password'){
      this.invalidPassword = false;
      this.emailError = '';
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(x => {
        // let credentials = {"acces_token": x};
        // console.log(x['authToken']);
        this.auth.loginWithFb(x['authToken'])
          .subscribe(result => {
            console.log(result);
            if (result) {
              localStorage.setItem('token', result['token']);
              const returnUrl = this.route.snapshot.queryParamMap.get('retrunUrl');
              this.router.navigate([returnUrl || '/after-signin']);
            } else {
              console.log('error here');
            }
          });
      });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(x => {
        // console.log(x['authToken']);
        this.auth.loginWithGoogle(x['authToken'])
          .subscribe(result => {
            console.log(result);
            if (result) {
              localStorage.setItem('token', result['token']);
              const returnUrl = this.route.snapshot.queryParamMap.get('retrunUrl');
              this.router.navigate([returnUrl || '/after-signin']);
            } else {
              console.log('error here');
            }
          });
      });
  }

}
