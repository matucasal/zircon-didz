import { Test, TestingModule } from '@nestjs/testing';
import { DidJwtService } from './did-jwt.service';

describe('DidJwtService', () => {
  let service: DidJwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DidJwtService],
    }).compile();

    service = module.get<DidJwtService>(DidJwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
