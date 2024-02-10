import { Response } from "express";
import BuildingModel from "../../../../mongo/assets/buildingModel";
import { Request } from "../../../middleware";
import { crudResponse } from "../crudResponse";
import { createBuildingReq } from "@monorepo/shared";

export const CheckBuildingAddress = async (req: Request, res: Response) => {
  const buildingModel = BuildingModel();
  try {
    const { coordinates } = req.body;

    const buildingAddressCheck = await buildingModel.findOne({
      coordinates,
    });

    if (!buildingAddressCheck) {
      const response: crudResponse<null> = {
        success: false,
        error: "Not A valid Building ID",
      };

      return res.json(response);
    }

    const response: crudResponse<typeof buildingAddressCheck> = {
      success: true,
      data: buildingAddressCheck,
    };
    res.status(200).json(response);
  } catch (error) {
    const response: crudResponse<null> = {
      success: false,
      error: "internal Error",
    };
    return res.status(500).json(response);
  }
};

export const AddBuildingAssets = async (req: Request, res: Response) => {
  const assetBuildingModel = BuildingModel();
  try {
    const {
      buildingName,
      address,
      buildingAmenities,
      buildingAccess,
      buildingDescription,
      doorman,
      security,
      vip_service,
    } = req.body as createBuildingReq;

    const buildingAddressData = new assetBuildingModel({
      buildingName,
      address,
      buildingAmenities,
      buildingAccess,
      buildingDescription,
      doorman,
      security,
      vip_service,
    });

    const buildingSaved = await buildingAddressData.save();

    if (!buildingSaved) {
      const response: crudResponse<null> = {
        success: false,
        error: "Unable to add Building Address",
      };
      res.status(400).json(response);
    }

    const response: crudResponse<typeof buildingAddressData> = {
      success: true,
      data: buildingSaved,
      msg: "building Added Successfuly",
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ msg: "Internal Error Adding Building", error });
  }
};
