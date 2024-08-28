import { TestBed } from '@angular/core/testing';

import { SaveScoreService } from './save-score.service';

describe('SaveScoreService', () => {
  let service: SaveScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
