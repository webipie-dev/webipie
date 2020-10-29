import {Component, OnInit} from '@angular/core';
import {Product} from '../../_shared/models/product.model';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EditProductService} from '../../_shared/services/edit-product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {createLogErrorHandler} from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productForm: FormGroup;
  postData = new FormData();
  singleProduct: Product = new Product();
  allProducts: Product[] = [];
  edit = false;
  productId = '';


  constructor(private http: HttpClient,
              private editProductService: EditProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params.id) {
        this.productId = params.id;
        this.edit = true;
      }
    });
    if (this.edit) {
      this.productForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        imgs: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
        store: new FormControl('', Validators.required),
      });
      this.getProductById(this.productId);
      this.productForm.patchValue({
        name: this.singleProduct.name,
        description: this.singleProduct.description,
        price: this.singleProduct.price,
        quantity: this.singleProduct.quantity,
        store: this.singleProduct.store,
      });
    } else {
      this.productForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),
        imgs: new FormControl(null, Validators.required),
        quantity: new FormControl(null, Validators.required),
        store: new FormControl(null, Validators.required),
      });
    }
  }


  getProductById(id): void {
    this.editProductService.getById(id).subscribe(data => {
      this.singleProduct = data.product;
    });
  }

  getAllProducts(): void {
    this.editProductService.getAll().subscribe(data => {
      this.allProducts = data.products;
    });
  }

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files;
    const name = (event.target as HTMLInputElement).name;
    for (let i = 0; i < file.length; i++) {
      this.postData.append('imgs', file[i], name);
    }

  }

  addProduct(): void {

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
    this.productForm.reset();
    this.editProductService.addOne(this.postData).subscribe((data) => {
      console.log(data);
    });

  }

  editProduct(id): void {
    for (const field in this.productForm.controls) {
      const control = this.productForm.get(field);
      if (control.value) {
        // console.log('exist: ' + field);
        // console.log(control.value);
        // console.log('--------');
        this.postData.append(field, control.value);
      } else {
        // console.log('doesnt exits: ' + field);
        // console.log(control.value);
        // console.log('--------');
        if (field === 'ids') {
          this.postData.append(field, id);
        } else if (field in ['imgs']) {
          this.postData.append(field, '', field);
        } else {
          this.postData.append(field, '');
        }

      }
    }
    // this.productForm.reset();
    this.editProductService.edit(this.postData).subscribe((data) => {
      console.log(data);
    });
  }

  onSubmit(): void {
      if (this.edit) {
        this.editProduct(this.productId);
      } else {
        this.addProduct();
      }
    }
  }
