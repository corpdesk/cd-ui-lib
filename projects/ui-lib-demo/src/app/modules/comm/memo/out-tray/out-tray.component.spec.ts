import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutTrayComponent } from './out-tray.component';

describe('OutTrayComponent', () => {
  let component: OutTrayComponent;
  let fixture: ComponentFixture<OutTrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutTrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
