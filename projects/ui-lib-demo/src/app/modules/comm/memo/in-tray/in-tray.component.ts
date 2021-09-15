import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-in-tray',
  templateUrl: './in-tray.component.html',
  styleUrls: ['./in-tray.component.scss']
})
export class InTrayComponent implements OnInit {
  token: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .filter(params => params.order)
      .subscribe(params => {
        console.log('InTrayComponent::params:', params);
        this.token = params.token;
        console.log(this.token);
      }
      );
  }

}
