import { Test, TestingModule } from '@nestjs/testing';
import { MovieInfoController } from './movie-info.controller';

describe('MovieInfoController', () => {
  let controller: MovieInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieInfoController],
    }).compile();

    controller = module.get<MovieInfoController>(MovieInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
