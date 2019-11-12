/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CargaServiceService } from './cargaService.service';

describe('Service: CargaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CargaServiceService]
    });
  });

  it('should ...', inject([CargaServiceService], (service: CargaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
