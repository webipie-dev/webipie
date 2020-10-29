import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clicked() {
    console.log('heeeyyy');
  }

  onEditSelect() {
    console.log('clicked');
    document.getElementById("close-modal").click();
    this.router.navigate(['dashboard', 'product-edit'], { queryParams: {id: '5f93ffc994a31e4b6cb602dc'} });
  }


}
