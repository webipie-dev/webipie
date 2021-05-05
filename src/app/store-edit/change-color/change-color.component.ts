import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {websiteDomainName, port, httpProtocol} from 'src/app/configuration';
import { Format } from 'src/app/_shared/utils/format';

declare var $: any;

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.css']
})
export class ChangeColorComponent implements OnInit {

  store = encryptStorage.getItem('store');
  // set initial and default values to test whether the user has made any changes
  // whether we should send modifications to back
  defaultColor = this.store.template.colorChart;
  initialColor = this.store.template.colorChart;
  storeId = this.store.id;

  public show = false;
  public defaultColors = this.store.template.colorChartOptions;;


  constructor(private http: HttpClient,
              private storeService: StoreService,
              private router: Router) {}

  ngOnInit(): void {}

  // real time color change
  changeColor(color): void {
    if (JSON.stringify(color) !== JSON.stringify(this.defaultColor)) {
      const subjectToChange = {
        subj: color,
        type: 'color',
      };
      $('#iframe')[0].contentWindow.postMessage(subjectToChange, `${httpProtocol}://${this.store.url}${Format.fmtPort(port)}/`);
      this.defaultColor = color;
    }
  }

  testChange(): boolean {
    return (JSON.stringify(this.initialColor) === JSON.stringify(this.defaultColor));
  }

  resetColor(): void {
    this.changeColor(this.initialColor);
    this.defaultColor = this.initialColor;
  }

  submit(): void {
    const postData = {
      'template.colorChart': this.defaultColor
    };
    this.initialColor = this.defaultColor;
    this.storeService.onSubmit(this.storeId, postData);
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
          this.submit();
        } else {
          this.changeColor(this.initialColor);
          Swal.close();
        }
        this.router.navigateByUrl('/store');
      });
    } else {
      this.router.navigateByUrl('/store');
    }
  }
}
