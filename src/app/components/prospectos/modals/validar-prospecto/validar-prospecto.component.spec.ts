import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarProspectoComponent } from './validar-prospecto.component';

describe('ValidarProspectoComponent', () => {
  let component: ValidarProspectoComponent;
  let fixture: ComponentFixture<ValidarProspectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarProspectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarProspectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
