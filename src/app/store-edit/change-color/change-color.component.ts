import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.css']
})
export class ChangeColorComponent implements OnInit {

  constructor(private http: HttpClient,
              private storeService: StoreService,
              private router: Router) {
  }

  defaultColor;
  usedChart;
  store = encryptStorage.getItem('store');

  public show = false;
  public defaultColors = [];

  ngOnInit(): void {
    this.defaultColors = this.store.template.colorChartOptions;
    this.usedChart = this.store.template.colorChart;
    this.defaultColor = this.store.template.colorChart;
  }

  public toggleColors(): void {
    this.show = !this.show;
  }

  colorChange(color): void {
    const subjectToChange = {
      subj: color,
      type: 'color',
    };
    $('#iframe')[0].contentWindow.postMessage(subjectToChange, 'http://store.webipie.com:4200/');
    this.defaultColor = color;
    this.store.template.colorChart = color;
  }


  returnToEditStore(): void {
    if (this.usedChart !== this.defaultColor) {
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
          Swal.close();
        }
        this.router.navigateByUrl('/store');
      });
    } else {
      this.router.navigateByUrl('/store');
    }
  }
  submit(): void {
    const postData = {
      'template.colorChart': this.defaultColor
    };

    this.storeService.edit(this.store.id, postData).subscribe(store => {
      encryptStorage.setItem('store', store);
      this.usedChart = this.store.template.colorChart;
      this.router.navigateByUrl('/store');
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: 'success',
        title: 'Saved successfully'
      });
    });
  }
}
