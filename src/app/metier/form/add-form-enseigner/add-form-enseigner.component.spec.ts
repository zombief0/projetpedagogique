import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormEnseignerComponent } from './add-form-enseigner.component';

describe('AddFormEnseignerComponent', () => {
  let component: AddFormEnseignerComponent;
  let fixture: ComponentFixture<AddFormEnseignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormEnseignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormEnseignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
