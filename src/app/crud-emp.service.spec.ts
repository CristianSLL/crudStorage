import { TestBed } from '@angular/core/testing';

import { CrudEmpService } from './crud-emp.service';

describe('CrudEmpService', () => {
  let service: CrudEmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudEmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
