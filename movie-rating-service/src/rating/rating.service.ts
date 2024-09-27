// src/rating/rating.service.ts

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating, RatingDocument } from './schemas/rating.schema';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { RatingDto } from './dto/rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name) private ratingModel: Model<RatingDocument>,
    private httpService: HttpService,
  ) {}

  async createRating(createRatingDto: RatingDto): Promise<Rating> {
    console.log('rating payload', createRatingDto)
    const newRating = new this.ratingModel(createRatingDto);
    return newRating.save();
  }

  async getRatingsByMovieId(movieId: string): Promise<Rating[]> {
    return this.ratingModel.find({ movieId }).exec();
  }

  async getMovieById(movieId: string): Promise<any> {
    const movieRepositoryUrl = `http://localhost:3000/movies/${movieId}`; // URL of the Movie Repository Service
    const response = await lastValueFrom(
      this.httpService.get(movieRepositoryUrl).pipe(map((res) => res.data)),
    );
    return response;
  }
}
