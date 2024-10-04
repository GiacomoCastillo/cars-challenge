export interface Car {
    id?: number;
    makeId: string;
    makeName: string;
    vehicleTypes: {
      typeId: string;
      typeName: string;
    }[];
  }
  