import { TestBed } from '@angular/core/testing';

import { NormasService } from './normas.service';

describe('NormasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NormasService = TestBed.get(NormasService);
    expect(service).toBeTruthy();
  });
});
