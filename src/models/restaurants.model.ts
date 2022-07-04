import { model, Schema, Document } from 'mongoose';
import { Restaurant } from '@interfaces/restaurant.interface';

const restaurantSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slugName: {
    type: String,
    unique: true,
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  cuisineId: {
    type: Schema.Types.ObjectId,
    ref: 'Cuisine',
  },
  location: {
    lat: String,
    long: String,
  },
});

const restaurantModel = model<Restaurant & Document>('Restaurant', restaurantSchema);

export default restaurantModel;
