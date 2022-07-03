import { Cuisine } from '@/interfaces/cuisine.interface';
import { model, Schema, Document } from 'mongoose';

const cuisineSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const cuisineModel = model<Cuisine & Document>('Cuisine', cuisineSchema);

export default cuisineModel;
