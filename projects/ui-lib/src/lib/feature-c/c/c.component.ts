import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cd-c',
  templateUrl: './c.component.html',
  styleUrls: ['./c.component.css'],
})
export class CComponent implements OnInit {
  @Input() breadcrumbItems: any;
  @Input() title: string = '';
  constructor() {}

  ngOnInit(): void {}
}
