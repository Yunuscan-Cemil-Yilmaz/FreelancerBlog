import { TestBed } from '@angular/core/testing';

import { InteractionRequests } from './interaction-requests';

describe('InteractionRequests', () => {
  let service: InteractionRequests;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteractionRequests);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
