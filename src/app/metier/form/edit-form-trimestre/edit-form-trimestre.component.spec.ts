import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormTrimestreComponent } from './edit-form-trimestre.component';

describe('EditFormTrimestreComponent', () => {
  let component: EditFormTrimestreComponent;
  let fixture: ComponentFixture<EditFormTrimestreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormTrimestreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormTrimestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
