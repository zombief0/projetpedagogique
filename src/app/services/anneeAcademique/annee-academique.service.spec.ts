import { TestBed } from '@angular/core/testing';

import { AnneeAcademiqueService } from './annee-academique.service';

describe('AnneeAcademiqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnneeAcademiqueService = TestBed.get(AnneeAcademiqueService);
    expect(service).toBeTruthy();
  });
});
