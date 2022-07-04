import { Test, TestingModule } from '@nestjs/testing';
import { AppoinmentTimeService } from './appoinment-time.service';

describe('AppoinmentTimeService', () => {
  let service: AppoinmentTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppoinmentTimeService],
    }).compile();

    service = module.get<AppoinmentTimeService>(AppoinmentTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
