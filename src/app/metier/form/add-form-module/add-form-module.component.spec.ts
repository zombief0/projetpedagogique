import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormModuleComponent } from './add-form-module.component';

describe('AddFormModuleComponent', () => {
  let component: AddFormModuleComponent;
  let fixture: ComponentFixture<AddFormModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
