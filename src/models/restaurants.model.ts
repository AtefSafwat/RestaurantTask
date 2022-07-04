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
  location: { type: { type: String }, coordinates: [Number] },
});
const restaurantModel = model<Restaurant & Document>('Restaurant', restaurantSchema);
restaurantModel.createIndexes({ point: '2dsphere' });

export default restaurantModel;
