import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormObjectifComponent } from './add-form-objectif.component';

describe('AddFormObjectifComponent', () => {
  let component: AddFormObjectifComponent;
  let fixture: ComponentFixture<AddFormObjectifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormObjectifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormObjectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
