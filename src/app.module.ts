import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongodbConfig from './mongodb.config';
@Module({
  imports: [MongooseModule.forRoot(mongodbConfig.uri), CarModule],
})
export class AppModule {}
