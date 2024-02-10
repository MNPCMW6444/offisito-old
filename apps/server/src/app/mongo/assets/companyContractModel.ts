import { Company } from "@monorepo/shared";
import mongoose, { Types } from "mongoose";
import { connection } from "../connection";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import createModel from "../createModel";

export default () => {
  const name = "CompanyContract";

  const CompanyContractSchema = new mongoose.Schema({
    host: { type: Types.ObjectId, ref: "User", required: true },
    companyName: { type: String, required: true },
    companyInHold: { type: String },
    floorNumber: { type: String },
    fullFloor: { type: Boolean },
    contractEndDate: { type: Date },
    subleasePermission: { type: Boolean },
    building: { type: Types.ObjectId, ref: "building" },
  }).plugin(versioning, { collection: name + "s.history", mongoose });

  if (!connection) throw new Error("Database not initialized");

  const CompanyContractModel = createModel<Company>(
    name,
    CompanyContractSchema,
  );

  return CompanyContractModel;
};
