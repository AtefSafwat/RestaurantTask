import { NextFunction, Request, Response } from 'express';
import { CreateCuisineDto } from '@dtos/cuisines.dto';
import cuisineService from '@services/cuisines.service';
import { Cuisine } from '@/interfaces/cuisine.interface';

class CuisinesController {
  public cuisineService = new cuisineService();

  public getCuisines = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCuisinesData: Cuisine[] = await this.cuisineService.findAllCuisine();

      res.status(200).json({ data: findAllCuisinesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCuisineById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cuisineId: string = req.params.id;
      const findOneCuisineData: Cuisine = await this.cuisineService.findCuisineById(cuisineId);

      res.status(200).json({ data: findOneCuisineData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCuisine = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cuisineData: CreateCuisineDto = req.body;
      const createCuisineData: Cuisine = await this.cuisineService.createCuisine(cuisineData);

      res.status(201).json({ data: createCuisineData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCuisine = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cuisineId: string = req.params.id;
      const cuisineData: CreateCuisineDto = req.body;
      const updateCuisineData: Cuisine = await this.cuisineService.updateCuisine(cuisineId, cuisineData);

      res.status(200).json({ data: updateCuisineData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCuisine = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cuisineId: string = req.params.id;
      const deleteCuisineData: Cuisine = await this.cuisineService.deleteCuisine(cuisineId);

      res.status(200).json({ data: deleteCuisineData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CuisinesController;
