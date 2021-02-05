import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public windwosWidth = window.innerWidth;
  constructor() {
  }

  ngOnInit(): void {
  }


  @HostListener('window:resize') windwosResize() {
    this.windwosWidth = window.innerWidth;
  }

}
