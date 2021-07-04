import { TestBed } from '@angular/core/testing';

import { CdObjService } from './cd-obj.service';

describe('CdObjService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CdObjService = TestBed.get(CdObjService);
    expect(service).toBeTruthy();
  });
});
