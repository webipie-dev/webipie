import {Component, HostListener, OnInit} from '@angular/core';
import {Product} from '../../_shared/models/product.model';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {EditProductService} from '../../_shared/services/edit-product.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {encryptLocalStorage} from '../../_shared/utils/encrypt-storage';
import Swal from 'sweetalert2';
import {StoreService} from '../../_shared/services/store.service';
import {Store} from '../../_shared/models/store.model';
import {UploadService} from '../../_shared/services/upload.service';
import {imagesBucket} from 'src/app/configuration'

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
  postData = {
    name: '',
    description: '',
    price: 0,
    imgs: [],
    quantity: 0,
    storeId: '',
    openReview: true,
    popular: false,
    status: '',
    deletedImages: []
  };
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
  editAddPage = 'Add';

  deletePhotos = false;
  public windwosWidth = window.innerWidth;

  uploadConfig;
  imagesToUpload = [];
  progressBar = 0;
  storeId = encryptLocalStorage.decryptString(localStorage.getItem('storeID'));
  store: Store;

  config = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{list: 'ordered'}, {list: 'bullet'}],
      [{indent: '-1'}, {indent: '+1'}],          // outdent/indent
      [{size: ['small', false, 'large', 'huge']}],  // custom dropdown
      [{color: []}, {background: []}],          // dropdown with defaults from theme
    ]
  };

  imagesTouched = false;

  // wait for the images to upload on AWS, before submitting the form
  loading = false;

  constructor(private http: HttpClient,
              private editProductService: EditProductService,
              private uploadService: UploadService,
              private storeService: StoreService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.storeService.getById(this.storeId).subscribe((data) => {
      this.store = data;
    });

    // check if we're in the edit or add product page
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.productId = params.id;
        this.edit = true;
        this.editAddPage = 'Edit';
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

  get productFormControl(): {[p: string]: AbstractControl} {
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

  clickAddPhotos(): void {
    this.imagesTouched = true;
    document.getElementById('hiddenImageInput').click();
  }

  async onImagePicked(event: Event): Promise<any> {
    const file = (event.target as HTMLInputElement).files;
    const files = [];
    for (const item of Object.keys(file)) {
      // Check the image type
      const check = this.uploadService.imageCheckType(file[item].type);
      // If check passed
      if (check) {
        const reader = new FileReader();
        reader.readAsDataURL(file[item]);
        const fileObject = {file: {}, url: ''};
        // tslint:disable-next-line:variable-name
        reader.onload = async (_event) => {
          this.msg = '';
          this.url = reader.result;
          this.imageObject.push({image: this.url, thumbImage: this.url});
          fileObject.url = this.url;
          this.divideImageObject();
        };
        fileObject.file = file[item];
        files.push(fileObject);
      }
    }
    for (const elt of files) {
      this.uploadConfig = await this.uploadService.signedUrl(this.store, elt.file.type);
      this.loading = true;
      document.getElementById('myCheck').click();
      await this.uploadService.upload(this.uploadConfig.url, elt.file);
      this.savedImages[elt.url] = this.uploadConfig.key;
    }
    this.loading = false;
    document.getElementById('myCheck').click();
  }

  onReviews(event): void {
    this.isChecked = event.target.checked;
  }

  onPopular(event): void {
    this.isPopular = event.target.checked;
  }

  addProduct(): void {
    this.imagesToUpload = [];

    // add the images to postdata
    for (const [key, value] of Object.entries(this.savedImages)) {
      this.imagesToUpload.push(imagesBucket + value);
    }

    for (const field in this.productForm.controls) {
      if (field !== 'openReview' && field !== 'popular') {
        const control = this.productForm.get(field);
        if (control.value || control.value === 0) {
          this.postData[field] = control.value;
        } else {
          if (field !== 'imgs' && field !== 'store') {
            this.postData[field] = '';
          }
        }
      }
    }
    this.postData.imgs = this.imagesToUpload;
    this.editProductService.addOne(this.postData).subscribe((data) => {
      this.router.navigate(['dashboard/products']);
    });
  }

  editProduct(id): void {
    for (const [key, value] of Object.entries(this.savedImages)) {
      this.imagesToUpload.push(imagesBucket + value);
    }

    for (const field in this.productForm.controls) {
      if (field !== 'openReview' && field !== 'popular' && field !== 'status') {
        const control = this.productForm.get(field);
        if (control.value || control.value === 0) {
          this.postData[field] = control.value;
        } else {
          if (field !== 'imgs' && field !== 'store') {
            this.postData[field] = '';
          }
        }
      }
    }

    this.postData.imgs = this.imagesToUpload;
    this.postData.deletedImages = this.deletedImages;

    // change status to disponible if quantity > 0
    if (this.initialQuantity === 0 && this.postData.quantity !== 0 && this.productForm.status === 'out of stock') {
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

      this.postData.status = this.productForm.get('status').value;
      this.editProductService.edit(id, this.postData).subscribe(() => {
        this.router.navigate(['dashboard/products']);
      });

    }

    this.postData.status = 'disponible';
    this.editProductService.edit(id, this.postData).subscribe(() => {
      this.router.navigate(['dashboard/products']);
    });

  }

  onSubmit(): void {
    this.postData.storeId = this.storeId;

    this.postData.openReview = this.isChecked;
    this.postData.popular = this.isPopular;

    if (this.edit) {
      this.editProduct(this.productId);
    } else {
      this.addProduct();
    }
    this.progressBar = 0;
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
}
