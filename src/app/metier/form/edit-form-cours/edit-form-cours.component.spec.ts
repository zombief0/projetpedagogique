import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormCoursComponent } from './edit-form-cours.component';

describe('EditFormCoursComponent', () => {
  let component: EditFormCoursComponent;
  let fixture: ComponentFixture<EditFormCoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormCoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
