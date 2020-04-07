import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCotizacionComponent } from './edit-cotizacion.component';

describe('EditCotizacionComponent', () => {
  let component: EditCotizacionComponent;
  let fixture: ComponentFixture<EditCotizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCotizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
