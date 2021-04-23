import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviProjetPedagogiqueComponent } from './suivi-projet-pedagogique.component';

describe('SuiviProjetPedagogiqueComponent', () => {
  let component: SuiviProjetPedagogiqueComponent;
  let fixture: ComponentFixture<SuiviProjetPedagogiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviProjetPedagogiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviProjetPedagogiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
