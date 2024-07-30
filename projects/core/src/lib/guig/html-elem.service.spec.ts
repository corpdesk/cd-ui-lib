import { TestBed } from '@angular/core/testing';

import { HtmlElemService } from './html-elem.service';

describe('HtmlElemService', () => {
  let service: HtmlElemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlElemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
