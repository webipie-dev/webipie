import {Component, OnInit} from '@angular/core';
import {Product} from '../../_shared/models/product.model';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EditProductService} from '../../_shared/services/edit-product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  private productSub: Subscription;
  productModif: Product;
  productForm: FormGroup;
  postData = new FormData();
  singleProduct: Product = new Product();
  allProducts: Product[] = [];


  constructor(private http: HttpClient,
              private editProductService: EditProductService) {
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      imgs: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      store: new FormControl(null, Validators.required),
    });
    // this.getProductById('5f875b3ab940975b7087477c');
    // this.getProduct();
  }


  getProductById(id) {
    this.editProductService.getById(id).subscribe(data => {
      this.singleProduct = data;
      console.log(data);
    });
  }

  getProduct() {
    this.editProductService.getAll().subscribe(data => {
      console.log(data);
      this.allProducts = data.products;
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files;
    const name = (event.target as HTMLInputElement).name;
    for (let i = 0; i < file.length; i++){
      this.postData.append('imgs', file[i], name);
    }

  }

  addProduct() {

    for (const field in this.productForm.controls) {
      const control = this.productForm.get(field);
      if (control.value) {
        // console.log('exist: ' + field);
        // console.log(control.value);
        // console.log('--------');
        this.postData.append(field, control.value);
        // if (field in ['imgs']) {
        //   this.postData.append(field, control.value, field);
        // } else {
      } else {
        // console.log('doesnt exist: ' + field);
        // console.log(control.value);
        // console.log('--------');
        if (field in ['imgs']) {
          this.postData.append(field, '', field);
        } else {
          this.postData.append(field, '');
        }

      }
    }
    // this.productForm.reset();
    this.editProductService.addOne(this.postData).subscribe((data) => {
      console.log(data);
    });

  }


  // getProduct() {
  //   this.editProductService.getProductModif('5f875b3ab940975b7087477c');
  //   this.productSub = this.editProductService.getProductUpdateListener()
  //     .subscribe((product: Product) => {
  //       this.productModif = product;
  //     });
  //
  // }

}
