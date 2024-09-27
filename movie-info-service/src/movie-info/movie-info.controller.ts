// src/movie-info/movie-info.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { MovieInfoService } from './movie-info.service';
import { Observable } from 'rxjs';

@Controller('movie-info')
export class MovieInfoController {
  constructor(private readonly movieInfoService: MovieInfoService) {}

  @Get(':id')
  getMovieById(@Param('id') id: string): Observable<any> {
    return this.movieInfoService.getMovieById(id);
  }
}
