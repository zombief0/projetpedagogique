import { TestBed } from '@angular/core/testing';

import { ProjetPedagogiqueService } from './projet-pedagogique.service';

describe('ProjetPedagogiqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjetPedagogiqueService = TestBed.get(ProjetPedagogiqueService);
    expect(service).toBeTruthy();
  });
});
