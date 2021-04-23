import { TestBed } from '@angular/core/testing';

import { EnseignerService } from './enseigner.service';

describe('EnseignerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnseignerService = TestBed.get(EnseignerService);
    expect(service).toBeTruthy();
  });
});
