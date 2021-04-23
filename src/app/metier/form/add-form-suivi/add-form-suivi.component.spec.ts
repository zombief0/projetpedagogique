import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormSuiviComponent } from './add-form-suivi.component';

describe('AddFormSuiviComponent', () => {
  let component: AddFormSuiviComponent;
  let fixture: ComponentFixture<AddFormSuiviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormSuiviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
