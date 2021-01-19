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
  // storeId = JSON.parse(localStorage.getItem('currentStore'))._id;
  storeId = '600053ca1181b69010315090';


  public show = false;
  public defaultColors = [
    {name: 'chartI', colors: ['#ffffff', '#000105', '#3e6158', '#3f7a89', '#96c582', ]},
    {name: 'chartII', colors: ['#000105', '#ffffff', '#3e6158', '#3f7a89', '#96c582', ]},
    {name: 'chartIII', colors: ['#3e6158', '#ffffff', '#000105', '#3f7a89', '#96c582', ]},
  ];

  ngOnInit(): void {
  }

  public toggleColors(): void {
    this.show = !this.show;
  }

  colorChange(color): void {
    this.defaultColor = color.colors;
  }

  submit(): void {
    const postData = {
      'template.colorChart': this.defaultColor
    };
    this.storeService.edit(this.storeId, postData).subscribe(store => {
      localStorage.setItem('currentStore', JSON.stringify(store));
    });
  }
}
