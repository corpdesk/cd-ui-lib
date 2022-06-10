import { TestBed } from '@angular/core/testing';

import { CommconversationService } from './commconversation.service';

describe('CommconversationService', () => {
  let service: CommconversationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommconversationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
