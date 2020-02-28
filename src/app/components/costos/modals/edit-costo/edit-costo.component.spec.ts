import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCostoComponent } from './edit-costo.component';

describe('EditCostoComponent', () => {
  let component: EditCostoComponent;
  let fixture: ComponentFixture<EditCostoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCostoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
