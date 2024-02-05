import { Response } from "express";
import { Request } from "../../middleware";
import AssetCompanyContractModel from "../../../mongo/assets/assetCompanyModel";
import { isValidObjectId } from "mongoose";

export const AddCompanyLease = async (req: Request, res: Response) => {
  const assetCompanyModel = AssetCompanyContractModel();
  const host = req.user;

  try {
    const {
      companyName,
      companyInHold,
      floorNumber,
      fullFloor,
      contractEndDate,
      subleasePermission,
    } = req.body;

    if (!isValidObjectId(host._id)) {
      return res.status(400).json({ error: "Not A valid Host Id" });
    }

    const newCompnay = new assetCompanyModel({
      host: host._id,
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
    });
  } catch (err) {
    console.error("error in creating New AssetCompany", err);
    res.status(500).json({ err: "Internal Server Error, Company Not added" });
  }
};
