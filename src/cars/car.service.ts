import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dto/create-car.dto';
import { XmlParserService } from './xml-parser.service';

@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>, private xmlParserService : XmlParserService) {}

  // Crear un nuevo coche
  async create(createCarDto: CreateCarDto): Promise<Car> {
    const newCar = new this.carModel(createCarDto);
    return newCar.save();
  }

  // Obtener todos los coches
  async findAll(page: number = 1, limit: number = 10): Promise<{ cars: Car[], total: number }> {
    const skip = (page - 1) * limit;
    
    // Obtén el total de documentos (coches)
    const total = await this.carModel.countDocuments();
    
    // Encuentra los coches con paginación
    const cars = await this.carModel.find()
      .skip(skip)  // Saltar los coches según la página
      .limit(limit)  // Limitar el número de coches
      .exec();
    
    return { cars, total };
  }

  // Obtener un coche por su ID
  async findById(id: string): Promise<Car> {
    const car = await this.carModel.findById(id).exec();
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return car;
  }

  // Actualizar un coche
  async update(id: string, updateCarDto: CreateCarDto): Promise<Car> {
    const updatedCar = await this.carModel.findByIdAndUpdate(id, updateCarDto, {
      new: true,
    }).exec();
    if (!updatedCar) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return updatedCar;
  }

  // Eliminar un coche
  async delete(id: string): Promise<Car> {
    const deletedCar = await this.carModel.findByIdAndDelete(id).exec();
    if (!deletedCar) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return deletedCar;
  }

  async getAndStoreAllVehicles(): Promise<{ totalSaved: number; message: string }> {
    const makes = await Promise.all(await this.xmlParserService.fetchAllMakes());
    
    // Log the entire response for debugging purposes
    console.log('makeList:', makes);
    
    const makeList = makes;
    let savedCarsCount = 0;  // Variable para contar los autos guardados
    
    for (let i = 0; i < makeList.length; i++) {
        // Crear la instancia de coche para cada marca
        const car = new this.carModel({
            makeId: makeList[i]['makeId'],  // Obtener el Make_ID específico
            makeName: makeList[i]['makeName'],  // Obtener el Make_Name específico
            //vehicleTypes: makeList[i]['vehicleTypes'],  // Inicializar vehicleTypes si los tienes
        });

        // Guardar la instancia del coche
        await car.save();
        savedCarsCount++;  // Incrementa el contador cuando se guarda un auto

        console.log('Saved car:', car);  // Mostrar el coche guardado para confirmación
    }

    // Enviar un mensaje de notificación al finalizar el proceso
    console.log(`Se han guardado un total de ${savedCarsCount} autos.`);

    // Retornar un resumen al completar la operación
    return {
      totalSaved: savedCarsCount,
      message: 'Todos los autos han sido guardados correctamente.',
    };
    
}


  
}
