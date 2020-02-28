import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNormaComponent } from './edit-norma.component';

describe('EditNormaComponent', () => {
  let component: EditNormaComponent;
  let fixture: ComponentFixture<EditNormaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNormaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
