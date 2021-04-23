import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormCompetenceComponent } from './add-form-competence.component';

describe('AddFormCompetenceComponent', () => {
  let component: AddFormCompetenceComponent;
  let fixture: ComponentFixture<AddFormCompetenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormCompetenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
