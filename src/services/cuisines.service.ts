import { Cuisine } from '@interfaces/cuisine.interface';
import { hash } from 'bcrypt';
import { CreateCuisineDto } from '@dtos/cuisines.dto';
import { HttpException } from '@exceptions/HttpException';
import cuisineModel from '@models/cuisines.model';
import { isEmpty } from '@utils/util';

class CuisineServices {
  public cuisines = cuisineModel;

  public async findAllCuisine(): Promise<Cuisine[]> {
    const cuisines: Cuisine[] = await this.cuisines.find();
    return cuisines;
  }

  public async findCuisineById(cuisineId: string): Promise<Cuisine> {
    if (isEmpty(cuisineId)) throw new HttpException(400, ' There is no cuisineId');

    const findCuisine: Cuisine = await this.cuisines.findOne({ _id: cuisineId });
    if (!findCuisine) throw new HttpException(409, 'There is no cuisine');

    return findCuisine;
  }

  public async createCuisine(cuisineData: CreateCuisineDto): Promise<Cuisine> {
    if (isEmpty(cuisineData)) throw new HttpException(400, 'There is no cuisineData');

    const findCuisine: Cuisine = await this.cuisines.findOne({ email: cuisineData.name });
    if (findCuisine) throw new HttpException(409, ` cuisine name ${cuisineData.name} already exists`);

    const createCuisineData: Cuisine = await this.cuisines.create({ ...cuisineData });

    return createCuisineData;
  }

  public async updateCuisine(cuisineId: string, cuisineData: CreateCuisineDto): Promise<Cuisine> {
    if (isEmpty(cuisineData)) throw new HttpException(400, 'There is no cuisineData');

    if (cuisineData.name) {
      const findCuisine: Cuisine = await this.cuisines.findOne({ name: cuisineData.name });
      if (findCuisine && findCuisine._id != cuisineId) throw new HttpException(409, `name already exitst ${cuisineData.name} already exists`);
    }

    const updateCuisineById: Cuisine = await this.cuisines.findByIdAndUpdate(cuisineId, { cuisineData });
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
