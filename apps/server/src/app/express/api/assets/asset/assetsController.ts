import { Response } from "express";
import { Request } from "../../../middleware";
import assetModel from "../../../../mongo/assets/assetModel";
import { Asset, CreateAssetReq } from "@monorepo/types";

import { isValidObjectId } from "mongoose";

// #TODO: Front end will add a coordinate Array with longitude, longitude in req.body
// host ID to be sent in the URL
// status is on draft when saving
export const createAsset = async (req: Request, res: Response) => {
  const AssetModel = assetModel();

  const host = req.user;

  try {
    const {
      assetDescription,
      roomNumber,
      assetAvailability,
      amenities,
      photoURLs,
      assetType,
      publishingStatus,
      peopleCapacity,
      leaseCondition,
      leasingCompany,
    } = req.body as CreateAssetReq;

    if (!isValidObjectId(host._id)) {
      return res.status(500).json({ msg: "Not Vlaid User" });
    }

    const newAsset = new AssetModel({
      host: host._id,
      assetDescription,
      roomNumber,
      assetAvailability,
      amenities,
      photoURLs,
      assetType,
      publishingStatus,
      peopleCapacity,
      leaseCondition,
      leasingCompany,
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

// #TODO - sending Back end the asset_id in url.

export const getAssetDetail = async (req: Request, res: Response) => {
  const AssetModel = assetModel();

  try {
    const asset_id = req.params.asset_id;

    const findAsset = await AssetModel.findById(asset_id);

    if (!findAsset) {
      return res.status(500).json({ msg: "no Such Asset" });
    }

    res.status(200).json({ msg: "found Asset", asset: findAsset });
  } catch (error) {
    console.error("no such asset", error);
    res.status(500).json({ msg: "Internal Error" });
  }
};

// #TODO - sending Back end the asset_id in url.

export const editAsset = async (req: Request, res: Response) => {
  const AssetModel = assetModel();

  try {
    const asset_id = req.params.asset_id;

    if (!isValidObjectId(asset_id)) {
      return res.status(400).json({ error: "Invalid asset ID" });
    }

    const updatedAssetData: Partial<Asset> = req.body;

    const updatedAsset = await AssetModel.findOneAndUpdate(
      { _id: asset_id },
      updatedAssetData,
      { new: true },
    );

    if (!updatedAsset) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.status(200).json({ msg: "Asset updated with Succes" });
  } catch (error) {
    console.error("Error in updating ", error);
    res.status(500).json({ error: " Internal Server Error" });
  }
};

// #TODO - sending Back end the asset_id in url.

export const publishAsset = async (req: Request, res: Response) => {
  const AssetModel = assetModel();

  try {
    const asset_id = req.params.asset_id;
    if (!isValidObjectId) {
      return res.status(404).json({ msg: "Not a Valid ID" });
    }
    const publishedAsset = await AssetModel.findByIdAndUpdate(
      { _id: asset_id },
      { status: "active" },
    );

    if (!publishedAsset) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.status(200).json({ msg: "Asset updated with Succes" });
  } catch (publishError) {
    console.error("Publishing didnt succed", publishError);
    res.status(500).json({ msg: "Unable to pulish - internal Error" });
  }
};

// here Req Need to hold host_id in order to retrieve the host listing

export const getAssetsList = async (req: Request, res: Response, next) => {
  // const AssetModel = assetModel();
  const authenticatedHost = req.user;
  //const host_id = req.params.host_id;

  try {
    const assetList = await assetModel().find({ host: authenticatedHost._id });

    if (assetList.lenght < 0) {
      console.log("there s no list for this host ");
      res.status(401).json({ msg: "nothing in your listing yet" });
    } else {
      res.status(200).json(assetList);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteAsset = async (req: Request, res: Response) => {
  const AssetModel = assetModel();
  try {
    const asset_id = req.params.asset_id;

    if (!isValidObjectId) {
      return res.status(401).json({ msg: "not a valid ID" });
    }
    const deleteAssetResults = await AssetModel.deleteOne({ _id: asset_id });

    if (deleteAssetResults.deleteCount > 0) {
      res.status(200).json({ msg: "Asset Deleted", asset_id: deleteAsset });
    } else {
      res.status(404).json({ msg: "Asset not ound for deletion" });
    }
  } catch (deleteError) {
    console.error("Erro in deleting Asset", deleteError);
    res
      .status(500)
      .json({ error: "Asset Not Deleted, internal Error", deleteError });
  }
};


// assetsRouter.get<{ _id: string; location: string }, Asset[]>(
//   "/:_id",
//   async (req, res) => {
//     try {
//       const Asset = assetModel();
//       const assets = req.params._id
//         ? [await Asset.findById(req.params._id)]
//         : await Asset.find(/*{ params }*/);
//       if (!assets) {
//         return res.status(404).send();
//       }
//       res.json(assets);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send();
//     }
//   },
// );

// export default assetsRouter;
