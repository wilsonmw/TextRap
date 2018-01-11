import { TestBed, inject } from '@angular/core/testing';

import { RapService } from './rap.service';

describe('RapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RapService]
    });
  });

  it('should be created', inject([RapService], (service: RapService) => {
    expect(service).toBeTruthy();
  }));
});
