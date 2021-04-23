import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormSerieComponent } from './add-form-serie.component';

describe('AddFormSerieComponent', () => {
  let component: AddFormSerieComponent;
  let fixture: ComponentFixture<AddFormSerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
