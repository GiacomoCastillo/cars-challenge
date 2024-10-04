import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CarService } from "./car.service";
import { CreateCarDto } from "./dto/create-car.dto";
import { CarInput } from "./inputs/car.input";
import { CarPaginationDto } from "./dto/car-pagination.dto";

@Resolver()
export class CarResolver {
  constructor(
    private carsService: CarService,
  ) {}

  @Query( () => String)
  
  async hello() {
    return 'HEllo'
  }

  @Query(() => CarPaginationDto)
  async cars(
    @Args('page', { type: () => Number, nullable: true }) page: number = 1,
    @Args('limit', { type: () => Number, nullable: true }) limit: number = 10
  ): Promise<CarPaginationDto> {
    const { cars, total } = await this.carsService.findAll(page, limit);
    return { cars, total };
  }


  @Mutation( () => CreateCarDto)
  async createCar(@Args('input') input: CarInput): Promise<CreateCarDto> {
    return this.carsService.create(input);
  }

  // Mutation para obtener y almacenar coches desde la API externa
  @Mutation(() => Boolean)
  async fetchAndStoreCars(): Promise<boolean> {
    await this.carsService.getAndStoreAllVehicles();
    return true;
  }

}