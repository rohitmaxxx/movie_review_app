import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MovieService } from './movie.service';
import { Movie } from './schemas/movie.schema';
import { Model } from 'mongoose';

const mockMovie = {
  _id: 'someId',
  title: 'Test Movie',
  description: 'Test Description',
};

const mockMovieModel = {
  new: jest.fn().mockResolvedValue(mockMovie),
  constructor: jest.fn().mockResolvedValue(mockMovie),
  create: jest.fn().mockResolvedValue(mockMovie),
  find: jest.fn().mockReturnThis(),
  findById: jest.fn().mockReturnThis(),
  findByIdAndUpdate: jest.fn().mockReturnThis(),
  findByIdAndDelete: jest.fn().mockReturnThis(),
  exec: jest.fn(),
};

describe('MovieService', () => {
  let service: MovieService;
  let model: Model<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getModelToken(Movie.name),
          useValue: mockMovieModel,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    model = module.get<Model<Movie>>(getModelToken(Movie.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMovie', () => {
    it('should create a new movie', async () => {
      jest.spyOn(model.prototype, 'save').mockResolvedValue(mockMovie);
      const result = await service.createMovie(mockMovie);
      expect(result).toEqual(mockMovie);
      expect(model.prototype.save).toHaveBeenCalled();
    });
  });

  describe('getMovies', () => {
    it('should return an array of movies', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockMovie]),
      } as any);
      const result = await service.getMovies();
      expect(result).toEqual([mockMovie]);
      expect(model.find).toHaveBeenCalled();
    });
  });


  describe('getMovieById', () => {
    it('should return a movie by ID', async () => {
      const findByIdSpy = jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockMovie)
      } as any);
      const result = await service.getMovieById('someId');
      expect(result).toEqual(mockMovie);
      expect(findByIdSpy).toHaveBeenCalledWith('someId');
    });
  });

  describe('updateMovie', () => {
    it('should update and return the movie', async () => {
      const updatedMovie = { ...mockMovie, title: 'Updated Movie' };
      const findByIdAndUpdateSpy = jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(updatedMovie)
      } as any);
      const result = await service.updateMovie('someId', updatedMovie);
      expect(result).toEqual(updatedMovie);
      expect(findByIdAndUpdateSpy).toHaveBeenCalledWith('someId', updatedMovie, { new: true });
    });
  });

  describe('deleteMovie', () => {
    it('should delete and return the movie', async () => {
      const findByIdAndDeleteSpy = jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockMovie)
      } as any);
      const result = await service.deleteMovie('someId');
      expect(result).toEqual(mockMovie);
      expect(findByIdAndDeleteSpy).toHaveBeenCalledWith('someId');
    });
  });
});
