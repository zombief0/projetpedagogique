import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetPedagogiqueComponent } from './projet-pedagogique.component';

describe('ProjetPedagogiqueComponent', () => {
  let component: ProjetPedagogiqueComponent;
  let fixture: ComponentFixture<ProjetPedagogiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetPedagogiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetPedagogiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
