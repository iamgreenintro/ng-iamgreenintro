import { TestBed } from '@angular/core/testing';

import { GiToasterService } from './gi-toaster.service';

describe('GiToasterService', () => {
  let service: GiToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiToasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
