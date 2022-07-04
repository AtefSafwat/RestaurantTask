import { Request } from 'express';
import { User } from '@interfaces/users.interface';
import { Cuisine } from './../interfaces/cuisine.interface';
import userModel from '@models/users.model';
import cuisineModel from '@models/cuisines.model';
import { Restaurant } from '../interfaces/restaurant.interface';
import { CreateRestaurantDto } from '@dtos/restaurants.dto';
import { HttpException } from '@exceptions/HttpException';
import restaurantModel from '@models/restaurants.model';
import { isEmpty } from '@utils/util';

class RestaurantService {
  public restaurants = restaurantModel;
  //get all restaurant also get all restaurant filtration by cuisine
  public async findAllRestaurant(req: Request): Promise<Restaurant[]> {
    const restaurants: Restaurant[] = await this.restaurants.find({ ...req.query });
    return restaurants;
  }

  //get all restaurant also get all restaurant filtration by cuisine
  public async findAllRestaurantWithInKm(req: Request): Promise<Restaurant[]> {
    const multiplier = 0.001;

    const s = await this.restaurants.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [29.996336592217254, 31.16489450220801],
          },
          distanceField: 'distance',
          distanceMultiplier: multiplier,
        },
      },
    ]);
    const restaurants: Restaurant[] = await this.restaurants.find({
      location: {
        $near: {
          $maxDistance: 1000,
          $geometry: {
            type: 'Point',
            coordinates: [29.996336592217254, 31.16489450220801],
          },
        },
      },
    });
    return restaurants;
  }
  // get restaurant with restaurant id or uniq slug name
  public async findRestaurantById(restaurantId: string): Promise<Restaurant> {
    if (isEmpty(restaurantId)) throw new HttpException(400, 'There is no restaurantId');
    //query to get restaurant by slug name or id
    const findRestaurant: Restaurant = await this.restaurants.find({ $or: [{ _id: restaurantId }, { slugName: restaurantId }] })[0];
    if (!findRestaurant) throw new HttpException(409, 'There is no restaurant');
    //return the founded restaurant
    return findRestaurant;
  }

  //create new restaurant
  public async createRestaurant(restaurantData: CreateRestaurantDto): Promise<Restaurant> {
    if (isEmpty(restaurantData)) throw new HttpException(400, 'There is no restaurantData');
    // check if there is already restaurant with same slug name
    const findRestaurant: Restaurant = await this.restaurants.findOne({ slugName: restaurantData.slugName });
    // if there is one with the same name throw error
    if (findRestaurant) throw new HttpException(409, `Restaurant  slug name ${restaurantData.slugName} already exists`);

    //check if there is cuisine
    const cuisine: Cuisine = await cuisineModel.findOne({ _id: restaurantData.cuisineId });
    if (!cuisine) throw new HttpException(409, `Cuisine id is not exists`);
    //check if there is user exists to be owner
    const user: User = await userModel.findOne({ _id: restaurantData.ownerId });
    if (!user) throw new HttpException(409, `Cuisine id is not exists`);

    //create new restaurant
    //to add lat and long as the same as model schema tpe
    const data = {
      ...restaurantData,
      ...{
        location: { type: 'Point', coordinates: [restaurantData.long, restaurantData.lat] },
        ownerId: user,
        cuisineId: cuisine,
      },
    };
    const createRestaurantData: Restaurant = await this.restaurants.create({ ...data });

    // return created restaurant
    return createRestaurantData;
  }

  public async updateRestaurant(restaurantId: string, restaurantData: CreateRestaurantDto): Promise<Restaurant> {
    //check if there is data to be updated
    if (isEmpty(restaurantData)) throw new HttpException(400, 'There is no restaurantData');

    //check if there is new slugName and check if its already exist in data base for another restaurant
    if (restaurantData.slugName) {
      const findRestaurant: Restaurant = await this.restaurants.findOne({ slugName: restaurantData.slugName });
      //check if the slug name is not which we find dose not belong to wanted restaurant to be updated
      if (findRestaurant && findRestaurant._id != restaurantId)
        throw new HttpException(409, `Restaurant  slug name ${restaurantData.slugName} already exists`);
    }
    //to add lat and long as the same as model schema tpe
    //check if there is cuisine
    const cuisine: Cuisine = await cuisineModel.findOne({ _id: restaurantData.cuisineId });
    if (!cuisine) throw new HttpException(409, `Cuisine id is not exists`);
    //check if there is user exists to be owner
    const user: User = await userModel.findOne({ _id: restaurantData.ownerId });
    if (!user) throw new HttpException(409, `Cuisine id is not exists`);

    //create new restaurant
    //to add lat and long as the same as model schema tpe
    const data = {
      ...restaurantData,
      ...{
        location: { type: 'Point', coordinates: [restaurantData.long, restaurantData.lat] },
        ownerId: user,
        cuisineId: cuisine,
      },
    };
    const updateRestaurantById: Restaurant = await this.restaurants.findByIdAndUpdate(restaurantId, { ...data });
    if (!updateRestaurantById) throw new HttpException(409, 'There is no restaurant');

    return updateRestaurantById;
  }
  //delete restaurant by id
  public async deleteRestaurant(restaurantId: string): Promise<Restaurant> {
    //check if there is already restaurant with this id
    const deleteRestaurantById: Restaurant = await this.restaurants.findByIdAndDelete(restaurantId);
    if (!deleteRestaurantById) throw new HttpException(409, 'There is no restaurant');

    return deleteRestaurantById;
  }
}

export default RestaurantService;
