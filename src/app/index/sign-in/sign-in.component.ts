import {Component, OnInit} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../_shared/services/auth.service';
import {StoreOwner} from '../../_shared/models/store_owner.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private authService: SocialAuthService,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  invalidForm = false;
  storeOwner: StoreOwner = new StoreOwner();

  ngOnInit(): void {
    const head = document.getElementById('headerr');
    head.className += ' color-blue-header';
  }

  signIn(): void {
    this.auth.signIn(this.storeOwner)
      .subscribe(result => {
          console.log(result['status']);
          localStorage.setItem('token', result['token']);
          // let returnUrl = this.route.snapshot.queryParamMap.get('retrunUrl');
          this.router.navigate(['/after-signin']);
      }, error => {
        console.log(error);
        this.invalidForm = true;
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
