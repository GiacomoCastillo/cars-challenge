import { Field, ObjectType } from '@nestjs/graphql';
import { CreateCarDto } from './create-car.dto';

@ObjectType()
export class CarPaginationDto {
  @Field(() => [CreateCarDto])  // La lista de coches paginados
  cars: CreateCarDto[];

  @Field()
  total: number;  // Total de coches en la base de datos
}
