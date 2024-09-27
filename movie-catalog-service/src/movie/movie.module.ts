import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])
  ],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
