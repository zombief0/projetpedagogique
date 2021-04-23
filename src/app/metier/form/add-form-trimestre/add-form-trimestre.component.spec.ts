import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormTrimestreComponent } from './add-form-trimestre.component';

describe('AddFormTrimestreComponent', () => {
  let component: AddFormTrimestreComponent;
  let fixture: ComponentFixture<AddFormTrimestreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormTrimestreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormTrimestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
