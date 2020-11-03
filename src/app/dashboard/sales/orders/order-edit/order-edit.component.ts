import {Component, Input, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../../../../_shared/models/product.model';
import {ProductService} from '../../../../_shared/services/product.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {

  elements;
  // it contains row elements
  @Input() value;
  public rowData: any;
  windowWidth = window.screen.width;
  orderProductsIds = [];
  orderProducts: Product[] = [];
  newVal = {
    _id: ''
  };
  closeResult;


  constructor(private modalService: NgbModal,
              private prodcutService: ProductService,
              ) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log(this.rowData);
    this.orderProductsIds = this.rowData.products.map(s => s._id);
    this.prodcutService.getMany(this.orderProductsIds).subscribe((data) => {
      this.orderProducts = data.product;
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
