import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { TData, Transaction } from 'src/app/pages/dashboard/dashboard.model';

const transactions = {
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
  selector: 'naz-table-adv',
  templateUrl: './table-adv.component.html',
  styleUrls: ['./table-adv.component.scss']
})
export class TableAdvComponent implements OnInit {
  @Input() dSource: any;
  tData: any;
  tFields: any;
  term: any;
  stringField = (f:any) => f.type === 'string';
  booleanField = (f:any) => f.type === 'boolean';
  actionField = (f:any) => f.type === 'action';
  statusField = (f:any) => f.type === 'status';
  // @Input() breadcrumbItems;
  // @Input() title: string;

  constructor() { 

  }

  ngOnInit(): void {
    this.tData = this.dSource.data;
    this.tFields = this.dSource.fields;
  }

  
}
