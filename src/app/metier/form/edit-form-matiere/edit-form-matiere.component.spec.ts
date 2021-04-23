import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormMatiereComponent } from './edit-form-matiere.component';

describe('EditFormMatiereComponent', () => {
  let component: EditFormMatiereComponent;
  let fixture: ComponentFixture<EditFormMatiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormMatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
