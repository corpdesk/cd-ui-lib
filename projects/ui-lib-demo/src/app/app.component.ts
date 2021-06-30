import { Component, Input } from '@angular/core';
import { CService } from '@corpdesk/ui-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // @Input() breadcrumbItems: any;
  // @Input() title: string = '';
  title = 'Demo';
  // bread crumb items
  breadCrumbItems: Array<{}> = [];
  constructor(private svC: CService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'comm' }, { label: 'memo-compose' + this.svC.cAdd(3, 4), active: true }];
  }
}
