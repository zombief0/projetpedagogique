import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormClasseComponent } from './edit-form-classe.component';

describe('EditFormClasseComponent', () => {
  let component: EditFormClasseComponent;
  let fixture: ComponentFixture<EditFormClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
