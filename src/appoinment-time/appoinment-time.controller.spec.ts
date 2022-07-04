import { Test, TestingModule } from '@nestjs/testing';
import { AppoinmentTimeController } from './appoinment-time.controller';
import { AppoinmentTimeService } from './appoinment-time.service';

describe('AppoinmentTimeController', () => {
  let controller: AppoinmentTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppoinmentTimeController],
      providers: [AppoinmentTimeService],
    }).compile();

    controller = module.get<AppoinmentTimeController>(AppoinmentTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
