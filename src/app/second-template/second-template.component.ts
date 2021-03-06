import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {StoreService} from "../_shared/services/store.service";

declare var $: any;
@Component({
  selector: 'app-second-template',
  templateUrl: './second-template.component.html',
  styleUrls: ['./second-template.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecondTemplateComponent implements OnInit {
  constructor(private el: ElementRef,
              private storeService: StoreService) {
  }

  ngOnInit(): void {
    window.addEventListener('message', event => {
      // IMPORTANT: check the origin of the data!
      console.log(event);
      if (event.origin.startsWith('http://webipie.com:4200')) {
        this.storeService.changeColorTheme(this.el, event.data);
        // console.log($('.logo')[0]);
        // $('#pop-prod').css('color', event.data);
        // $('.logo').children('children').eq(1).css('color', event.data);
        // The data was sent from your site.
        // Data sent with postMessage is stored in event.data:
      } else {
        // The data was NOT sent from your site!
        // Be careful! Do not use it. This else branch is
        // here just for clarity, you usually shouldn't need it.
        return;
      }
    });
  }
}
