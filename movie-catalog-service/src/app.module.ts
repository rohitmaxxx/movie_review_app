import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://maxxx4:1234@cluster0.pqk66ov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    HttpModule,
    MovieModule,
  ],
})
export class AppModule {}
