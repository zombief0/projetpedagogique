import { TestBed } from '@angular/core/testing';

import { TrimestreService } from './trimestre.service';

describe('TrimestreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrimestreService = TestBed.get(TrimestreService);
    expect(service).toBeTruthy();
  });
});
