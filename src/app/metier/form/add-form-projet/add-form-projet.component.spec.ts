import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormProjetComponent } from './add-form-projet.component';

describe('AddFormProjetComponent', () => {
  let component: AddFormProjetComponent;
  let fixture: ComponentFixture<AddFormProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
