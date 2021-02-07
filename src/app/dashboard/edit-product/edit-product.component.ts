import {Component, OnInit} from '@angular/core';
import {Product} from '../../_shared/models/product.model';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EditProductService} from '../../_shared/services/edit-product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {createLogErrorHandler} from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  // array to store the images of the product
  imageObject: Array<object> = [];
  productForm: FormGroup;
  postData = new FormData();
  singleProduct: Product = new Product();
  allProducts: Product[] = [];
  edit = false;
  productId = '';
  url;
  msg = '';
  isChecked = true;
  isPopular = false;

  constructor(private http: HttpClient,
              private editProductService: EditProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    // check if we're in the edit or add product page
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.productId = params.id;
        this.edit = true;
      }
    });
    // if we're in the edit page
    if (this.edit) {
      this.getProductById(this.productId);
    }
    this.productForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      imgs: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      store: new FormControl(null, Validators.required),
      openReview: new FormControl(null, Validators.required),
      popular: new FormControl(null, Validators.required)
    });

  }


  getProductById(id): void {
    this.editProductService.getById(id).subscribe(data => {
      this.singleProduct = data;
      this.isChecked = data.openReview;
      this.isPopular = data.popular;
      this.singleProduct.imgs.forEach((elt) => {
        this.imageObject.push({
          image: elt,
          thumbImage: elt,
        });
      });
    });
  }

  // adding images to the postForm and displaying them
  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files;
    Object.keys(file).forEach((item) => {
      const reader = new FileReader();
      reader.readAsDataURL(file[item]);

      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.msg = '';
        this.url = reader.result;

        this.imageObject.push({image: this.url, thumbImage: this.url});
      };
    });

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < file.length; i++) {
      this.postData.append('imgs', file[i], file[i].name);
    }
  }

  onImageDelete(event): void {
    console.log(event.target.src);
  }

  onReviews(event): void {
    this.isChecked = event.target.checked;
  }

  onPopular(event): void {
    this.isPopular = event.target.checked;
  }

  addProduct(): void {

    // tslint:disable-next-line:forin
    for (const field in this.productForm.controls) {
      if (field !== 'openReview' && field !== 'popular') {
        const control = this.productForm.get(field);
        if (control.value) {
          this.postData.append(field, control.value);
        } else {
          if (field !== 'imgs' && field !== 'store') {
            this.postData.append(field, '');
          }
        }
      }
    }
    this.productForm.reset();
    this.editProductService.addOne(this.postData).subscribe((data) => {
      this.router.navigate(['dashboard/products']);
    });
  }

  editProduct(id): void {
    // tslint:disable-next-line:forin
    for (const field in this.productForm.controls) {
      if (field !== 'openReview' && field !== 'popular') {
        const control = this.productForm.get(field);
        if (control.value) {
          this.postData.append(field, control.value);
        } else {
          if (field !== 'imgs' && field !== 'store') {
            this.postData.append(field, '');
          }
        }
      }
    }
    this.editProductService.edit(id, this.postData).subscribe(() => {
      this.router.navigate(['dashboard/products']);
    });
  }

  onSubmit(): void {
    const currentStore = JSON.parse(localStorage.getItem('currentStore'))._id;
    this.postData.append('storeId', currentStore);
    this.postData.append('openReview', this.isChecked.toString());
    this.postData.append('popular', this.isPopular.toString());

    if (this.edit) {
      this.editProduct(this.productId);
    } else {
      this.addProduct();
    }
    this.postData = new FormData();
  }
}
