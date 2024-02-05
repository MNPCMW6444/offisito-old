import { Request, Response } from "express";
import AssetBuildingModel from "../../../mongo/assets/assetBuildingModel";


export const CheckBuildingAddress =async (req:Request, res: Response) => {
        const buildingModel = AssetBuildingModel()
    try{
        const {address} = req.body;

        const BuildingAddressCheck = await buildingModel.findOne({address });
        if(BuildingAddressCheck){
            return res.json({assetBuildingID: BuildingAddressCheck._id})
        }else{
            return res.json({message: "Building address Doesnt exisit Yet"})
        }
    
    }catch(error){
        console.error("Error Checking Address")
        return res.status(500).json({msg: "Internal Server Erro Checking Street"})
    }

};


// export const AddBuildingAssets =async (req:Request, res:Response) => {
    
//     try {
        
//         const {
//             buildingName,
//             address,
//             buildingAmenities,
//             buildingAccess,
//             buildingDescription, 
            
//         }= req.body

    

//     } catch (error) {
//         res.status(500).json({msg: "Internal Error Adding Building"})
//     }

// }