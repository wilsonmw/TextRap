import { TestBed, inject } from '@angular/core/testing';

import { CollabService } from './collab.service';

describe('CollabService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollabService]
    });
  });

  it('should be created', inject([CollabService], (service: CollabService) => {
    expect(service).toBeTruthy();
  }));
});
