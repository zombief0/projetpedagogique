import { TestBed } from '@angular/core/testing';

import { CoursService } from './cours.service';

describe('CoursServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursService = TestBed.get(CoursService);
    expect(service).toBeTruthy();
  });
});
