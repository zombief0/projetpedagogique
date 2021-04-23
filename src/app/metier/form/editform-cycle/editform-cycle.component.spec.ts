import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditformCycleComponent } from './editform-cycle.component';

describe('EditformCycleComponent', () => {
  let component: EditformCycleComponent;
  let fixture: ComponentFixture<EditformCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditformCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditformCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
