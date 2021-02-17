import { TestBed } from '@angular/core/testing';

import { HorecaService } from './horeca.service';

describe('HorecaService', () => {
  let service: HorecaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorecaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
