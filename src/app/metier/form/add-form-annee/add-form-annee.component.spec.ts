import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormAnneeComponent } from './add-form-annee.component';

describe('AddFormAnneeComponent', () => {
  let component: AddFormAnneeComponent;
  let fixture: ComponentFixture<AddFormAnneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormAnneeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
