import { NextFunction, Request, Response } from 'express';
import { CreateRestaurantDto } from '@dtos/restaurants.dto';
import { Restaurant } from '@interfaces/restaurant.interface';
import RestaurantService from '@/services/restaurants.service';

class RestaurantsController {
  public restaurantService = new RestaurantService();

  public getRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllRestaurantsData: Restaurant[] = await this.restaurantService.findAllRestaurant(req);

      res.status(200).json({ data: findAllRestaurantsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public findAllRestaurantWithInKm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllRestaurantsData: Restaurant[] = await this.restaurantService.findAllRestaurantWithInKm(req);

      res.status(200).json({ data: findAllRestaurantsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const restaurantId: string = req.params.id;
      const findOneRestaurantData: Restaurant = await this.restaurantService.findRestaurantById(restaurantId);

      res.status(200).json({ data: findOneRestaurantData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const restaurantData: CreateRestaurantDto = req.body;
      const createRestaurantData: Restaurant = await this.restaurantService.createRestaurant(restaurantData);

      res.status(201).json({ data: createRestaurantData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const restaurantId: string = req.params.id;
      const restaurantData: CreateRestaurantDto = req.body;
      const updateRestaurantData: Restaurant = await this.restaurantService.updateRestaurant(restaurantId, restaurantData);

      res.status(200).json({ data: updateRestaurantData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const restaurantId: string = req.params.id;
      const deleteRestaurantData: Restaurant = await this.restaurantService.deleteRestaurant(restaurantId);

      res.status(200).json({ data: deleteRestaurantData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default RestaurantsController;
