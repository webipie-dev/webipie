import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("sidebar-non-active").classList.toggle("active");
    document.getElementById("sidebar-next").classList.toggle("sidenav-next");
  }

}
