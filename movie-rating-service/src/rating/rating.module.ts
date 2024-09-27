// src/rating/rating.module.ts

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { Rating, RatingSchema } from './schemas/rating.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }])
  ],
  providers: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}
