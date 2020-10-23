import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  settings = {
    columns: {
      name: {
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
  };
  settingsMobile = {
    columns: {
      name: {
        title: 'Name',
        width: '50%'
      },
      details: {
        title: '',
        type: 'html',
        width: '50%'
      }
    },
    actions: false,
  };

  data = [
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
      details: '<a href="#" class="button-generic button-white-border-blue detail-button">Details</a>'

    }

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
