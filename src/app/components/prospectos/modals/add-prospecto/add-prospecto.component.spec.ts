import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProspectoComponent } from './add-prospecto.component';

describe('AddProspectoComponent', () => {
  let component: AddProspectoComponent;
  let fixture: ComponentFixture<AddProspectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProspectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProspectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
