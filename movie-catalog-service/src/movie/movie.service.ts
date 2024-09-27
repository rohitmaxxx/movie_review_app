import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MovieService {
  constructor(private httpService: HttpService) {}

  async createMovie(createMovieDto: any): Promise<any> {
    const response = await firstValueFrom(this.httpService.post('http://localhost:3002/movies', createMovieDto));
    return response.data;
  }

  async getMovies(): Promise<any[]> {
    const response = await firstValueFrom(this.httpService.get('http://localhost:3002/movies'));
    return response.data;
  }

  async getMovieById(id: string): Promise<any> {
    const response = await firstValueFrom(this.httpService.get(`http://localhost:3002/movies/${id}`));
    return response.data;
  }

  async updateMovie(id: string, updateMovieDto: any): Promise<any> {
    const response = await firstValueFrom(this.httpService.put(`http://localhost:3002/movies/${id}`, updateMovieDto));
    return response.data;
  }

  async deleteMovie(id: string): Promise<any> {
    const response = await firstValueFrom(this.httpService.delete(`http://localhost:3002/movies/${id}`));
    return response.data;
  }

  // Example method to communicate with Movie Repository Service
  async getMovieFromRepositoryService(id: string): Promise<any> {
    const response = await firstValueFrom(this.httpService.get(`http://localhost:3002/movies/${id}`));
    return response.data;
  }
}
