import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormProjetComponent } from './edit-form-projet.component';

describe('EditFormProjetComponent', () => {
  let component: EditFormProjetComponent;
  let fixture: ComponentFixture<EditFormProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
