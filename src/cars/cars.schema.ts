import mongoose from "mongoose";

const VehicleTypeSchema = new mongoose.Schema({
  typeId: String,
  typeName: String
});

export const CarSchema = new mongoose.Schema({
  makeId: String,
  makeName: String,
  vehicleTypes: [VehicleTypeSchema]
});
