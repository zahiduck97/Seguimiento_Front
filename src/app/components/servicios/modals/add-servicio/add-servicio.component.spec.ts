import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServicioComponent } from './add-servicio.component';

describe('AddServicioComponent', () => {
  let component: AddServicioComponent;
  let fixture: ComponentFixture<AddServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
