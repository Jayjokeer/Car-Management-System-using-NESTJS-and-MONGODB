import { Controller } from '@nestjs/common';
import { CarService } from './car.service';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common/decorators';
import { CarDto } from './car.dto';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  public getCars() {
    return this.carService.getCars();
  }

  @Post()
  public async postCar(@Body() car: CarDto) {
    return this.carService.postCar(car);
  }

  @Get(':id')
  public async getCarById(@Param('id') id: number) {
    return this.carService.getCarById(id);
  }

  @Delete(':id')
  public async deleteCarById(@Param('id') id: number) {
    return this.carService.deletecarById(id);
  }

  @Put(':id')
  public async putCarById(@Param('id') id: number, @Query() query) {
    const propertyName = query.property_name;
    const propertyValue = query.propertyValue;
    return this.carService.putCarById(id, propertyName, propertyValue);
  }
}
