import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormSalleComponent } from './edit-form-salle.component';

describe('EditFormSalleComponent', () => {
  let component: EditFormSalleComponent;
  let fixture: ComponentFixture<EditFormSalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormSalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
