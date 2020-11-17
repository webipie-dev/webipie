import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor() { }
  toggleS = (): void =>  {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebar-non-active').classList.toggle('active');
    document.getElementById('sidebar-non-active2').classList.toggle('hidden-sidenav');
    document.getElementById('sidebar-next').classList.toggle('sidenav-next');
  }
  ngOnInit(): void {
  }
}
