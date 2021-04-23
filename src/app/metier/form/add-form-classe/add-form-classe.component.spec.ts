import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormClasseComponent } from './add-form-classe.component';

describe('AddFormClasseComponent', () => {
  let component: AddFormClasseComponent;
  let fixture: ComponentFixture<AddFormClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
