import { TestBed } from '@angular/core/testing';

import { MatiereService } from './matiere.service';

describe('MatiereServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatiereService = TestBed.get(MatiereService);
    expect(service).toBeTruthy();
  });
});
