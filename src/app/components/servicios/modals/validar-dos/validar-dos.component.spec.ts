import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarDosComponent } from './validar-dos.component';

describe('ValidarDosComponent', () => {
  let component: ValidarDosComponent;
  let fixture: ComponentFixture<ValidarDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
