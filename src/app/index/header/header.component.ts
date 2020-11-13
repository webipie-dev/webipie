import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  route = this.router.url;
  changeable = this.route === '/' || this.route.indexOf('/#') !== -1;
  constructor(private router: Router) {}

  ngOnInit(): void {
    var header = document.getElementById("headerr");
    console.log(header);
    if (this.changeable) {
      window.addEventListener("scroll", function() {
        var scroll =  window.pageYOffset;
        if (scroll >= 40) {
          header.classList.remove('start-style');
          // header.classList.add('bg-light');
          header.classList.add('scroll-on');
        } else {

          header.classList.remove('scroll-on');
          // header.classList.remove('bg-light');
          header.classList.add('start-style');

        }

      });
    }
  }

}
