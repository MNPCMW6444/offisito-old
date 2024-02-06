import { Router } from "express";
import { CheckBuildingAddress, AddBuildingAssets } from "./buildingsControlers";

const buildingRouter = Router();


// BuildingRouters
buildingRouter.get("/autocomplete_building_add", CheckBuildingAddress)
buildingRouter.post("/add_building", AddBuildingAssets);

export default buildingRouter;