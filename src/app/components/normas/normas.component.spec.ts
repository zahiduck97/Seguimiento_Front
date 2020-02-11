import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormasComponent } from './normas.component';

describe('NormasComponent', () => {
  let component: NormasComponent;
  let fixture: ComponentFixture<NormasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
