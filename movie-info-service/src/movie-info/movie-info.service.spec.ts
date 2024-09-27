import { Test, TestingModule } from '@nestjs/testing';
import { MovieInfoService } from './movie-info.service';

describe('MovieInfoService', () => {
  let service: MovieInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieInfoService],
    }).compile();

    service = module.get<MovieInfoService>(MovieInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
