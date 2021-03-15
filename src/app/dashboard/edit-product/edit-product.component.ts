import {Component, HostListener, OnInit} from '@angular/core';
import {Product} from '../../_shared/models/product.model';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EditProductService} from '../../_shared/services/edit-product.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Route, Router} from '@angular/router';
import uniqueSlug from 'unique-slug';


import {createLogErrorHandler} from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';
import {encryptLocalStorage} from '../../_shared/utils/encrypt-storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  // array to store the images of the product
  imageObject: Array<{ image: string, thumbImage: string }> = [];
  imageObjectToShow: Array<any> = [];
  productForm: FormGroup;
  postData = new FormData();
  singleProduct: Product = new Product();
  allProducts: Product[] = [];
  deletedImages = [];
  savedImages = {};
  edit = false;
  productId = '';
  url;
  msg = '';
  initialQuantity;

  isChecked = true;
  isPopular = false;

  deletePhotos = false;
  addIconDelete = false;
  public windwosWidth = window.innerWidth;

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

      [{list: 'ordered'}, {list: 'bullet'}],
      [{indent: '-1'}, {indent: '+1'}],          // outdent/indent

      [{size: ['small', false, 'large', 'huge']}],  // custom dropdown

      [{color: []}, {background: []}],          // dropdown with defaults from theme


    ]
  };


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
      popular: new FormControl(null, Validators.required),
      status: new FormControl('disponible', Validators.required)
    });

  }

  // tslint:disable-next-line:typedef
  get productFormControl() {
    return this.productForm.controls;
  }

  divideImageObject(): void {
    const imageCopy = this.imageObject.slice();
    this.imageObjectToShow = new Array(Math.ceil(imageCopy.length / 3))
      .fill(imageCopy)
      .map(() => imageCopy.splice(0, 3));
  }


  getProductById(id): void {
    this.editProductService.getById(id).subscribe(data => {
      if (data.quantity <= 0) {
        data.quantity = 0;
      }
      this.singleProduct = data;
      this.isChecked = data.openReview;
      this.isPopular = data.popular;
      this.initialQuantity = data.quantity;
      this.singleProduct.imgs.forEach((elt) => {
        this.imageObject.push({
          image: elt,
          thumbImage: elt,
        });
      });
      this.divideImageObject();
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
        this.divideImageObject();
        this.savedImages[this.url] = file[item];

      };
    });

  }

  onReviews(event): void {
    this.isChecked = event.target.checked;
  }

  onPopular(event): void {
    this.isPopular = event.target.checked;
  }

  addProduct(): void {
    // add the images to postdata
    for (const [key, value] of Object.entries(this.savedImages)) {
      // @ts-ignore
      this.postData.append('imgs', value, uniqueSlug() + value.name);
    }

    // tslint:disable-next-line:forin
    for (const field in this.productForm.controls) {
      if (field !== 'openReview' && field !== 'popular') {
        const control = this.productForm.get(field);
        if (control.value || control.value === 0) {
          console.log(field, control.value);
          this.postData.append(field, control.value);
        } else {
          if (field !== 'imgs' && field !== 'store') {
            this.postData.append(field, '');
          }
        }
      }
    }
    // this.productForm.reset();
    this.editProductService.addOne(this.postData).subscribe((data) => {
      this.router.navigate(['dashboard/products']);
    });
  }

  editProduct(id): void {
    // tslint:disable-next-line:forin

    for (const field in this.productForm.controls) {
      if (field !== 'openReview' && field !== 'popular' && field !== 'status') {
        const control = this.productForm.get(field);
        if (control.value || control.value === 0) {
          console.log(field, control.value);
          this.postData.append(field, control.value);
        } else {
          if (field !== 'imgs' && field !== 'store') {
            this.postData.append(field, '');
          }
        }
      }
    }

    this.postData.append('deletedImages', JSON.stringify(this.deletedImages));

    // change status to disponible if quantity > 0
    if (this.initialQuantity === 0 && this.postData.get('quantity') !== '0' && this.productForm.get('status').value === 'out of stock') {
      Swal.fire({
        title: 'Product status is changed to Disponible',
        text: 'Check product status',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Okay, got it'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Done!',
            'Your product has been updated.',
            'success'
          );
        }
      });
    } else {

      this.postData.set('status', this.productForm.get('status').value);
      this.editProductService.edit(id, this.postData).subscribe(() => {
        this.router.navigate(['dashboard/products']);
      });

    }

    this.postData.set('status', 'disponible');
    this.editProductService.edit(id, this.postData).subscribe(() => {
      this.router.navigate(['dashboard/products']);
    });

  }

  onSubmit(): void {
    const currentStore = encryptLocalStorage.decryptString(localStorage.getItem('storeID'));
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

  deletePhotoOpen(): void {
    const images = document.getElementsByClassName('image');
    const imagesArray = Array.from(images);
    if (!this.addIconDelete) {
      imagesArray.forEach((item, i) => {
        const template = document.createElement('div');
        const htmlString = `<i id='delete-${i}' class="fas fa-minus-circle fa-3x mt-2 ml-2"
                            style="color: #ffffff; position: relative;"/>`;
        template.innerHTML = htmlString.trim();
        item.parentNode.appendChild(template);
      });
    }
    this.addIconDelete = true;
    this.deletePhotos = true;
  }

  deletePhotoClose(): void {
    this.addIconDelete = false;
    this.deletePhotos = false;
    const images = document.getElementsByClassName('image');
    const imagesArray = Array.from(images);
    for (let i = 0; i < imagesArray.length; i++) {
      document.getElementById('delete-' + i).remove();
    }

  }

  deletePhoto(i): void {
    // if edit product
    this.deletedImages.push(this.imageObject[i].image);
    this.imageObject.splice(i, 1);
    this.divideImageObject();
    // if add product
    delete this.savedImages[this.imageObject[i].image];
  }


  @HostListener('window:resize') windwosResize(): void {
    this.windwosWidth = window.innerWidth;
  }

  clickAddPhotos(): void {
    document.getElementById('hiddenImageInput').click();
  }
}
