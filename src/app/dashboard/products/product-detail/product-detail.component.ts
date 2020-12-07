import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../../../_shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // public value;
  @Input() value: any;
  elements;
  // it contains row elements
  public rowData: any;
  editMode = false;
  displayMode = !this.editMode;
  windowWidth = window.screen.width;
  newVal = {
    _id: ''
  };
  closeResult;

  constructor(private router: Router,
              private modalService: NgbModal,
              private productService: ProductService) { }

  ngOnInit(): void {
  }

  onEditSelect() {
    document.getElementById('close-modal').click();
    this.router.navigate(['dashboard', 'product-edit'], { queryParams: {id: this.rowData._id} });
  }

  onDelete(){
    document.getElementById('close-modal').click();
    this.productService.deleteMany([this.rowData._id]).subscribe(data => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['dashboard/products']);
      });
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
