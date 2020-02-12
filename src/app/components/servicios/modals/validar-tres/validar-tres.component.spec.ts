import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarTresComponent } from './validar-tres.component';

describe('ValidarTresComponent', () => {
  let component: ValidarTresComponent;
  let fixture: ComponentFixture<ValidarTresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarTresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
