import { TestBed } from '@angular/core/testing';

import { ConsumerResourceService } from './consumer-resource.service';

describe('ConsumerResourceService', () => {
  let service: ConsumerResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumerResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
