import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICar } from './interfaces/car.interface';
import { CarDto } from './car.dto';

const carProjection = {
  __v: false,
  _id: false,
};

@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private readonly carModel: Model<ICar>) {}

  public async getCars(): Promise<CarDto[]> {
    const cars = await this.carModel.find({}, carProjection).exec();
    if (!cars || !cars[0]) {
      throw new HttpException('Not Found', 404);
    }
    return cars;
  }

  public async postCar(car: CarDto) {
    const newCar = await this.carModel.create(car);
    return newCar;
  }

  public async getCarById(id: number): Promise<CarDto> {
    const foundCar = await this.carModel.findOne({ id }, carProjection).exec();
    if (!foundCar) {
      throw new HttpException('Car Not Found', 404);
    }
    return foundCar;
  }

  public async deletecarById(id: number): Promise<any> {
    const car = await this.carModel.deleteOne({ id }, carProjection).exec();
    if (car.deletedCount === 0) {
      throw new HttpException('Not Deleted', 400);
    }
    return car;
  }

  public async putCarById(
    id: number,
    property_name: string,
    propertyValue: string,
  ): Promise<CarDto> {
    const car = await this.carModel
      .findOneAndUpdate(
        { id },
        {
          [property_name]: propertyValue,
        },
        carProjection,
      )
      .exec();
    if (!car) {
      throw new HttpException('Property not updated', 500);
    }
    return car;
  }
}
