import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormSpecialiteComponent } from './edit-form-specialite.component';

describe('EditFormSpecialiteComponent', () => {
  let component: EditFormSpecialiteComponent;
  let fixture: ComponentFixture<EditFormSpecialiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormSpecialiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
