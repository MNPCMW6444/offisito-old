import mongoose from "mongoose";



const AssetBuildingSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  buildingName: {
    type: String,
    required: true,
  },
  companyInHold: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    country: String,
    geoLocalisation: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  floorNumber: {
    type: Number,
    required: true,
  },
  fullFloor: {
    type: Boolean,
    required: true,
  },
  buildingAmenities: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amenities' }],
    required: true,
  },
  buildingAccess: {
    type: [String],
    required: true,
  },
  buildingDescription: {
    type: String,
    required: true,
  },
  assets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset', 
    },
  ],
});

const BuildingModel = mongoose.model('AssetBuilding', AssetBuildingSchema);

module.exports = BuildingModel;