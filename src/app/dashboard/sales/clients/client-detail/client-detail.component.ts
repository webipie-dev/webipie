import {Component, Input, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  @Input() value; // value passed by valuePrepareFunction in settings of ng2 smart table
  public rowData: any; // data of the particular row
  windowWidth = window.screen.width;
  newVal = {
    id: ''
  };
  closeResult;
  fullAddress = '';

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {

  }

  open(content): void {
    // tslint:disable-next-line:forin
    for (const key in this.rowData.fullAddress) {
      if (key !== 'id'){
        this.fullAddress += this.rowData.fullAddress[key];
      }
    }
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
