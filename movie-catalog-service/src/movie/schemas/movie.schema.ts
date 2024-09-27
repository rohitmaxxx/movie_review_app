import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  director: string;

  @Prop()
  releaseDate: Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
