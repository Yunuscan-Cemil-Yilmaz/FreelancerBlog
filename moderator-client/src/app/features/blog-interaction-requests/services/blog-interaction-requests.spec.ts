import { TestBed } from '@angular/core/testing';

import { BlogInteractionRequests } from './blog-interaction-requests';

describe('BlogInteractionRequests', () => {
  let service: BlogInteractionRequests;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogInteractionRequests);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
