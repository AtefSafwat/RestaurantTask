import { Router } from 'express';
import RestaurantsController from '@controllers/restaurant.controller';
import { CreateRestaurantDto } from '@dtos/restaurants.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class RestaurantsRoute implements Routes {
  public path = '/restaurant';
  public router = Router();
  public restaurantController = new RestaurantsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.restaurantController.getRestaurants);
    this.router.get(`${this.path}/:id`, this.restaurantController.getRestaurantById);
    this.router.post(`${this.path}`, validationMiddleware(CreateRestaurantDto, 'body'), this.restaurantController.createRestaurant);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateRestaurantDto, 'body', true), this.restaurantController.updateRestaurant);
    this.router.delete(`${this.path}/:id`, this.restaurantController.deleteRestaurant);
  }
}

export default RestaurantsRoute;
