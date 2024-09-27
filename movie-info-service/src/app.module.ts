import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MovieInfoModule } from './movie-info/movie-info.module';

@Module({
  imports: [
    HttpModule,
    MovieInfoModule,
  ],
})
export class AppModule {}
