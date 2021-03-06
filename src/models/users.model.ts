import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  favoriteCuisine: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cuisine',
      default: [],
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
