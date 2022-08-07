import { DirectionService } from './../../api/services/direction.service';
import { TestBed } from '@angular/core/testing';

import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DirectionService, useValue: {}} 
      ]
    });
    service = TestBed.inject(CityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
