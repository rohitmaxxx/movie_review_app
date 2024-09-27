import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://maxxx4:1234@cluster0.pqk66ov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    MovieModule,
  ],
})
export class AppModule {}
