import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {encryptStorage} from '../../_shared/utils/encrypt-storage';

declare var $: any;

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.css']
})
export class ChangeColorComponent implements OnInit {

  constructor(private http: HttpClient,
              private storeService: StoreService) {
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

  submit(): void {
    const postData = {
      'template.colorChart': this.defaultColor
    };

    this.storeService.edit(this.store.id, postData).subscribe(store => {
      encryptStorage.setItem('store', store);
      this.usedChart = this.store.template.colorChart;
    });
  }
}
