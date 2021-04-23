import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormAnneeComponent } from './edit-form-annee.component';

describe('EditFormAnneeComponent', () => {
  let component: EditFormAnneeComponent;
  let fixture: ComponentFixture<EditFormAnneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormAnneeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
