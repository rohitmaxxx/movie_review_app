import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RatingDocument = Rating & Document;

@Schema()
export class Rating {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  movieId: string;

  @Prop({ required: true })
  rating: number;

  @Prop()
  comment: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
