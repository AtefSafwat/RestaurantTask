import { IsMongoId, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  public name: string;

  @IsString() //unique name
  public slugName: string;

  @IsString() // for location
  public lat: string;
  @IsString() // for location
  public long: string;

  @IsMongoId()
  public ownerId: string;
  @IsMongoId()
  public cuisineId: string;
}
