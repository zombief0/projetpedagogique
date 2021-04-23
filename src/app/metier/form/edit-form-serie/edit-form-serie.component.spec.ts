import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormSerieComponent } from './edit-form-serie.component';

describe('EditFormSerieComponent', () => {
  let component: EditFormSerieComponent;
  let fixture: ComponentFixture<EditFormSerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
