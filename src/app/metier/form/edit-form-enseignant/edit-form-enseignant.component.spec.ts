import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormEnseignantComponent } from './edit-form-enseignant.component';

describe('EditFormEnseignantComponent', () => {
  let component: EditFormEnseignantComponent;
  let fixture: ComponentFixture<EditFormEnseignantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormEnseignantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
