import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/services/auth.service';
import { mobiscroll, MbscSelectOptions } from '@mobiscroll/angular';

mobiscroll.settings = {
  theme: 'ios',
  themeVariant: 'light',
  display: 'bubble'
};


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  items = [{
    value: 1,
    text: 'Atlanta'
  }, {
    value: 2,
    text: 'Berlin'
  }, {
    value: 3,
    text: 'Boston'
  }, {
    value: 4,
    text: 'Chicago'
  }, {
    value: 5,
    text: 'London'
  }, {
    value: 6,
    text: 'Los Angeles'
  }, {
    value: 7,
    text: 'New York'
  }, {
    value: 8,
    text: 'Paris'
  }, {
    value: 9,
    text: 'San Francisco'
  }];

  englishSettings: MbscSelectOptions = {
    lang: 'en'
  };

  arabicSettings: MbscSelectOptions = {
    lang: 'ar'
  };
  english = '';
  arabic = '';

  route = this.router.url;
  changeable = this.route === '/' || this.route.indexOf('/#') !== -1;
  token;

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    const header = document.getElementById('headerr');
    if (this.changeable) {
      window.addEventListener('scroll', () => {
        const scroll =  window.pageYOffset;
        if (scroll >= 40) {
          header.classList.remove('start-style');
          header.classList.add('scroll-on');
        } else {
          header.classList.remove('scroll-on');
          header.classList.add('start-style');
        }
      });
    }
  }

  logOut(): void{
    this.authService.logOut();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

}
