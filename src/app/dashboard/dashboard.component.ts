import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    function toggleSidebar() {
      document.getElementById("sidebar").classList.toggle("active");
      document.getElementById("sidebar-next").classList.toggle("sidenav-next");
      document.getElementById("sidebar-non-active").classList.toggle("active");
    }
  }

}
