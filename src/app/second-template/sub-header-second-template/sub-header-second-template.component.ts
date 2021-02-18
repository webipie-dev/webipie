import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sub-header-second-template',
  templateUrl: './sub-header-second-template.component.html',
  styleUrls: ['./sub-header-second-template.component.css']
})
export class SubHeaderSecondTemplateComponent implements OnInit {
  @Input() fromWhere: string;

  constructor() { }

  ngOnInit(): void {
  }

}
