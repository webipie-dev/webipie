import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  clicked() {
    console.log('heeeyyy');
    console.log(this.value);
  }

  onEditSelect() {
    console.log('clicked');
    document.getElementById("close-modal").click();
    this.router.navigate(['dashboard', 'product-edit'], { queryParams: {id: '5f93ffc994a31e4b6cb602dc'} });
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
