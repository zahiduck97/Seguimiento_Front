import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectosComponent } from './prospectos.component';

describe('ProspectosComponent', () => {
  let component: ProspectosComponent;
  let fixture: ComponentFixture<ProspectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
