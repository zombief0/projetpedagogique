import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormActiviteComponent } from './edit-form-activite.component';

describe('EditFormActiviteComponent', () => {
  let component: EditFormActiviteComponent;
  let fixture: ComponentFixture<EditFormActiviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormActiviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
