import { Injectable} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { parseStringPromise } from 'xml2js';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class XmlParserService {
    
  constructor(private httpService: HttpService) {}

  async fetchAllMakes(): Promise<any> {
    const response$ = this.httpService.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML');
    const { data } = await lastValueFrom(response$);  // Espera el resultado
    const result = await parseStringPromise(data);
    const vehicleMakesArray = result.Response.Results[0].AllVehicleMakes;

    // Imprimir un ejemplo de un objeto completo para ver todos los campos
    console.log("Ejemplo de un objeto completo:", vehicleMakesArray[0]);

    // Mapeo del array de objetos a la estructura deseada
    const finalResult = vehicleMakesArray.map(async (make) => {
      const makeId = make.Make_ID[0];
      
      //const vehicleTypesData = await this.fetchVehicleTypesForMake(makeId);
      return {
        makeId: make.Make_ID[0],
        makeName: make.Make_Name[0],
        //vehicleTypes: vehicleTypesData[0]
      };
    });

    console.log("finalResult:", finalResult);  // Muestra el resultado transformado
    return finalResult;
  }

  // Método para obtener los tipos de vehículo para una marca específica
  async fetchVehicleTypesForMake(makeId: number): Promise<any> {
    const response$ = this.httpService.get(`https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`);
    const { data } = await lastValueFrom(response$);  // Espera el resultado
    const result = await parseStringPromise(data);

    // Extrae el array de tipos de vehículos
    const vehicleTypesArray = result.Response.Results[0].VehicleTypesForMakeIds;

    // Imprimir un ejemplo de un objeto completo para ver todos los campos
    console.log("Ejemplo de un objeto completo:", vehicleTypesArray[0]);

    // Mapeo del array de objetos a la estructura deseada
    const finalResult = vehicleTypesArray.map((vehicleType) => {
      return {
        vehicleTypeId: vehicleType.VehicleTypeId[0],
        vehicleTypeName: vehicleType.VehicleTypeName[0],
      };
    });

    console.log("finalResult:", finalResult);  // Muestra el resultado transformado
    return finalResult;
  }
}
