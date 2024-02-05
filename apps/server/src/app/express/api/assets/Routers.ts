import { Router } from "express";
import {
  createAsset,
  getAssetsList,
  getAssetDetail,
  editAsset,
  deleteAsset,
  publishAsset,
} from "./assetsController";
import { CheckBuildingAddress } from "./buildingsControlers";
import { AddCompanyLease } from "./companyController";
import { AddBuildingAssets } from "./buildingsControlers";
const assetsRouter = Router();

// Company Routers
assetsRouter.post("/add_company_lease", AddCompanyLease);


// BuildingRouters
assetsRouter.get("/check_building_address", CheckBuildingAddress)
assetsRouter.post("/add_building", AddBuildingAssets);


// Assets Router
assetsRouter.post("/add_asset", createAsset);
assetsRouter.get("/asset_detail/:asset_id", getAssetDetail);
assetsRouter.put("/edit_asset/:asset_id", editAsset);
assetsRouter.get("/assets_list", getAssetsList);
assetsRouter.delete("/delete_asset/:asset_id", deleteAsset);
assetsRouter.put("/publish_asset/:asset_id", publishAsset);



export default assetsRouter;
