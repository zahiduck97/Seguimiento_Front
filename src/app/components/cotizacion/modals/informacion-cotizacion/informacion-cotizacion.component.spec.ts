import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionCotizacionComponent } from './informacion-cotizacion.component';

describe('InformacionCotizacionComponent', () => {
  let component: InformacionCotizacionComponent;
  let fixture: ComponentFixture<InformacionCotizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionCotizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
