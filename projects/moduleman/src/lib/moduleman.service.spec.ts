import { TestBed } from '@angular/core/testing';

import { ModulemanService } from './moduleman.service';

describe('ModulemanService', () => {
  let service: ModulemanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModulemanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
