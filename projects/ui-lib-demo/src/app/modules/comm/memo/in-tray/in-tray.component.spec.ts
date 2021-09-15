import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InTrayComponent } from './in-tray.component';

describe('InTrayComponent', () => {
  let component: InTrayComponent;
  let fixture: ComponentFixture<InTrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InTrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
