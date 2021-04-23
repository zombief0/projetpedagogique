import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCycleComponent } from './form-cycle.component';

describe('FormCycleComponent', () => {
  let component: FormCycleComponent;
  let fixture: ComponentFixture<FormCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
