import { Request, Response } from "express";

import assetModel from "../../../mongo/assets/assetModel";
import { isValidObjectId } from "mongoose";

export const createAsset = async (req: Request, res: Response) => {
  console.log("in the create asset");
  const Assets = assetModel();
  try {
    const {
      host,
      officeName,
      desc,
      amenities,
      companyInHold,
      floor,
      availability,
      photoURLs,
      status,
    } = req.body;

    if (!isValidObjectId(host)) {
      return res.status(500).json({ msg: "Not Vlaid User" });
    }

    const newAsset = new Assets({
      host,
      officeName,
      desc,
      amenities,
      companyInHold,
      floor,
      availability,
      photoURLs,
      status,
    });

    const savedNewAsset = await newAsset.save();

    res.status(201).json({
      message: "Asset Created with Success!!",
      asset: savedNewAsset,
    });
  } catch (err) {
    console.error("error in creating New Asset", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export const getAssetsList = async (req:Request, res: Response)=>{

  console.log("getting host assets list - res", res)
  console.log("getting host assets list - req", req)
}


export const getAssetDetail = async(req:Request, res: Response)=>{
  console.log("getting host assets detail - res", res)
  console.log("getting host assets details - req", req)


}