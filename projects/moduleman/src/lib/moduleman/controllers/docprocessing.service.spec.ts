import { TestBed } from '@angular/core/testing';

import { DocprocessingService } from './docprocessing.service';

describe('DocprocessingService', () => {
  let service: DocprocessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocprocessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
