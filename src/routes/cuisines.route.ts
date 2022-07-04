import { Router } from 'express';
import CuisinesController from '@controllers/cuisine.controller';
import { CreateCuisineDto } from '@dtos/cuisines.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class CuisinesRoute implements Routes {
  public path = '/cuisines';
  public router = Router();
  public cuisinesController = new CuisinesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.cuisinesController.getCuisines);
    this.router.get(`${this.path}/:id`, this.cuisinesController.getCuisineById);
    this.router.post(`${this.path}`, validationMiddleware(CreateCuisineDto, 'body'), this.cuisinesController.createCuisine);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateCuisineDto, 'body', true), this.cuisinesController.updateCuisine);
    this.router.delete(`${this.path}/:id`, this.cuisinesController.deleteCuisine);
  }
}

export default CuisinesRoute;
