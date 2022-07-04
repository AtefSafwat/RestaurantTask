import cuisineModel from '@models/cuisines.model';
import { Cuisine } from './../interfaces/cuisine.interface';
import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { Schema } from 'mongoose';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: string, userData: any): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }
    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { ...userData }, { new: true });
    if (!updateUserById) throw new HttpException(409, "You're not user");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }

  //function to add fav icon
  public async addCuisineToFavorite(user: User, cuisineId: string): Promise<User> {
    const cuisine: Cuisine = await cuisineModel.findOne({ _id: cuisineId });
    //check if there is no cuisine
    if (!cuisine) throw new HttpException(409, 'There in no cuisine with this id');
    return this.users.findByIdAndUpdate(user._id, { $addToSet: { favoriteCuisine: cuisine } }, { new: true });
    //add cuisine to user list of favorite
  }

  public async removeCuisineToFavorite(user: User, cuisineId: string): Promise<User> {
    const cuisine: Cuisine = await cuisineModel.findOne({ _id: cuisineId });
    //check if there is no cuisine
    if (!cuisine) throw new HttpException(409, 'There in no cuisine with this id');
    return this.users.findByIdAndUpdate(user._id, { $pull: { favoriteCuisine: cuisineId } }, { new: true });
    //add cuisine to user list of favorite
  }
}

export default UserService;
