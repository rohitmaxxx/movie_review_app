import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

let mongo_uri = "mongodb+srv://maxxx4:1234@cluster0.pqk66ov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
@Module({
  imports: [
    MongooseModule.forRoot(mongo_uri), // Adjust the MongoDB connection string accordingly
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
