import { Response } from "express";
import { Request } from "../../../middleware";
import AssetCompanyContractModel from "../../../../mongo/assets/assetCompanyModel";
import { isValidObjectId } from "mongoose";
import assetBuildingModel from "apps/server/src/app/mongo/assets/assetBuildingModel";

export const AddCompanyLease = async (req: Request, res: Response) => {
  const assetCompanyModel = AssetCompanyContractModel();
  
  const host = req.user;

  try {
    const {
      // host,
      companyName,
      companyInHold,
      floorNumber,
      fullFloor,
      contractEndDate,
      subleasePermission,
      building,
    } = req.body;

    if (!isValidObjectId(host._id)) {
      // if (!isValidObjectId(host)) {
      return res.status(400).json({ error: "Not A valid Host Id" });
    }

    if(!building){
      return res.status(400).json({error: "Please add building first "})
    }

    const newCompnay = new assetCompanyModel({
       host,
      // host: host._id,
      companyName,
      companyInHold,
      floorNumber,
      fullFloor,
      contractEndDate,
      subleasePermission,
      building
    });

    const savedCompany = await newCompnay.save();

    res.status(201).json({
      message: " Company Added successfuly",
      AssetCompany: savedCompany,
    });
  } catch (err) {
    console.error("error in creating New AssetCompany", err);
    res.status(500).json({ msg: "Internal Server Error, Company Not added", err});
  }
};



export const getCompanyDetail =async (req:Request, res:Response) => {
  const companyContract = AssetCompanyContractModel();
  const companyBuilding = assetBuildingModel();
  const {company_id}= req.params;
  
  try {
  
    if(!isValidObjectId(company_id)){
      return res.status(400).json({msg:"Not valid company ID"})
    } 

    const findCompany = await companyContract.findById(company_id);

    if (!findCompany){
      return res.status(404).json({msg: "Company Not found"})
    }
    const building_id =  findCompany.building;
    const findBuilding = await companyBuilding.findById(building_id);
    if(!findBuilding){
      res.status(200).json({msg: "Success fetching", companyData: findCompany, building:  "Please add the building address"})
      
    }
    res.status(200).json({msg: "Success fetching", companyData: findCompany, building: findBuilding})

  } catch (error) {
    console.error("Internal request Error, Company Detail", error);
    res.status(500).json({msg:"internal Server error", error})
  }
}