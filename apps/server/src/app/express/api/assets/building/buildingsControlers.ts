import { Response } from "express";
import AssetBuildingModel from "../../../../mongo/assets/assetBuildingModel";
import { Request } from "../../../middleware";

export const CheckBuildingAddress =async (req:Request, res: Response) => {
    
        const buildingModel = AssetBuildingModel()
    try{
        const {coordinates} = req.body;

        const BuildingAddressCheck = await buildingModel.findOne({
            coordinates });

        if(BuildingAddressCheck){
            return res.json({assetBuildingID: BuildingAddressCheck})
        }else{
            return res.json({message: "Building address Doesnt exisit Yet"})
        }
    
    }catch(error){
        console.error("Error Checking Address")
        return res.status(500).json({msg: "Internal Server Erro Checking Street"})
    }

};


export const AddBuildingAssets =async (req:Request, res:Response) => {
    const assetBuildingModel = AssetBuildingModel();
    try {
        
        const {
            buildingName,
            address,
            buildingAmenities,
            buildingAccess,
            buildingDescription, 
            doorman,
            security, 
            vip_service
            
        }= req.body

    
    const buildingAddressData = new assetBuildingModel({
            buildingName,
            address,
            buildingAmenities,
            buildingAccess,
            buildingDescription, 
            doorman,
            security, 
            vip_service});

    const BuildingSaved = await buildingAddressData.save();

    res.status(201).json({msg: "Building Added Succesfuly", buildingData: BuildingSaved})
    } catch (error) {
        res.status(500).json({msg: "Internal Error Adding Building", error})
    }

}