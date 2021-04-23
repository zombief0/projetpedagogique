import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormModuleComponent } from './edit-form-module.component';

describe('EditFormModuleComponent', () => {
  let component: EditFormModuleComponent;
  let fixture: ComponentFixture<EditFormModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
