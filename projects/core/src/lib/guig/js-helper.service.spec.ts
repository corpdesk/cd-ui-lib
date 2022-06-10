import { TestBed } from '@angular/core/testing';

import { JsHelperService } from './js-helper.service';

describe('JsHelperService', () => {
  let service: JsHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
