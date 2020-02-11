import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNormaComponent } from './add-norma.component';

describe('AddNormaComponent', () => {
  let component: AddNormaComponent;
  let fixture: ComponentFixture<AddNormaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNormaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
