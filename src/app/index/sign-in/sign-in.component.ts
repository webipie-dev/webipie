import {Component, OnInit} from '@angular/core';
import {SocialAuthService} from 'angularx-social-login';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../_shared/services/auth.service';
import {StoreOwner} from '../../_shared/models/store_owner.model';
import Swal from 'sweetalert2';
import { StoreService } from '../../_shared/services/store.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private authService: SocialAuthService,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private storeService: StoreService) {
  }

  invalidEmail = false;
  emailError = '';
  invalidPassword = false;
  passwordError = '';
  loading = false;

  storeOwner: StoreOwner = new StoreOwner();

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }

    const head = document.getElementById('headerr');
    head.className += ' color-blue-header';

  }

  signIn(): void {
    this.loading = true;
    this.auth.signIn(this.storeOwner)
      .subscribe(result => {
        localStorage.setItem('token', result['token']);
        const returnUrl = this.route.snapshot.queryParamMap.get('retrunUrl');

        // params in route
        const templateId = this.route.snapshot.queryParamMap.get('templateId');
        const storeName = this.route.snapshot.queryParamMap.get('storeName');
        const storeType = this.route.snapshot.queryParamMap.get('storeType');

        // redirect to dashboard in case of storeID
        if (result['storeId']){
          localStorage.setItem('storeID', result['storeId']);
          this.router.navigate([returnUrl || 'dashboard']);
        }
        // create store and redirect to dashboard
        else if (templateId && storeName && storeType){
          this.storeService.addOne({ templateId, name: storeName, storeType }).subscribe(store => {
            localStorage.setItem('storeID', store._id);
          });
          this.router.navigate(['dashboard']);
        }
        // redirect to templates
        else{
          this.router.navigate(['templates']);
        }

        // spinner
        this.loading = false;
      }, error => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'email or/and password are incorrect!',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
        this.loading = false;
      });
  }

  onInputFocus(event): void{
    if (event.target.id === 'email'){
      const re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})$/;
      if (re.test(event.target.value) || event.target.value === ''){
        this.invalidEmail = false;
        this.emailError = '';
      }
      else{
        this.invalidEmail = true;
        this.emailError = 'invalid email: should be in form of example@domain.prefix';
      }
    }

    if (event.target.id === 'password'){
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (re.test(event.target.value) || event.target.value === ''){
        this.invalidPassword = false;
        this.passwordError = '';
      }
      else{
        this.invalidPassword = true;
        this.passwordError = 'Password must contain at least 8 characters, with one digit and at least one uppercase and lower case letter';
      }
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(x => {
        // let credentials = {"acces_token": x};
        // console.log(x['authToken']);
        this.auth.loginWithFb(x['authToken'])
          .subscribe(result => {
            localStorage.setItem('token', result['token']);
            const returnUrl = this.route.snapshot.queryParamMap.get('retrunUrl');

            // params in route
            const templateId = this.route.snapshot.queryParamMap.get('templateId');
            const storeName = this.route.snapshot.queryParamMap.get('storeName');
            const storeType = this.route.snapshot.queryParamMap.get('storeType');

            // redirect to dashboard in case of storeID
            if (result['storeID']){
              localStorage.setItem('storeID', result['storeId']);
              this.router.navigate([returnUrl || 'dashboard']);
            }
            // create store and redirect to dashboard
            else if (templateId && storeName && storeType){
              this.storeService.addOne({ templateId, name: storeName, storeType }).subscribe(store => {
                localStorage.setItem('storeID', store._id);
              });
              this.router.navigate(['dashboard']);
            }
            // redirect to templates
            else{
              this.router.navigate(['templates']);
            }

            // spinner
            this.loading = false;
          });
      });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(x => {
        // console.log(x['authToken']);
        this.auth.loginWithGoogle(x['authToken'])
          .subscribe(result => {
            localStorage.setItem('token', result['token']);
            const returnUrl = this.route.snapshot.queryParamMap.get('retrunUrl');
            // params in route
            const templateId = this.route.snapshot.queryParamMap.get('templateId');
            const storeName = this.route.snapshot.queryParamMap.get('storeName');
            const storeType = this.route.snapshot.queryParamMap.get('storeType');

            // redirect to dashboard in case of storeID
            if (result['storeID']){
              localStorage.setItem('storeId', result['storeId']);
              this.router.navigate([returnUrl || 'dashboard']);
            }
            // create store and redirect to dashboard
            else if (templateId && storeName && storeType){
              this.storeService.addOne({ templateId, name: storeName, storeType }).subscribe(store => {
                localStorage.setItem('storeID', store._id);
              });
              this.router.navigate(['dashboard']);
            }
            // redirect to templates
            else{
              this.router.navigate(['templates']);
            }

            // spinner
            this.loading = false;
      });
    });
  }

  navigateToSignUp(): void{
    const templateId = this.route.snapshot.queryParamMap.get('templateId');
    const storeName = this.route.snapshot.queryParamMap.get('storeName');
    const storeType = this.route.snapshot.queryParamMap.get('storeType');
    this.router.navigate(['signup'], { queryParams: { templateId, storeName, storeType }});
  }

}
