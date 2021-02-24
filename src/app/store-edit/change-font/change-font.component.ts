import {Component, Input, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {AlignmentTypes} from '@swimlane/ngx-charts';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-font',
  templateUrl: './change-font.component.html',
  styleUrls: ['./change-font.component.css']
})
export class ChangeFontComponent implements OnInit {
  @Input() toggleS: () => void;

  /*
    general settings to any template
  */
  fontTypes: Array<string> = JSON.parse(sessionStorage.getItem('store')).template.fontOptions;
  /*
    specific settings to user's template
  */

  fontType = JSON.parse(sessionStorage.getItem('store')).template.font;

  storeId = JSON.parse(sessionStorage.getItem('store'))._id;

  currentFont = JSON.parse(sessionStorage.getItem('store')).template.font;

  constructor(private http: HttpClient,
              private storeService: StoreService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const postData = {
      ids: this.storeId,
      'template.font': this.fontType,

    };
    this.storeService.edit(this.storeId, postData).subscribe(store => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['store/font']);
        sessionStorage.setItem('store', JSON.stringify(store));
      });
    });
  }

  resetFont() {
    this.fontType = this.currentFont;
  }

}


//
// sizeChange(value): void {
//   console.log('the size value is' + value);
//   this.fontSize = value;
// }
//
// shadowChange(value): void {
//   this.textShadow = (value === '1');
// }
//
// alignChange(event, value): void {
//
//   let target = event.target;
//   if (event.target.tagName === 'path') {
//   target = event.target.parentNode;
// }
//
// console.log(target);
// // add the css effects
// target.classList.add('alignment');
//
// const icons = document.querySelectorAll('.alignment');
//
// // tslint:disable-next-line:prefer-for-of
// for (let i = 0; i < icons.length; i++) {
//
//   // If the icon is the one clicked, skip it
//   if (icons[i] === event.target) {
//     continue;
//   }
//
//   // Remove the .alignment class
//   icons[i].classList.remove('alignment');
//
// }
//
// this.textAlign = value;
// }
//
// onSelect(event, value): void {
//   let target = event.target;
//   if (event.target.tagName === 'path') {
//   target = event.target.parentNode;
// }
//
// if (value === 'font-size') {
//   this.fontSize += 2;
//   return;
// }
//
// target.classList.toggle('font-item-selected');
//
// if (value === 'italic') {
//   this.textItalic = !this.textItalic;
// }
// }
