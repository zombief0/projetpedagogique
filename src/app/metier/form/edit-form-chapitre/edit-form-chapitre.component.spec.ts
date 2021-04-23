import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormChapitreComponent } from './edit-form-chapitre.component';

describe('EditFormChapitreComponent', () => {
  let component: EditFormChapitreComponent;
  let fixture: ComponentFixture<EditFormChapitreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormChapitreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormChapitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
