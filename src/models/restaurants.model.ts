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
    index: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  cuisineId: {
    type: Schema.Types.ObjectId,
    ref: 'Cuisine',
  },
  // location: { type: { type: String }, coordinates: [Number] },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
      index: '2dsphere',
      sparse: true,
    },
    //
  },
});

const restaurantModel = model<Restaurant & Document>('Restaurant', restaurantSchema);
export default restaurantModel;
