import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-nav-minimized',
  templateUrl: './side-nav-minimized.component.html',
  styleUrls: ['./side-nav-minimized.component.css']
})
export class SideNavMinimizedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  switchAndToggleS(path): void {
    this.router.navigate([path]);
  }

}
