import {Component, OnInit} from '@angular/core';
import {ClientDetailComponent} from './client-detail/client-detail.component';
import {Client} from '../../../_shared/models/client.model';
import {HttpClient} from '@angular/common/http';
import {EditProductService} from '../../../_shared/services/edit-product.service';
import {ClientService} from '../../../_shared/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  // settings for the web version of the table
  settings = {
    columns: {
      firstname: {
        title: 'Name',
        width: '15%'
      },
      fullAddress: {
        title: 'Address',
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
  // settings for the mobile & tablet version of the table
  settingsMobile = {
    columns: {
      firstname: {
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
  clients = [];


  constructor(private http: HttpClient,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients(): void {
    this.clientService.getAll().subscribe((data) => {
      let aux;
      data.forEach((element) => {
        let fullAddress = '';
        for (const key in element.fullAddress) {
          if (key !== '_id'){
            fullAddress += ' ' + element.fullAddress[key];
          }

        }
        aux = element;
        aux.fullAddress = fullAddress.trim();
        this.clients.push(aux);
      });
    });
  }
}
