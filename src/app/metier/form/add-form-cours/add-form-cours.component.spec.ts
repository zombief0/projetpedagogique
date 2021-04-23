import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormCoursComponent } from './add-form-cours.component';

describe('AddFormCoursComponent', () => {
  let component: AddFormCoursComponent;
  let fixture: ComponentFixture<AddFormCoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormCoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
