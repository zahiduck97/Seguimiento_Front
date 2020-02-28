import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipoServicioComponent } from './edit-tipo-servicio.component';

describe('EditTipoServicioComponent', () => {
  let component: EditTipoServicioComponent;
  let fixture: ComponentFixture<EditTipoServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTipoServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTipoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
