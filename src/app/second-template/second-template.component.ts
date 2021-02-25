import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-second-template',
  templateUrl: './second-template.component.html',
  styleUrls: ['./second-template.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecondTemplateComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
