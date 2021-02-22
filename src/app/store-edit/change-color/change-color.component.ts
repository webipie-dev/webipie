import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../_shared/services/store.service';
import {Router} from '@angular/router';

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
  store = JSON.parse(sessionStorage.getItem('store'));
  usedChart;
  public show = false;
  public defaultColors = [];

  ngOnInit(): void {
    this.defaultColors = this.store.template.colorChartOptions;
    this.usedChart = this.store.template.colorChart;
    this.defaultColor = this.store.template.colorChart;
    console.log(this.defaultColor);
    console.log(this.usedChart);
  }

  public toggleColors(): void {
    this.show = !this.show;
  }

  colorChange(color): void {
    this.defaultColor = color;
    this.store.template.colorChart = color;
    console.log(this.store.template.colorChart);
    console.log(this.usedChart);
  }

  submit(): void {
    const postData = {
      'template.colorChart': this.defaultColor
    };
    this.storeService.edit(this.store._id, postData).subscribe(store => {
      sessionStorage.setItem('store', JSON.stringify(store));
      this.usedChart = this.store.template.colorChart;
      console.log(this.usedChart);
    });
  }
}
