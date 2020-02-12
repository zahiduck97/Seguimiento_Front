import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarUnoComponent } from './validar-uno.component';

describe('ValidarUnoComponent', () => {
  let component: ValidarUnoComponent;
  let fixture: ComponentFixture<ValidarUnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarUnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
