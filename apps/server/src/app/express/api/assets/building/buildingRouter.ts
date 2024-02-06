import { Router } from "express";
import { CheckBuildingAddress, AddBuildingAssets } from "./buildingsControlers";

const buildingRouter = Router();


// BuildingRouters
buildingRouter.get("/check_building_address", CheckBuildingAddress)
buildingRouter.post("/add_building", AddBuildingAssets);

export default buildingRouter;