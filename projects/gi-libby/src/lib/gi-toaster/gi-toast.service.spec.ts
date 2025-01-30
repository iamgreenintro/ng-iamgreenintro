import { TestBed } from '@angular/core/testing';

import { GiToastService } from './gi-toast.service';

describe('GiToastService', () => {
  let service: GiToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
