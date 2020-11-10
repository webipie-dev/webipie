import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{

  constructor(private router: Router) { }


  ngOnInit(): void {

    var header = document.querySelector(".start-style");

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


  goTo(fragment){
    this.router.navigate( ['/'], {fragment: fragment});
    window.location.reload();
  }

}
