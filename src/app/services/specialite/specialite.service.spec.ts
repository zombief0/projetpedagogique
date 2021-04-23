import { TestBed } from '@angular/core/testing';

import { SpecialiteService } from './specialite.service';

describe('SpecialiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialiteService = TestBed.get(SpecialiteService);
    expect(service).toBeTruthy();
  });
});
