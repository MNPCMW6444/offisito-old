import { Response } from "express";
import { Request } from "../../../middleware";
import AssetCompanyContractModel from "../../../../mongo/assets/assetCompanyModel";
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
      building,
    } = req.body;

    if (!isValidObjectId(host._id)) {
      return res.status(400).json({ error: "Not A valid Host Id" });
    }

    if (!building) {
      return res.status(400).json({ error: "Please add building first " });
    }

    if (!building) {
      res.json({ msg: "please putt address" });
    }

    const newCompnay = new assetCompanyModel({
      host: host._id,
      companyName,
      companyInHold,
      floorNumber,
      fullFloor,
      contractEndDate,
      subleasePermission,
      building,
    });

    const savedCompany = await newCompnay.save();

    res.status(201).json({
      message: " Company Added successfuly",
      AssetCompany: savedCompany,
    });
  } catch (err) {
    console.error("error in creating New AssetCompany", err);
    res
      .status(500)
      .json({ msg: "Internal Server Error, Company Not added", err });
  }
};
// 65c285c0192e0d2b1280be1e
