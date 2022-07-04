import { RequestWithUser } from './../interfaces/auth.interface';
import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';

class UsersController {
  public userService = new userService();
  //get all users list
  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  //get user by id
  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
  //create or register user
  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  // update user data
  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  //delete user by id
  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
  public addCuisineToFavorite = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const cuisineId: string = req.body.cuisineId;
      const user: User = await this.userService.addCuisineToFavorite(req.user, cuisineId);

      res.status(200).json({ data: user, message: 'cuisine has been added ' });
    } catch (error) {
      next(error);
    }
  };

  public removeCuisineToFavorite = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const cuisineId: string = req.body.cuisineId;
      const user: User = await this.userService.removeCuisineToFavorite(req.user, cuisineId);

      res.status(200).json({ data: user, message: 'cuisine has been removed ' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
