import { Field, InputType } from '@nestjs/graphql';

@InputType()
class VehicleTypeInput {
  @Field()
  typeId: string;

  @Field()
  typeName: string;
}

@InputType()
export class CarInput {
  @Field()
  readonly makeId: string;

  @Field()
  readonly makeName: string;

  @Field(() => [VehicleTypeInput])  // Especifica que es un array de VehicleTypeInput
  readonly vehicleTypes: VehicleTypeInput[];
}
