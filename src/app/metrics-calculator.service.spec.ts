import { TestBed } from '@angular/core/testing';

import { MetricsCalculatorService } from './metrics-calculator.service';

describe('MetricsCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetricsCalculatorService = TestBed.get(MetricsCalculatorService);
    expect(service).toBeTruthy();
  });
});
