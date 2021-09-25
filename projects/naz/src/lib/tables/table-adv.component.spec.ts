import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAdvComponent } from './table-adv.component';

describe('PagetitleComponent', () => {
  let component: TableAdvComponent;
  let fixture: ComponentFixture<TableAdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
