import { Cuisine } from '@interfaces/cuisine.interface';
import { hash } from 'bcrypt';
import { CreateCuisineDto } from '@dtos/cuisines.dto';
import { HttpException } from '@exceptions/HttpException';
import cuisineModel from '@models/cuisines.model';
import { isEmpty } from '@utils/util';

class CuisineServices {
  public cuisines = cuisineModel;

  //get all cuisines exists
  public async findAllCuisine(): Promise<Cuisine[]> {
    const cuisines: Cuisine[] = await this.cuisines.find();
    return cuisines;
  }
  //get info for one cuisine
  public async findCuisineById(cuisineId: string): Promise<Cuisine> {
    if (isEmpty(cuisineId)) throw new HttpException(400, ' There is no cuisineId');

    const findCuisine: Cuisine = await this.cuisines.findOne({ _id: cuisineId });
    if (!findCuisine) throw new HttpException(409, 'There is no cuisine');

    return findCuisine;
  }
  // create new cuisine
  public async createCuisine(cuisineData: CreateCuisineDto): Promise<Cuisine> {
    //check if there is data to  create new cuisine
    if (isEmpty(cuisineData)) throw new HttpException(400, 'There is no cuisineData');
    //check if there is already exit cuisine with the same name
    const findCuisine: Cuisine = await this.cuisines.findOne({ name: cuisineData.name });
    if (findCuisine) throw new HttpException(409, ` cuisine name ${cuisineData.name} already exists`);
    //create new cuisine
    const createCuisineData: Cuisine = await this.cuisines.create({ ...cuisineData });

    return createCuisineData;
  }
  //update cuisine by id
  public async updateCuisine(cuisineId: string, cuisineData: CreateCuisineDto): Promise<Cuisine> {
    // check if data we wanted it to be new one exits
    if (isEmpty(cuisineData)) throw new HttpException(400, 'There is no cuisineData');
    //check if there is no cuisine exits with same new name
    if (cuisineData.name) {
      const findCuisine: Cuisine = await this.cuisines.findOne({ name: cuisineData.name });
      if (findCuisine && findCuisine._id != cuisineId) throw new HttpException(409, `name already exitst ${cuisineData.name} already exists`);
    }
    // update watnted cuisine
    const updateCuisineById: Cuisine = await this.cuisines.findByIdAndUpdate(cuisineId, { ...cuisineData });
    if (!updateCuisineById) throw new HttpException(409, 'There is no cuisine');

    return updateCuisineById;
  }

  public async deleteCuisine(cuisineId: string): Promise<Cuisine> {
    const deleteCuisineById: Cuisine = await this.cuisines.findByIdAndDelete(cuisineId);
    if (!deleteCuisineById) throw new HttpException(409, 'There is no cuisine');

    return deleteCuisineById;
  }
}

export default CuisineServices;
