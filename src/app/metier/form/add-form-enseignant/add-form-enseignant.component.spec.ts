import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormEnseignantComponent } from './add-form-enseignant.component';

describe('AddFormEnseignantComponent', () => {
  let component: AddFormEnseignantComponent;
  let fixture: ComponentFixture<AddFormEnseignantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormEnseignantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
