import { Component, OnInit } from '@angular/core';
// import { NazComponent } from 'projects/naz/src/public-api';

const transactions2 = {
  fields: [
    { title: 'Order ID', name: 'orderid', type: 'string'},
    { title: 'Date', name: 'date', type: 'string' },
    { title: 'Billing Name', name: 'billingname', type: 'string' },
    { title: 'Total', name: 'total', type: 'string' },
    { title: 'Payment Status', name: 'paymentstatus', type: 'status' },
    { title: 'Action', name: 'action', type: 'action' }
  ],
  data: [
    {
      orderid: '#NZ1563',
      date: '28 Mar, 2020',
      billingname: 'Frank Dean',
      total: '$164',
      paymentstatus: {value: 'Unpaid', class: 'badge-soft-warning'},
      action: '',
    },
    {
      orderid: '#NZ1564',
      date: '28 Mar, 2020',
      billingname: 'Eddy Torres',
      total: '$141',
      paymentstatus: {value: 'Paid', class: 'badge-soft-success'},
      action: '',
    },
    {
      orderid: '#NZ1565',
      date: '29 Mar, 2020',
      billingname: 'Jamison Clark',
      total: '$123',
      paymentstatus: {value: 'Paid', class: 'badge-soft-success'},
      action: '',
    },
    {
      orderid: '#NZ1566',
      date: '30 Mar, 2020',
      billingname: 'Jewel Buckley',
      total: '$112',
      paymentstatus: {value: 'Paid', class: 'badge-soft-success'},
      action: '',
    },
    {
      orderid: '#NZ1567',
      date: '31 Mar, 2020',
      billingname: 'Jeffrey Waltz',
      total: '$105',
      paymentstatus: {value: 'Unpaid', class: 'badge-soft-warning'},
      action: '',
    },
    {
      orderid: '#NZ1568',
      date: '01 Apr, 2020',
      billingname: 'Jefferson Allen',
      total: '$160',
      paymentstatus: {value: 'Chargeback',class: 'badge-soft-danger'},
      action: '',
    }
  ]
};

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  dSource;
  constructor() { 
    this.dSource = transactions2;
  }

  ngOnInit(): void {
  }

}
