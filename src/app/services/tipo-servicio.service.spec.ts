import { TestBed } from '@angular/core/testing';

import { TipoServicioService } from './tipo-servicio.service';

describe('TipoServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoServicioService = TestBed.get(TipoServicioService);
    expect(service).toBeTruthy();
  });
});
