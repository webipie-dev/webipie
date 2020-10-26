import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];
  data2 = [
    {
      name: "Germany",
      value: 40632,
      extra: {
        code: "de"
      }
    },
    {
      name: "Germany",
      value: 40632,
      extra: {
        code: "de"
      }
    },
    {
      name: "Germany",
      value: 40632,
      extra: {
        code: "de"
      }
    },
    {
      name: "Germany",
      value: 40632,
      extra: {
        code: "de"
      }
    },
  ]

}
