import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormSuiviComponent } from './edit-form-suivi.component';

describe('EditFormSuiviComponent', () => {
  let component: EditFormSuiviComponent;
  let fixture: ComponentFixture<EditFormSuiviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormSuiviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
