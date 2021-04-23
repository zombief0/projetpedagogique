import { TestBed } from '@angular/core/testing';

import { SuiviProjetPedagogiqueService } from './suivi-projet-pedagogique.service';

describe('SuiviProjetPedagogiqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuiviProjetPedagogiqueService = TestBed.get(SuiviProjetPedagogiqueService);
    expect(service).toBeTruthy();
  });
});
