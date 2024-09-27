import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() createMovieDto: any) {
    return this.movieService.createMovie(createMovieDto);
  }

  @Get()
  async findAll() {
    return this.movieService.getMovies();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.movieService.getMovieById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMovieDto: any) {
    return this.movieService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.movieService.deleteMovie(id);
  }

  // Example endpoint to communicate with Movie Repository Service
  @Get('/repository/:id')
  async findFromRepository(@Param('id') id: string) {
    return this.movieService.getMovieFromRepositoryService(id);
  }
}
