import { Response } from "express";
import { Request } from "../../../middleware";
import AssetCompanyContractModel from "../../../../mongo/assets/assetCompanyModel";
import { isValidObjectId } from "mongoose";

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
  const comapnyContract = AssetCompanyContractModel();
  
  const {company_id}= req.body;
  try {
    const findCompany = 

  } catch (error) {
    
  }
}