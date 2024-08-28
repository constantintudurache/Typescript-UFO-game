import { TestBed } from '@angular/core/testing';

import { TokenmngService } from './tokenmng.service';

describe('TokenmngService', () => {
  let service: TokenmngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenmngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
