import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-change-font',
  templateUrl: './change-font.component.html',
  styleUrls: ['./change-font.component.css']
})
export class ChangeFontComponent implements OnInit {
  @Input() toggleS: () => void;
  selectItem = false;
  constructor() { }

  ngOnInit(): void {
  }

  onSelect() {
    console.log('sdfgdfdsd');
    this.selectItem = !this.selectItem;
    console.log('this happened ' + this.selectItem);
  }

}
