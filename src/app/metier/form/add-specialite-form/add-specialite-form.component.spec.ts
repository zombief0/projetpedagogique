import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecialiteFormComponent } from './add-specialite-form.component';

describe('AddSpecialiteFormComponent', () => {
  let component: AddSpecialiteFormComponent;
  let fixture: ComponentFixture<AddSpecialiteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpecialiteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpecialiteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
