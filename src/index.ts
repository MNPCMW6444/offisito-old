import {connect} from "./mongo/connection"

connect().then(() => expressSetup().catch((e) => console.log(e)))

