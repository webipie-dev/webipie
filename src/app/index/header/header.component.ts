import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
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
