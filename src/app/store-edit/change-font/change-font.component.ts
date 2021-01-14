import {Component, Input, OnInit} from '@angular/core';
import {StoreService} from '../../_shared/services/store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-font',
  templateUrl: './change-font.component.html',
  styleUrls: ['./change-font.component.css']
})
export class ChangeFontComponent implements OnInit {
  @Input() toggleS: () => void;

  storeId = '5fd09d461bcaf731b40f95fb';
  postData: Object;

  /*
    general settings to any template
  */
  fontTypes: Array<string>;
  fontSizeMin: number;
  fontSizeMax: number;
  fontWeights: Array<string>;
  // const alignments = ["center", "right", "left"];

  /*
    specific settings to user's template
  */

  fontType: string;
  fontSize: number;
  fontWeight: string;
  textShadow: boolean;
  textShadowColor: string;
  textAlign: string;
  textBold: boolean;
  textItalic: boolean;

  constructor(private storeService: StoreService,
              private router: Router) { }

  ngOnInit(): void {
    this.fontTypes = [
      'Serif',
      'Sans-serif',
      'Monospace',
      'Cursive'
    ];
    this.fontSizeMin = 5;
    this.fontSizeMax = 50;
    this.fontWeights = [
      'normal',
      'bold',
      'bolder',
      'lighter'
    ];
    // const alignments = ["center", "right", "left"];

    this.fontType = 'Serif';
    this.fontSize = 10 ;
    this.fontWeight = 'normal';
    this.textShadow = false;
    this.textShadowColor = 'blue';
    this.textAlign = 'center';
    this.textBold = false;
    this.textItalic = false;
  }

  sizeChange(value){
    console.log('the size value is' + value);
    this.fontSize = value;
  }

  shadowChange(value){
    this.textShadow = (value === '1');
  }

  alignChange(event, value){

    let target = event.target;
    if (event.target.tagName === 'path') {
      target = event.target.parentNode;
    }

    console.log(target);
    // add the css effects
    target.classList.add('alignment');

    const icons = document.querySelectorAll('.alignment');

    for (let i = 0; i < icons.length; i++) {

      // If the icon is the one clicked, skip it
      if (icons[i] === event.target) { continue; }

      // Remove the .alignment class
      icons[i].classList.remove('alignment');

    }

    this.textAlign = value;
  }

  onSelect(event, value) {
    let target = event.target;
    if (event.target.tagName === 'path') {
      target = event.target.parentNode;
    }

    if(value=='font-size'){
      this.fontSize += 2;
      return;
    }

    target.classList.toggle('font-item-selected');

    if (value === 'italic'){ this.textItalic = !this.textItalic; }
  }

  onSubmit() {
    this.postData = {
      'ids': this.storeId,
      'type': this.fontType,
      'size': this.fontSize,
      'weight': this.fontWeight,
      'alignment': this.textAlign,
      'bold': this.textBold,
      'italic': this.textItalic,

    }
    this.storeService.edit(this.postData).subscribe(data => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['store/font']);
      });
    });
  }

}
