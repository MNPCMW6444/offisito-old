import {connect} from "./mongo/connection"
import expressSetup from "./express/expressSetup";

console.log("Starting server but first connecting to mongo,...")
connect().then(() => expressSetup().catch((e) => console.log(e)))

