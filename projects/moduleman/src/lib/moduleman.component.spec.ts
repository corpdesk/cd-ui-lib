import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulemanComponent } from './moduleman.component';

describe('ModulemanComponent', () => {
  let component: ModulemanComponent;
  let fixture: ComponentFixture<ModulemanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulemanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulemanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
