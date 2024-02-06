
import { Router } from "express";
import assetsRouter from "./asset/assetRouter";
import buildingRouter from "./building/buildingRouter";
import companyRouter from "./company/companyRouter";


const AssetGlobalRouter = Router();

AssetGlobalRouter.use('/asset', assetsRouter );
AssetGlobalRouter.use('/building', buildingRouter);
AssetGlobalRouter.use('/company', companyRouter)


export default AssetGlobalRouter;