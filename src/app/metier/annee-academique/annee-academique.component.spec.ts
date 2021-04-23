import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneeAcademiqueComponent } from './annee-academique.component';

describe('AnneeAcademiqueComponent', () => {
  let component: AnneeAcademiqueComponent;
  let fixture: ComponentFixture<AnneeAcademiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnneeAcademiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnneeAcademiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
