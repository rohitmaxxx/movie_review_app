import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MovieInfoService } from './movie-info.service';
import { MovieInfoController } from './movie-info.controller';

@Module({
  imports: [HttpModule],
  providers: [MovieInfoService],
  controllers: [MovieInfoController]
})
export class MovieInfoModule {}
