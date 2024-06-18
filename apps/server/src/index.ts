import apiSetup from "./api";
import { connect } from "./services/mongo";

console.log("Connecting to MongoDB...");
connect().then(() => apiSetup().catch((e) => console.log(e)));
