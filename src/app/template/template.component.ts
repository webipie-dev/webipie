import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
  encapsulation: ViewEncapsulation.None

})

export class TemplateComponent implements OnInit {

  @Input() fromStoreEdit = false;
  constructor() { }

  ngOnInit(): void {
    console.log(this.fromStoreEdit);
  }
}
