import {Component, ElementRef, OnInit} from '@angular/core';
import {Store} from '../../_shared/models/store.model';
import {StoreService} from '../../_shared/services/store.service';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';
import {websiteDomainName, port, httpProtocol} from 'src/app/configuration';
import { Format } from 'src/app/_shared/utils/format';

declare var $: any;
@Component({
  selector: 'app-top-slider',
  templateUrl: './top-slider.component.html',
  styleUrls: ['./top-slider.component.css']
})
export class TopSliderComponent implements OnInit {
  store: Store;
  title: string[];
  partOne: string;
  partTwo: string;
  description: string;
  mainButt: string;
  imageToDisplay: string;

  constructor(private el: ElementRef,
              private storeService: StoreService) { }

  ngOnInit(): void {
    window.addEventListener('message', event => {
      if (event.origin.startsWith(`${httpProtocol}://${websiteDomainName}${Format.fmtPort(port)}`)) {
        switch (event.data.type) {
          case 'color':
            this.storeService.changeColorTheme(this.el, event.data.subj);
            break;
          case 'font':
            this.storeService.changeFontTheme(this.el, event.data.subj);
            break;
          case 'header':
            console.log(event.data.subj);
            this.changeHeader(event.data.subj);
            break;
        }
      } else { return; }
    });
    this.store = encryptStorage.getItem('store');
    this.storeService.changeTheme(this.el, this.store);
    this.title = this.store.template.header.title.split(' ');
    if (this.title.length > 1) {
      this.partOne = this.title.splice(0, this.title.length / 2).join(' ');
      this.partTwo = this.title.join(' ');
    }
    this.description = this.store.template.header.description;
    this.mainButt = this.store.template.header.mainButton;
    this.imageToDisplay = this.store.template.header.img;
  }

  changeHeader(header) {
    header.title = header.title.split(' ');
    if (header.title.length > 1) {
      this.partOne = header.title.splice(0, header.title.length / 2).join(' ');
      this.partTwo = header.title.join(' ');
    }
    this.description = header.description;
    this.mainButt = header.mainButton;
    $('.tp-bgimg').each( function(index, element) {
      $(element).css('background-image', 'url(' + header.img + ')');
      $(element).attr('src', header.img);
      $(element).data('src', header.img);
    });

    $('.tp-arr-imgholder').each( function(index, element) {
      $(element).css('background-image', 'url(' + header.img + ')');
      $(element).attr('src', header.img);
    });
    this.imageToDisplay = header.img;
    console.log(this.partOne);
    console.log(this.imageToDisplay);
  }
}
