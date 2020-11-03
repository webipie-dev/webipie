import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent implements OnInit {

  constructor() { }
  @Input() toggleS: () => void;
  ngOnInit(): void {
  }

}
