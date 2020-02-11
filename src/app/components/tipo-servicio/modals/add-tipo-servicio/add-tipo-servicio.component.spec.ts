import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipoServicioComponent } from './add-tipo-servicio.component';

describe('AddTipoServicioComponent', () => {
  let component: AddTipoServicioComponent;
  let fixture: ComponentFixture<AddTipoServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTipoServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTipoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
