import { TestBed } from '@angular/core/testing';

import { ProspectosService } from './prospectos.service';

describe('ProspectosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProspectosService = TestBed.get(ProspectosService);
    expect(service).toBeTruthy();
  });
});
