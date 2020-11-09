import {Component, OnInit} from '@angular/core';
import {Product} from '../../_shared/models/product.model';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EditProductService} from '../../_shared/services/edit-product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Route} from '@angular/router';
import {createLogErrorHandler} from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  imageObject: Array<object> = [];

  productForm: FormGroup;
  postData = new FormData();
  singleProduct: Product = new Product();
  allProducts: Product[] = [];
  edit = false;
  productId = '';
  url;
  msg = '';

  constructor(private http: HttpClient,
              private editProductService: EditProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.productId = params.id;
        this.edit = true;
      }
    });
    if (this.edit) {
      this.productForm = new FormGroup({
        ids: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        imgs: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
        store: new FormControl('', Validators.required),
      });
      this.getProductById(this.productId);
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
      console.log(data.product);
      this.singleProduct = data.product;
      this.singleProduct.imgs.forEach((elt) => {
        this.imageObject.push({
          image: elt,
          thumbImage: elt,
        });
      });
    });
  }

  getAllProducts(): void {
    this.editProductService.getAll().subscribe(data => {
      this.allProducts = data.products;
    });
  }

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files;
    console.log(file[0]);
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
      console.log(reader.result);

      this.imageObject.push({ image : this.url , thumbImage : this.url})
      // console.log(this.imageObject)
    }

    for (let i = 0; i < file.length; i++) {
      this.postData.append('imgs', file[i], file[i].name);
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
      } else {
        // console.log('doesnt exist: ' + field);
        // console.log(control.value);
        // console.log('--------');
        if ((field !== 'imgs')) {
          this.postData.append(field, '');
        }


      }
    }
    this.productForm.reset();
    // this.postData.forEach((value, key) => {
    //   console.log(key + ' ' + value);
    // });
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
        } else if (field !== 'imgs') {
          this.postData.append(field, '');
        }

      }
    }
    this.productForm.reset();
    // console.log(this.postData.get('imgs'));
    // this.postData.forEach((value, key) => {
    //   console.log(key + ' ' + value);
    // });
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
