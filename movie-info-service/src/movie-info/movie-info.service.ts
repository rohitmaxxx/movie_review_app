// src/movie-info/movie-info.service.ts

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class MovieInfoService {
  constructor(private httpService: HttpService) {}

  getMovieById(id: string): Observable<any> {
    const movieRepositoryUrl = `http://localhost:3000/movies/${id}`; // URL of the Movie Repository Service

    return this.httpService.get(movieRepositoryUrl).pipe(
      map(response => response.data)
    );
  }
}
