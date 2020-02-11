import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCostoComponent } from './add-costo.component';

describe('AddCostoComponent', () => {
  let component: AddCostoComponent;
  let fixture: ComponentFixture<AddCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
