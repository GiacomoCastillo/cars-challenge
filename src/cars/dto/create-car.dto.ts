import { Field, ObjectType } from '@nestjs/graphql';
import { ID } from 'type-graphql';

@ObjectType()
class VehicleType {
  @Field()
  typeId: string;

  @Field()
  typeName: string;
}

@ObjectType()
export class CreateCarDto {
  @Field(()=>ID)
  readonly makeId: string;

  @Field()
  readonly makeName: string;

  @Field(() => [VehicleType])  // Asegúrate de especificar el tipo del array correctamente
  readonly vehicleTypes: VehicleType[];
  
}
