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
  clients: Client[] = [];
  storeId = '5fe9aa02155d77328c78ae70';


  constructor(private http: HttpClient,
              private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.getAllClients(this.storeId);
  }

  getAllClients(store): void {
    this.clientService.getAll({store}).subscribe((data) => {
      this.clients = data;
    });
  }
}
