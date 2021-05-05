import {Component, Input, OnInit} from '@angular/core';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {websiteDomainName, port, httpProtocol} from 'src/app/configuration';
import { Format } from 'src/app/_shared/utils/format';

declare var $: any;

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
  fontTypes: Array<string> = encryptStorage.getItem('store').template.fontOptions;

  // set initial and default values to test whether the user has made any changes
  // whether we should send modifications to back
  defaultFont = encryptStorage.getItem('store').template.font;

  initialFont = encryptStorage.getItem('store').template.font;

  storeId = encryptStorage.getItem('store').id;

  constructor(private http: HttpClient,
              private storeService: StoreService,
              private router: Router) {}

  ngOnInit(): void {}

  // real time font change
  changeFont(data?: string): void {
    const subjectToChange = {
      subj: data || this.defaultFont,
      type: 'font',
    };
    $('#iframe')[0].contentWindow.postMessage(subjectToChange, `${httpProtocol}://store.${websiteDomainName}${Format.fmtPort(port)}/`);
  }

  onSubmit(): void {
    const postData = {
      'template.font': this.defaultFont,
    };
    this.initialFont = this.defaultFont;

    // submit changes
    this.storeService.onSubmit(this.storeId, postData);
  }

  resetFont(): void {
    this.defaultFont = this.initialFont;
    this.changeFont();
  }

  testChange(): boolean {
    return (this.initialFont === this.defaultFont);
  }

  // in case the user changed values and didn't click on save
  returnToEditStore(): void {
    if (!this.testChange()) {
      Swal.fire({
        title: 'Be Careful!',
        text: 'You have unsaved changes, Would you continue to discard these changes or save them before proceeding ?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'Save Changes',
        denyButtonText: 'Discard Changes'
      }).then(result => {
        if (result.value) {
          this.onSubmit();
        } else {
          this.changeFont(this.initialFont);
          Swal.close();
        }
        this.router.navigateByUrl('/store');
      });
    } else {
      this.router.navigateByUrl('/store');
    }
  }
}
