import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor() { }

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

}
