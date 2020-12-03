import {Component, OnInit} from '@angular/core';
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

  invalidForm = false;
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
        if (result) {
          console.log(result);
          localStorage.setItem('token', result['token']);
          const returnUrl = this.route.snapshot.queryParamMap.get('retrunUrl');
          this.router.navigate([returnUrl || '/after-signin']);
        } else {
          console.log('error here');
          this.invalidForm = true;
        }
      });
  }

  onInputFocus() {
    this.invalidForm = false;
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
