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
  store = JSON.parse(localStorage.getItem('currentStore'));
  public show = false;
  public defaultColors = [];

  ngOnInit(): void {
    this.defaultColors = this.store.template.colorChartOptions;
    console.log('these are the options');
    console.log(this.defaultColors);
  }

  public toggleColors(): void {
    this.show = !this.show;
  }

  colorChange(color): void {
    this.defaultColor = color;
    this.store.template.colorChart = this.defaultColor;
  }

  submit(): void {
    const postData = {
      'template.colorChart': this.defaultColor
    };
    this.storeService.edit(this.store._id, postData).subscribe(store => {
      localStorage.setItem('currentStore', JSON.stringify(store));
    });
  }
}
