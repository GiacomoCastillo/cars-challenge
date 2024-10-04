import { Module } from '@nestjs/common';
import { CarResolver } from './cars.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './cars.schema';
import { CarService } from './car.service';
import { XmlParserService } from './xml-parser.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
    imports:[
        MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]),
        HttpModule,
    ],
    providers: [
        CarResolver,
        CarService,
        XmlParserService,
    ],
})
export class CarsModule {}
