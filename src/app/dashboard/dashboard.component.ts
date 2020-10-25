import {Component, Input, OnInit} from '@angular/core';
import {Utils} from "../_shared/utils";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor() { }
  toggleS = (): void =>  {
    console.log(document.getElementById("sidebar"));
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("sidebar-non-active").classList.toggle("active");
    document.getElementById("sidebar-next").classList.toggle("sidenav-next");
  }
  ngOnInit(): void {
  }
}
