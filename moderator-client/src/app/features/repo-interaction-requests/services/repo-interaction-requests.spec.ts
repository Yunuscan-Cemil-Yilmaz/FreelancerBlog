import { TestBed } from '@angular/core/testing';

import { RepoInteractionRequests } from './repo-interaction-requests';

describe('RepoInteractionRequests', () => {
  let service: RepoInteractionRequests;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepoInteractionRequests);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
