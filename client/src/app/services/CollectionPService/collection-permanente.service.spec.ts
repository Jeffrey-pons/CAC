import { TestBed } from '@angular/core/testing';

import { CollectionPermanenteService } from './collection-permanente.service';

describe('CollectionPermanenteService', () => {
  let service: CollectionPermanenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionPermanenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
