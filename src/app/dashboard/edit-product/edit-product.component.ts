import {Component, HostListener, OnInit} from '@angular/core';
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
  deletePhotos = false;
  addIconDelete = false;
  public windwosWidth = window.innerWidth;


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
    });

  }


  getProductById(id): void {
    this.editProductService.getById(id).subscribe(data => {
      this.singleProduct = data;
      this.singleProduct.imgs.forEach((elt) => {
        this.imageObject.push({
          image: elt,
          thumbImage: elt,
        });
      });
    });
  }

  getAllProducts(): void {
    // this.editProductService.getAll().subscribe(data => {
    //   this.allProducts = data.products;
    // });
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

  addProduct(): void {

    // tslint:disable-next-line:forin
    for (const field in this.productForm.controls) {
      const control = this.productForm.get(field);
      if (control.value) {
        if (field === 'store') {
          this.postData.append('storeId', control.value);
        } else {
          this.postData.append(field, control.value);
        }
      } else {
        if ((field !== 'imgs')) {
          this.postData.append(field, '');
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
      const control = this.productForm.get(field);
      if (control.value) {
        if (field === 'store') {
          this.postData.append('storeId', control.value);
        } else {
          this.postData.append(field, control.value);
        }
      } else {
        if (field !== 'imgs') {
          this.postData.append(field, '');
        }
      }
    }
    this.editProductService.edit(id, this.postData).subscribe((data) => {
      this.router.navigate(['dashboard/products']);
    });
  }

  onSubmit(): void {
    if (this.edit) {
      this.editProduct(this.productId);
    } else {
      this.addProduct();
    }
  }
  deletePhotoOpen(): void {
    const images = document.getElementsByClassName('image');
    const imagesArray = Array.from(images);
    if (!this.addIconDelete) {
      imagesArray.forEach((item, i) => {
        console.log(item);
        const template = document.createElement('div');
        const htmlString = `<i id='delete-${i}' class="fas fa-minus-circle fa-3x mt-2 ml-2"
                            style="color: #ffffff; position: relative;"></i>`;
        template.innerHTML = htmlString.trim();
        item.parentNode.appendChild(template);
        console.log(item);
      });
    }
    this.addIconDelete = true;
    console.log(images);
    this.deletePhotos = true;
  }

  deletePhotoClose(): void {
    this.addIconDelete = false;
    this.deletePhotos = false;
    const images = document.getElementsByClassName('image');
    const imagesArray = Array.from(images);
    for (let i = 0 ; i < imagesArray.length ; i++) {
      document.getElementById('delete-' + i).remove();
    }

  }

  deletePhoto(e): void {
    const images = document.getElementsByClassName('image');
    const imagesArray = Array.from(images);
    if (imagesArray.length === 1 ) {
      console.log('hhhhhhhhhhhhhhhhhh');
    } else {
      this.imageObject.splice(e, 1);

    }
    console.log(this.imageObject);
    console.log(e);
    console.log(this.imageObject);
    this.deletePhotoClose();
  }



  @HostListener('window:resize') windwosResize() {
    this.windwosWidth = window.innerWidth;
  }

  clickAddPhotos() {
    document.getElementById('hiddenImageInput').click();
  }
}
