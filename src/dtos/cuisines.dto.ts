import { IsString } from 'class-validator';

export class CreateCuisineDto {
  @IsString()
  public name: string;
}
