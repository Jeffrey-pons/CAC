import { TestBed } from '@angular/core/testing';

import { NextExpoServiceService } from './next-expo-service.service';

describe('NextExpoServiceService', () => {
  let service: NextExpoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextExpoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
