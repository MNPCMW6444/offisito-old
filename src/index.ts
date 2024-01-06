import expressSetup from "./app/express/expressSetup";
import {connect} from "./app/mongo/connection";

console.log("Starting server but first connecting to mongo,...")
connect().then(() => expressSetup().catch((e) => console.log(e)))

