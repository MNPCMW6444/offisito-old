import mongoose, { Model, SchemaDefinition } from "mongoose";
import settings from "../../config";
import { watchDB } from "../sse";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";

export const connection: { instance?: mongoose.Connection } = {};

export const connect = async () => {
  settings.whiteEnv === "local" && mongoose.set("debug", true);
  try {
    await mongoose.connect(
      settings.mongoURI || "mongodb://localhost:27017/error",
    );
    console.log("Mongo DB connected successfully");
    connection.instance = mongoose.connection;
    watchDB();
  } catch (err) {
    console.log("mongo connection error:" + err);
    throw new Error(err);
  }
};

export const getModel = <Interface>(
  name: string,
  schemaDefinition: SchemaDefinition,
  extraIndex = undefined,
) => {
  if (!connection.instance) throw new Error("Database not initialized");
  let model: Model<Interface>;
  const schema = new mongoose.Schema(schemaDefinition, {
    timestamps: true,
  });
  extraIndex && schema.index(extraIndex);
  if (mongoose.models[name]) {
    model = connection.instance.model<Interface>(name);
  } else {
    model = connection.instance.model<Interface>(
      name,
      schema.plugin(versioning, { collection: name + "s.history", mongoose }),
    );
  }
  return model;
};
