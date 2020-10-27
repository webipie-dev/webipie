import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
})

export class StoreEditComponent implements OnInit {

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
