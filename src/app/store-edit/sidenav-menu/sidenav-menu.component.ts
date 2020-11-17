import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.css']
})
export class SidenavMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (window.screen.width < 576) {
      document.getElementById("sidebar").classList.toggle("active");
      document.getElementById("sidebar-non-active2").classList.toggle("hidden-sidenav");
    }
  }

}
