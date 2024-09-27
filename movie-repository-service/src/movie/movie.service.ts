// src/movie/movie.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  async createMovie(createMovieDto: any): Promise<Movie> {
    const newMovie = new this.movieModel(createMovieDto);
    return newMovie.save();
  }

  async getMovies(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async getMovieById(id: string): Promise<Movie> {
    return this.movieModel.findById(id).exec();
  }

  async updateMovie(id: string, updateMovieDto: any): Promise<Movie> {
    return this.movieModel.findByIdAndUpdate(id, updateMovieDto, { new: true }).exec();
  }

  async deleteMovie(id: string): Promise<Movie> {
    return this.movieModel.findByIdAndDelete(id).exec();
  }
}
