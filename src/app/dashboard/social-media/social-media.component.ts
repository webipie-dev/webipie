import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  public windwosWidth = window.innerWidth;
  constructor() {
  }

  ngOnInit(): void {
  }


  @HostListener('window:resize') windwosResize() {
    this.windwosWidth = window.innerWidth;
  }

}
