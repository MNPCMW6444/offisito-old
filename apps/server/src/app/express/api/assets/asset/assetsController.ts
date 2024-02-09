import { Response } from "express";
import { Request } from "../../../middleware";
import AssetModel from "../../../../mongo/assets/assetModel";
import { Company, CreateEditAssetReq } from "@monorepo/types";
import { isValidObjectId } from "mongoose";
import { crudResponse } from "../crudResponse";
import BuildingModel from "../../../../mongo/assets/buildingModel";
import CompanyContractModel from "../../../../mongo/assets/companyContractModel";

// #TODO: Front end will add a coordinate Array with longitude, longitude in req.body
// host ID to be sent in the URL
// status is on draft when saving
export const createAsset = async (req: Request, res: Response) => {
  const assetModel = AssetModel();
  const buildingModel = BuildingModel();
  const contractModel = CompanyContractModel();

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
    } = req.body;
    // as CreateEditAssetReq;

    if (!isValidObjectId(host._id)) {
      const response: crudResponse<null> = {
        success: false,
        error: "Not Valid ID",
      };
      return res.status(500).json(response);
    }

    const newAsset = new assetModel({
      host: host,
      // host: host._id,
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

    const savedAsset = await assetModel
      .findById(savedNewAsset._id)
      .populate({
        path: "leasingCompany",
        model: "CompanyContract",
      })
      .exec();

    const companyLeasing = savedAsset.leasingCompany as Company;

    const buildingCompany = companyLeasing.building;

    const pushToBuildingAssetsList = await buildingModel.updateOne(
      { _id: buildingCompany },
      { $push: { assets: savedAsset } },
    );

    const response: crudResponse<typeof savedNewAsset> = {
      success: true,
      data: savedNewAsset,
      msg: "New Asset Saved",
    };

    res.status(201).json(response);
  } catch (err) {
    console.error("error in creating New Asset", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// #TODO - sending Back end the asset_id in url.

export const getAssetDetail = async (req: Request, res: Response) => {
  const assetModel = AssetModel();
  const contractModel = CompanyContractModel();
  const buildingModel = BuildingModel();

  try {
    const asset_id = req.params.asset_id;

    const findAsset = await assetModel.findById(asset_id).populate({
      path: "leasingCompany",
      model: "CompanyContract",
      select: "building",
      populate: {
        path: "building",
        model: "Building",
        select: "address",
      },
    });

    if (!findAsset) {
      const response: crudResponse<null> = {
        success: false,
        error: "Not Valid ASSET ID",
      };
      return res.status(500).json(response);
    }

    const response: crudResponse<typeof findAsset> = {
      success: true,
      data: findAsset,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("no such asset", error);
    res.status(500).json({ msg: "Internal Error" });
  }
};

// #TODO - sending Back end the asset_id in url.

export const editAsset = async (req: Request, res: Response) => {
  const assetModel = AssetModel();

  try {
    const asset_id = req.params.asset_id;

    if (!isValidObjectId(asset_id)) {
      const response: crudResponse<null> = {
        success: false,
        error: "Not Valid ID",
      };
      return res.status(500).json(response);
    }

    // const updatedAssetData: Partial<CreateEditAssetReq> = req.body;

    const updatedAsset = await assetModel.findByIdAndUpdate(
      { _id: asset_id },
      req.body as CreateEditAssetReq,
      { new: true },
    );

    if (!updatedAsset) {
      const response: crudResponse<null> = {
        success: false,
        error: "Asset not found",
      };
      return res.status(404).json(response);
    }

    const response: crudResponse<typeof updatedAsset> = {
      success: true,
      data: updatedAsset,
      msg: "Asset Update Success",
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error in updating ", error);
    res.status(500).json({ error: " Internal Server Error" });
  }
};

// #TODO - sending Back end the asset_id in url.

export const publishAsset = async (req: Request, res: Response) => {
  const assetModel = AssetModel();

  try {
    const asset_id = req.params.asset_id;
    if (!isValidObjectId(asset_id)) {
      const response: crudResponse<null> = {
        success: false,
        error: "Not Valid AssetID",
      };
      return res.status(404).json(response);
    }

    const existingAsset = await assetModel.findById(asset_id);

    if (!existingAsset) {
      const response: crudResponse<null> = {
        success: false,
        error: "Asset not found",
      };
      return res.status(404).json(response);
    }

    const publishedAsset = await assetModel.findByIdAndUpdate(
      { _id: asset_id },
      {
        ...existingAsset.toObject(),
        publishingStatus: "active",
      },
      { new: true },
    );

    if (!publishedAsset) {
      const response: crudResponse<null> = {
        success: false,
        error: "Unable to publish your Asset",
      };
      return res.status(500).json(response);
    }

    const response: crudResponse<typeof publishedAsset> = {
      success: true,
      data: publishedAsset,
    };

    res.status(200).json(response);
  } catch (publishError) {
    console.error("Publishing didnt succed", publishError);
    res.status(500).json({ msg: "Unable to pulish - internal Error" });
  }
};

// here Req Need to hold host_id in order to retrieve the host listing

export const getAssetsList = async (req: Request, res: Response, next) => {
  const assetModel = AssetModel();
  const authenticatedHost = req.user;

  try {
    const assetList = await assetModel.find({ host: authenticatedHost._id });

    if (!assetList) {
      const response: crudResponse<typeof assetList> = {
        success: false,
        error: "There are no Assets Yet",
      };

      res.status(401).json(response);
    } else {
      const response: crudResponse<typeof assetList> = {
        success: true,
        data: assetList,
      };
      res.status(200).json(response);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteAsset = async (req: Request, res: Response) => {
  const assetModel = AssetModel();
  try {
    const asset_id = req.params.asset_id;

    if (!isValidObjectId) {
      const response: crudResponse<null> = {
        success: false,
        error: "invlaid AssetID",
      };
      return res.status(401).json(response);
    }
    const deletedAsset = await assetModel.deleteOne({ _id: asset_id });

    if (!deletedAsset) {
      const response: crudResponse<null> = {
        success: false,
        error: "unable to delete",
      };
      res.status(200).json(response);
    }

    const response: crudResponse<typeof deletedAsset> = {
      success: true,
      data: deletedAsset,
    };
    res.status(200).json(response);
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
