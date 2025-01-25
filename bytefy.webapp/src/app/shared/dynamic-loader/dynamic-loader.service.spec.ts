/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { DynamicLoaderService } from './dynamic-loader.service';

describe('Service: DynamicLoader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicLoaderService]
    });
  });

  it('should ...', inject([DynamicLoaderService], (service: DynamicLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
