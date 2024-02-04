import { Request, Response } from "express";
import AssetCompanyContractModel from "../../../mongo/assets/assetCompanyModel";
import { authUser } from "../auth/logRouter";
import { isValidObjectId } from "mongoose";

export const AddCompanyLease =async (req:Request, res:Response) => {

    const host = await authUser(req.cookies.jtw)

    try {
        const {
            companyName,
            companyInHold,
            floorNumber,
            fullFloor,
            contractEndDate,
            subleasePermission,
           
        } = req.body

        if(!isValidObjectId(host._id)){
            return res.status(400).json({error: "Not A valid Host Id"})
        }

        const newCompnay = new AssetCompanyContractModel({
            host:host._id,
            companyName,
            companyInHold,
            floorNumber,
            fullFloor,
            contractEndDate,
            subleasePermission,
        });
        
        const savedCompany = await newCompnay.save();

        res.status(201).json({
            message: " Company Added successfuly",
            AssetCompany: savedCompany,
        })
        }

     catch (err) {
        console.error("error in creating New AssetCompany", err);
       res.status(500).json({err:"Internal Server Error, Company Not added"}) 
    }

}