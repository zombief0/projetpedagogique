import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormActiviteComponent } from './add-form-activite.component';

describe('AddFormActiviteComponent', () => {
  let component: AddFormActiviteComponent;
  let fixture: ComponentFixture<AddFormActiviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormActiviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
