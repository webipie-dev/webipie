import {Component, OnInit} from '@angular/core';
import {ClientDetailComponent} from './client-detail/client-detail.component';
import {Product} from '../../../_shared/models/product.model';
import {HttpClient} from '@angular/common/http';
import {EditProductService} from '../../../_shared/services/edit-product.service';
import {ClientService} from '../../../_shared/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  settings = {
    columns: {
      firstname: {
        title: 'Name',
        width: '15%'
      },
      email: {
        title: 'Email',
        width: '20%'
      },
      phoneNumber: {
        title: 'Phone Number',
        width: '10%'
      },
    },
    actions: false,
    noDataMessage: 'Oups, no Data yet !'
  };
  settingsMobile = {
    columns: {
      name: {
        title: 'Name',
        width: '50%'
      },
      details: {
        title: '',
        width: '50%',
        type: 'custom',
        valuePrepareFunction: (cell, row) => {
          return row.columnName;
        },
        renderComponent: ClientDetailComponent,
      }
    },
    actions: false,
    noDataMessage: 'Oups, no Data yet !'
  };

  // data = [
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //     details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
  //
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   },
  //   {
  //     name: 'Leanne Graham',
  //     email: 'nour@gmail.com',
  //     phoneNumber: '24681998',
  //   }
  // ];

  clients: Product[] = [];


  constructor(private http: HttpClient,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients(): void {
    this.clientService.getAll().subscribe((data) => {
      console.log(data.clients);
      this.clients = data.clients;
    });
  }

}
