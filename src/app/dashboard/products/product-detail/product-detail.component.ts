import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../../../_shared/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  elements;
  // it contains row elements
  public rowData: any;
  windowWidth = window.screen.width;
  newVal = {
    id: ''
  };
  closeResult;

  constructor(private router: Router,
              private modalService: NgbModal,
              private productService: ProductService) { }

  ngOnInit(): void {
  }

  onEditSelect(): void {
    document.getElementById('close-modal').click();
    this.router.navigate(['dashboard', 'product-edit'], { queryParams: {id: this.rowData.id} });
  }

  onDelete(): void{
    document.getElementById('close-modal').click();

    this.productService.deleteModal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.productService.deleteMany({ids: [this.rowData.id]}).subscribe(data => {
          this.productService.deleteModal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['dashboard/products']);
          });
        });


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.productService.deleteModal.fire(
          'Cancelled',
          'Deletion Canceled :)',
          'error'
        );
      }
    });

  }

  open(content): void {
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
