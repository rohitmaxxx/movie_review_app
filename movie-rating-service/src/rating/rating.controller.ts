// src/rating/rating.controller.ts

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingDto } from './dto/rating.dto';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  async create(@Body() createRatingDto: RatingDto) {
    console.log('rating payload', createRatingDto)
    return this.ratingService.createRating(createRatingDto);
  }

  @Get(':movieId')
  async findByMovieId(@Param('movieId') movieId: string) {
    return this.ratingService.getRatingsByMovieId(movieId);
  }

  @Get('movie/:movieId')
  async getMovieDetails(@Param('movieId') movieId: string) {
    return this.ratingService.getMovieById(movieId);
  }
}
