import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormMatiereComponent } from './add-form-matiere.component';

describe('AddFormMatiereComponent', () => {
  let component: AddFormMatiereComponent;
  let fixture: ComponentFixture<AddFormMatiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormMatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
