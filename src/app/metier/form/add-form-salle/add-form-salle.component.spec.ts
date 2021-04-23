import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormSalleComponent } from './add-form-salle.component';

describe('AddFormSalleComponent', () => {
  let component: AddFormSalleComponent;
  let fixture: ComponentFixture<AddFormSalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormSalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
