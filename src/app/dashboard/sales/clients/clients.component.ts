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

  data = [
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    },
    {
      name: "Leanne Graham",
      email: "nour@gmail.com",
      phoneNumber: "24681998",
    }

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
