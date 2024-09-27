import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/user.module';

let mongo_uri = "mongodb+srv://maxxx4:1234@cluster0.pqk66ov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
@Module({
  imports: [
    MongooseModule.forRoot(mongo_uri),
    UsersModule,
  ],
})
export class AppModule {}
