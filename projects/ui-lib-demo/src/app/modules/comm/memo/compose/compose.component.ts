import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { first, map, delay } from 'rxjs/operators';

enum Menus {
  menuA = 'menuA',
  menuB = 'menuB'
}

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getMenu$(Menus.menuA).subscribe(data => {
      console.log(data);
    });
    this.getMenu$(Menus.menuB).subscribe(data => {
      console.log(data);
    });
  }

  menuA(): { [key: string]: any }[] {
    return [
      {
        a: 'demo1',
        b: 'demo2',
        c: 'demo3'
      },
      {
        e: 'demo4',
        f: 'demo5',
        g: 'demo6'
      }
    ];
  }

  // example of menu fetched from different source eg: db
  menuB(): Observable<{ [key: string]: any }[]> {
    return of([
      {
        a: 'demo1',
        b: 'demo2',
        c: 'demo3'
      }
    ]).pipe(delay(500));
  }

  getMenu$(context: Menus): Observable<{ [key: string]: any }[]> {
    return forkJoin([of(this.menuA()), this.menuB().pipe(first())]).pipe(
      map(([menuA, menuB]) => ({ menuA, menuB })),
      map(m => m[context])
    );
  }

  getMenu2$(context: string): Observable<any> {
    return forkJoin({
      a: of(this.menuA()),
      b: this.menuB()
    })
      .pipe(
        map((m) => m.b)
      );
  }

}
