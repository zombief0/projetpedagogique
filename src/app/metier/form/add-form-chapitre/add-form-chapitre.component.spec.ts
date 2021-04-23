import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormChapitreComponent } from './add-form-chapitre.component';

describe('AddFormChapitreComponent', () => {
  let component: AddFormChapitreComponent;
  let fixture: ComponentFixture<AddFormChapitreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormChapitreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormChapitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
