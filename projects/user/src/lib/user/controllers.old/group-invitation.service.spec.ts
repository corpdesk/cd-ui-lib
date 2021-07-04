import { TestBed } from '@angular/core/testing';

import { GroupInvitationService } from './group-invitation.service';

describe('GroupInvitationService', () => {
  let service: GroupInvitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupInvitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
